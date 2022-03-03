import Gif from 'gif.js';
import { saveAs } from 'file-saver';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/outline';
import { ShareIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/outline';
import { MiniCrossword, SVG_WIDTH, SVG_HEADER_SIZE } from '../mini-crossword/MiniCrossword';
import { getTotalGuesses, sleep, timeTillTomorrow } from '../../lib/utils';
import { GridData } from '../../types';
import { createGridData } from '../../lib/crossword-utils';
import { trackShare } from '../../lib/analytics';
import { toast } from 'react-toastify';
import { crosswordIndex, crossword } from '../../lib/utils';
import { useGameState } from '../../redux/hooks/useGameState';

const GIF_DELAY = 250;
const GIF_WIDTH = 200;
const GIF_HEIGHT = GIF_WIDTH * ((SVG_WIDTH + SVG_HEADER_SIZE) / SVG_WIDTH);

const createGifEncoder = (filename: string, onFinish?: () => void) => {
  const gifEncoder = new Gif({
    width: GIF_WIDTH,
    height: GIF_HEIGHT,
    workers: 2,
    quality: 1,
    repeat: 0,
  })
  
  gifEncoder.on('finished', function(blob) {
    saveAs(blob, filename);
    if (onFinish) onFinish();
  });
  
  return gifEncoder;
};

type Props = {
  isOpen: boolean;
  openSubmitModal: () => void;
  handleClose: () => void;
}

export const ShareModal = ({
  isOpen,
  openSubmitModal,
  handleClose,
}: Props) => {
  const { guesses, shareHistory, isGameWon, lostCell } = useGameState(crosswordIndex);
  const isGameLost = Boolean(lostCell);
  const [timeTillNext, setTimeTillNext] = useState(timeTillTomorrow);
  const [creatingGif, setCreatingGif] = useState<boolean>(false);
  const [gifEncoder, setGifEncoder] = useState<Gif>(createGifEncoder(`Crudle-${crosswordIndex + 1}.gif`, () => setCreatingGif(false)));
  const svgRef = useRef<SVGSVGElement>(null);
  const [cellColors, setCellColors] = useState<{ [key: string]: string }>();
  const [gridData] = useState<GridData>(createGridData(crossword));
  const totalGuesses = getTotalGuesses(guesses);

  // Update time till next crudle every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTillNext(timeTillTomorrow);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) setCellColors({});
  }, [isOpen]);


  const addSvgFrame = useCallback((svg: SVGSVGElement, delay: number = 0) => {
    return new Promise(async (resolve, reject) => {
      const base64 = window.btoa(new XMLSerializer().serializeToString(svg));

      const image = new Image();
      image.width = GIF_WIDTH;
      image.height = GIF_HEIGHT;

      image.onload = () => {
        gifEncoder.addFrame(image, { delay: delay });
        resolve(true);
      }
      image.onerror = reject;
      image.src = `data:image/svg+xml;base64,${base64}`;
    });
  }, [gifEncoder]);

  const renderGif = useCallback(() => {
    gifEncoder.render();
    // Create a fresh encoder for next share
    setGifEncoder(createGifEncoder(`Crudle-${crosswordIndex + 1}.gif`, () => setCreatingGif(false)));
  }, [gifEncoder, setGifEncoder]);

  const share = useCallback(async () => {
    trackShare(crosswordIndex, isGameWon, isGameLost, totalGuesses);
    const svg = svgRef.current;
    if (!svg) return;

    setCreatingGif(true);

    const playback = new Promise(async (resolve) => {
      await addSvgFrame(svg);
      for (let i = 0; i < shareHistory.length; i++) {
        setCellColors(shareHistory[i]);
        await sleep(GIF_DELAY / 2);
        // Show the last cell for a longer period of time
        const delay = i === (shareHistory.length - 1) ? GIF_DELAY * 5 : GIF_DELAY;
        await addSvgFrame(svg, delay);
      }
      renderGif();
      let shareText = 'https://crudle.vercel.app';
      if (isGameWon) shareText = `Resolvi o #crudle de hoje em ${totalGuesses} tentativas!\n${shareText}`;
      navigator.clipboard.writeText(shareText);
      resolve('');
    });

    toast.promise(playback, {
      pending: 'Renderizando a resolução em GIF animado',
      success: 'Replay da resolução copiado para a área de trabalho',
      error: 'Alguma couisa não deu certo...'
    });
  }, [svgRef, addSvgFrame, renderGif, shareHistory, isGameWon, isGameLost, totalGuesses]);

  let title = `#Crudle #${crosswordIndex + 1} ${crossword.author || 'eraizel'}`; 
  if (isGameWon) title = 'Você Venceu!';
  if (isGameLost) title = 'Você Perdeu!';

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                {isGameWon && (
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {isGameLost && (
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <XIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                  {isGameWon && (
                    <>
                      <p>Você resolveu o #Crudle de hoje em {totalGuesses} tentativas!</p>
                      <p className="text-sm text-gray-500">Você é um gênio. Você deveria ser estudado</p>
                    </>
                  )}
                  {isGameLost && (
                    <>
                      <p>Você tentou {totalGuesses} palavras diferentes!</p>
                      <p className="text-sm text-gray-500">Boa sorte na próxima!</p>
                    </>
                  )}
                  {!isGameWon && !isGameLost && totalGuesses > 0 && <p>Você tentou {totalGuesses} palavras diferentes!</p>}
                  </div>
                  <div className="flex justify-center items-end w-full overflow-y-hidden" style={{ height: SVG_WIDTH }}>
                    {gridData && <MiniCrossword gridData={gridData} ref={svgRef} cellColors={cellColors} totalGuesses={totalGuesses} />}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className='flex justify-center items-center text-center'>
                  <div className='w-1/2 border-r-slate-300 border-r-[1px] mr-2 flex-col justify-center items-center text-center'>
                    <p>Próximo <b>CRUDLE</b></p>
                    <p className='text-xl'>{timeTillNext}</p>
                  </div>
                  <div className='w-1/2 ml-2 flex justify-center items-center text-center'>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full h-10 my-auto rounded-md border border-transparent shadow-sm px-4 py-2 disabled:bg-indigo-200 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      disabled={creatingGif}
                      onClick={share}
                    >
                      {creatingGif ? 'Creating GIF' : (
                        <>
                          <span className="mr-2">Compartilhe</span>
                          <ShareIcon width={20} height={20}/>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                { (
                  <div className="flex flex-col mx-auto items-center m-4 md:m-6 text-center border-t border-t-slate-300">
                    <p className="p-4">❤️❤️ Crudle?</p>
                    <button
                      type="button"
                      className="mx-auto flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      
                    >
                       <a
                        href="https://ko-fi.com/eraizel"
                        className="underline font-bold"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Pague-me um café!
                      </a>
                      
                    </button>
                    </div>
                    
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
