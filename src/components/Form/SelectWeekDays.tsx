import { Dispatch } from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import { Ad } from '../../models/Ads';

export interface SelectWeekDaysProps {
  setFormState: Dispatch<React.SetStateAction<Ad>>;
  label: string;
}

export interface StyledToggleProps {
  onChange: (pressed: boolean) => void;
  title: string;
  firstLetter: string;
}

export const StyledToggle = (props: StyledToggleProps) => {
  const { firstLetter, onChange, title } = props;

  return (
    <Toggle.Root
      title={title}
      onPressedChange={onChange}
      className='bg-zinc-900 w-10 h-10 flex items-center justify-center font-bold text-white transition-all hover:bg-violet-900 state:bg-violet-500 rounded'>
      {firstLetter}
    </Toggle.Root>
  );
};

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function SelectWeekDays(props: SelectWeekDaysProps) {
  const { setFormState, label } = props;

  return (
    <div>
      <div className='text-white font-semibold'>{label}</div>
      <div className='flex gap-1 mt-2'>
        {weekDays.map((day, index) => (
          <StyledToggle
            title={day}
            onChange={(pressed) => {
              if (pressed) {
                setFormState((prevFormState) => {
                  const weekDaysTemp = prevFormState.weekDays;
                  return {
                    ...prevFormState,
                    weekDays: [...weekDaysTemp, index],
                  };
                });
              } else {
                setFormState((prevFormState) => {
                  const weekDaysTemp = prevFormState.weekDays;
                  return {
                    ...prevFormState,
                    weekDays: [...weekDaysTemp.filter((prevIndex) => prevIndex !== index)],
                  };
                });
              }
            }}
            key={index}
            firstLetter={day.charAt(0).toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
}
