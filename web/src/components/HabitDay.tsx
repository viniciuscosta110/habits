import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
  done: number;
  amount: number;
}

export function HabitDay(props: HabitDayProps) {
  const donePercentage = Math.round((props.done / props.amount) * 100);

  return(
    <Popover.Root>
      <Popover.Trigger className={clsx("w-10 h-10 border-2 rounded-lg", {
        'bg-zinc-900 border-zinc-800': donePercentage === 0,
        'bg-violet-900 border-violet-700': donePercentage >= 0 && donePercentage < 20,
        'bg-violet-800 border-violet-600': donePercentage >= 20 && donePercentage < 40,
        'bg-violet-700 border-violet-500': donePercentage >= 40 && donePercentage < 60,
        'bg-violet-600 border-violet-500': donePercentage >= 60 && donePercentage < 80,
        'bg-violet-500 border-violet-400': donePercentage >= 80,
      })} />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400"> Quarta-feira </span>
          <span className="mt-1 font-extrabold leading-tight text-3xl"> 17/01 </span>

          <ProgressBar progress={donePercentage}  />

          <Popover.Arrow width={16} height={8} className="fill-zinc-900"/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}