import { Link } from 'react-router-dom';
import { Game } from '../models/Games';

export interface GameCardProps {
  to: string;
}

export default function GameCard(props: Game & GameCardProps) {
  const {
    to,
    title,
    bannerUrl,
    _count: { ads },
  } = props;

  return (
    <Link to={to} className='relative rounded-lg overflow-hidden'>
      <img src={bannerUrl} alt={title} />
      <div className='w-full pt-16 pb-4 px-4 absolute bottom-0 left-0 rigth-0 bg-game-card-text'>
        <div className='text-white text-sm font-bold'>{title}</div>
        <div className='text-zinc-300 mt-1 text-sm'>{`${ads} anúncio${ads !== 1 ? 's' : ''}`}</div>
      </div>
    </Link>
  );
}
