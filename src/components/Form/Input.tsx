import { InputHTMLAttributes } from 'react';
import { Game } from '../../models/Games';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

type ConditionalProps =
  | {
      select: true;
      options: Game[];
    }
  | {
      select?: never | false;
      options?: never;
    };

export default function Input(props: InputProps & ConditionalProps) {
  const { label, select = false, options = [] } = props;

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-white font-semibold' htmlFor={props.id}>
        {label}
      </label>
      {select ? (
        <select
          onChange={props.onChange as any}
          defaultValue=''
          className='bg-zinc-900 text-zinc-500 text-sm py-3 px-4 rounded cursor-pointer'
          id={props.id}>
          <option value='' disabled>
            {props.placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      ) : props.type !== 'time' ? (
        <input className='bg-zinc-900 placeholder:text-zinc-500 text-white text-sm py-3 px-4 rounded' {...props} />
      ) : (
        <div className='grid grid-cols-2 gap-2'>
          <input
            className='bg-zinc-900 placeholder:text-zinc-500 text-white text-sm py-3 px-4 rounded'
            {...props}
            id={'hourStart'}
          />
          <input
            className='bg-zinc-900 placeholder:text-zinc-500 text-white text-sm py-3 px-4 rounded'
            {...props}
            id={'hourEnd'}
          />
        </div>
      )}
    </div>
  );
}
