import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"

import { z } from 'zod'
import dayjs from "dayjs"

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().int().min(0).max(6)
      )
    })

    const { title, weekDays } = createHabitBody.parse(req.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay,
            }
          })
        }
      }
    })
  })

  app.get('/day', async (req, res) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(req.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = dayjs(parsedDate).get('day')

    const todayHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabits: true,
      }
    })

    const doneHabits = day?.dayHabits.map(dayHabit => dayHabit.habit_id)

    return {
      todayHabits,
      doneHabits
    }
  })
}