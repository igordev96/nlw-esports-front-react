import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

export interface CheckBoxProps {
  onChange: (checked: Checkbox.CheckedState) => void;
  label: string;
}

export default function CheckBox(props: CheckBoxProps) {
  const { onChange, label } = props;

  return (
    <div className='flex items-center gap-2'>
      <Checkbox.Root
        id='useVoiceChannel'
        className='bg-zinc-900 h-6 w-6 rounded flex items-center justify-center py-2 px-3'
        onCheckedChange={onChange}>
        <Checkbox.Indicator>
          <Check className='text-emerald-400' size={18} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor='useVoiceChannel' className='text-white text-sm'>
        {label}
      </label>
    </div>
  );
}
