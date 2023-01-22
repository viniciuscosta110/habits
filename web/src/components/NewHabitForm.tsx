import { FormEvent, useState } from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(e: FormEvent) {
    e.preventDefault();

    if(!title || weekDays.length === 0) return

    await api.post('/habits', {
      title,
      weekDays
    }).then(() => {
      alert('Hábito criado com sucesso!')
    })

    setTitle('')
    setWeekDays([])
  }

  function handleToggleWeekDay(weekDay: number) {
    if(weekDays.includes(weekDay)) {
      const removedClickedWeekDay = weekDays.filter(day => day !== weekDay)

      setWeekDays(removedClickedWeekDay)
    } else {
      setWeekDays(prevState => [...prevState, weekDay])
    }
  }

  return(
    <form onSubmit={e => createNewHabit(e)} className='w-full flex flex-col mt-6'>
      <label htmlFor="Title" className="font-semibold leading-tight">
        Qual seu compromentimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Ex.: exercícios, dormir bem etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        onChange={e => setTitle(e.target.value)}
        value={title}
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>
      
      <div className="flex flex-col gap-3 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root 
              key={weekDay} 
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              
              <span 
                className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
              > 
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button 
        type="submit" 
        className="mt-6 rounded-lg p-4 flex justify-center items-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}