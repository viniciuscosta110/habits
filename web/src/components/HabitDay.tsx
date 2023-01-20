import clsx from 'clsx';

import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';

import { ProgressBar } from './ProgressBar';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface HabitDayProps {
  date: Date;
  done?: number;
  amount?: number;
}

export function HabitDay({ date, done = 0, amount = 0 }: HabitDayProps) {
  const donePercentage = amount > 0 ? Math.round((done / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return(
    <Popover.Root>
      <Popover.Trigger className={clsx("w-10 h-10 border-2 rounded-lg", {
        'bg-zinc-900 border-zinc-800': donePercentage === 0,
        'bg-violet-900 border-violet-700': donePercentage > 0 && donePercentage < 20,
        'bg-violet-800 border-violet-600': donePercentage >= 20 && donePercentage < 40,
        'bg-violet-700 border-violet-500': donePercentage >= 40 && donePercentage < 60,
        'bg-violet-600 border-violet-500': donePercentage >= 60 && donePercentage < 80,
        'bg-violet-500 border-violet-400': donePercentage >= 80,
      })} />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400"> { dayOfWeek } </span>
          <span className="mt-1 font-extrabold leading-tight text-3xl"> { dayAndMonth } </span>

          <ProgressBar progress={donePercentage}  />

          <div className="mt-3 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              
              <span 
                className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
              > 
                Tomar whey
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow width={16} height={8} className="fill-zinc-900"/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}