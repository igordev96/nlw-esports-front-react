import * as Dialog from '@radix-ui/react-dialog';

export interface LoadingOverlayProps {
  open: boolean;
  loadingTextOrComponent?: JSX.Element | string;
}

export default function LoadingOverlay(props: LoadingOverlayProps) {
  const { open, loadingTextOrComponent = 'Loading...' } = props;

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/80 fixed inset-0' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center z-10'>
          {typeof loadingTextOrComponent === 'string' ? (
            <div className='font-semibold text-white text-8xl'>{loadingTextOrComponent}</div>
          ) : (
            <>{loadingTextOrComponent}</>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
