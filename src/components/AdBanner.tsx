import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

export default function AdBanner() {
  return (
    <div className='self-stretch bg-gradient pt-1 rounded-lg overflow-hidden'>
      <div className='bg-[#2A2634] rounded-lg pt-5 pb-6 px-8 flex flex-col gap-2 items-start sm:flex-row sm:justify-between sm:items-center'>
        <div>
          <div className='font-black text-2xl text-white'>Não encontrou seu duo?</div>
          <div className='text-zinc-400'>Publique um anúncio para encontrar novos players!</div>
        </div>
        <Dialog.Trigger className='bg-violet-500 rounded-md p-4 hover:bg-violet-600 transition-all text-white flex items-center gap-3 font-medium'>
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
