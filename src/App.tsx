import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BounceLoader } from 'react-spinners';
import { gamesServices } from './services/Games.service';
import { Game } from './models/Games';
import AdBanner from './components/AdBanner';
import GameCard from './components/GameCard';
import Modal from './components/Modal';
import LoadingOverlay from './components/LoadingOverlay';
import logo from './assets/logo-nlw-esports.svg';

export default function App() {
  const [fetchedGames, setFetchedGames] = useState<Game[]>([]);
  const [isPostingAd, setIsPostingAd] = useState(false);

  useEffect(() => {
    gamesServices.getGames().then((response) => setFetchedGames(response));
  }, [isPostingAd]);

  return (
    <div className='max-w-[1344px] px-6 mx-auto flex flex-col items-center'>
      <img src={logo} className='mt-20' />
      <div className='mt-20 text-6xl text-white font-black text-center'>
        Seu <span className='bg-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </div>
      <div className='flex flex-col-reverse gap-12 my-16 sm:flex-col'>
        {!!fetchedGames.length ? (
          <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6'>
            {fetchedGames.map((game) => (
              <GameCard key={game.id} to='' {...game} />
            ))}
          </div>
        ) : (
          <div className='text-3xl bg-gradient bg-clip-text text-transparent font-black text-center'>
            Nenhum jogo encontrado. Tente mais tarde.
          </div>
        )}
        <Modal setIsPostingAd={setIsPostingAd} games={fetchedGames}>
          <AdBanner />
        </Modal>
      </div>
      <Toaster />
      <LoadingOverlay open={isPostingAd} loadingTextOrComponent={<BounceLoader size={128} color='#7C3AED' />} />
    </div>
  );
}
