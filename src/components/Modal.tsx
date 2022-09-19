import { Dispatch, FormEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { gamesServices } from '../services/Games.service';
import { Game } from '../models/Games';
import { Ad } from '../models/Ads';
import Input from './Form/Input';
import CheckBox from './Form/CheckBox';
import SelectWeekDays from './Form/SelectWeekDays';

export interface ModalProps {
  games: Game[];
  setIsPostingAd: Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

const defaultFormState: Ad = {
  gameId: '',
  name: '',
  yearsPlaying: 0,
  discord: '',
  weekDays: [],
  hourStart: '',
  hourEnd: '',
  useVoiceChannel: false,
};

export default function Modal(props: ModalProps) {
  const { games, setIsPostingAd, children } = props;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [formState, setFormState] = useState<Ad>(defaultFormState);

  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) setFormState(defaultFormState);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formState.discord &&
      !formState.gameId &&
      !formState.name &&
      !formState.yearsPlaying &&
      formState.weekDays.length === 0 &&
      !formState.hourStart &&
      !formState.hourEnd
    ) {
      toast.error('Por favor, insira valores válidos para criar o anúncio!');
      return;
    }
    setIsPostingAd(true);
    gamesServices
      .createAnAd(formState)
      .then(() => {
        toast.success('Anúncio criado com sucesso!');
        closeButtonRef?.current?.click();
      })
      .catch(() => {
        toast.error('Ocorreu um erro na criação. Tente mais tarde.');
      })
      .finally(() => {
        setIsPostingAd(false);
      });
  };

  return (
    <Dialog.Root onOpenChange={handleModalClose}>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 fixed inset-0' />
        <Dialog.Content className='fixed left-0 right-0 top-1/2 -translate-y-1/2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 flex flex-col items-center gap-8 bg-[#2A2634] px-10 py-8 sm:w-[480px] rounded-lg'>
          <Dialog.Title className=' text-white font-black text-3xl'>Publique um anúncio</Dialog.Title>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Input
              onChange={(e) => {
                setFormState((prevFormState) => {
                  return {
                    ...prevFormState,
                    gameId: e.target.value,
                  };
                });
              }}
              id='game'
              label='Qual o game?'
              placeholder='Selecione o game que deseja jogar'
              select={true}
              options={games}
            />
            <Input
              onChange={(e) => {
                setFormState((prevFormState) => {
                  return {
                    ...prevFormState,
                    name: e.target.value,
                  };
                });
              }}
              id='name'
              label='Seu nome (ou nickname)'
              placeholder='Como te chamam dentro do game'
            />
            <div className='grid grid-cols-2 gap-6'>
              <Input
                onChange={(e) => {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      yearsPlaying: +e.target.value,
                    };
                  });
                }}
                type='number'
                id='yearsPlaying'
                label='Joga há quantos anos?'
                placeholder='Tudo bem ser ZERO'
              />
              <Input
                onChange={(e) => {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      discord: e.target.value,
                    };
                  });
                }}
                id='discord'
                label='Qual seu Discord?'
                placeholder='user#1234'
              />
            </div>
            <SelectWeekDays setFormState={setFormState} label='Quando costuma jogar?' />
            <Input
              onChange={(e) => {
                if (e.target.id.toLowerCase() === 'hourStart'.toLowerCase()) {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      hourStart: e.target.value,
                    };
                  });
                }
                if (e.target.id.toLowerCase() === 'hourEnd'.toLowerCase()) {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      hourEnd: e.target.value,
                    };
                  });
                }
              }}
              type='time'
              label='Qual horário do dia?'
            />
            <CheckBox
              onChange={(checked) => {
                setFormState((prevFormState) => {
                  return {
                    ...prevFormState,
                    useVoiceChannel: (checked as boolean) ?? false,
                  };
                });
              }}
              label='Costumo me conectar ao chat de voz'
            />
            <footer className='flex gap-4 justify-end text-white font-semibold mt-4'>
              <Dialog.DialogClose
                ref={closeButtonRef}
                className='px-4 py-3 rounded bg-zinc-500 hover:bg-zinc-600 transition-all'>
                Cancelar
              </Dialog.DialogClose>
              <button
                type='submit'
                className='flex gap-2 items-center px-4 py-3 rounded bg-violet-500 hover:bg-violet-600 transition-all'>
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
