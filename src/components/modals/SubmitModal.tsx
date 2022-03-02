import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { trackEvent } from '../../lib/analytics'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SubmitModal = ({ isOpen, handleClose }: Props) => {
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
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Envie um <b>CRUDLE</b>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Gostou do <b>CRUDLE</b>? Envie o seu na nós!
                    </p>
                    <p className='text-sm mt-3 text-gray-500'>
                      Faça uma cruzada de 5x5. Eu recomendo usar {' '}
                      <a href="https://crosshare.org/construct" className="underline font-bold" target="_blank" rel="noreferrer" onClick={() => trackEvent('open_crosshare')}>Crosshare.org</a>.
                    </p>
                    <p className='text-sm mt-3 text-gray-500'>
                      Depois de pronto faça print da cruzada e envie para{' '}
                      <a href="mailto:eraizel+crudle@gmail.com" className="underline font-bold" target="_blank" rel="noreferrer" onClick={() => trackEvent('email_submission')}>eraizel+crudle@gmail.com</a>
                      {' '} não esqueça de incluir seu nome para os créditos!
                    </p>
                    <p className='mt-3 text-gray-500'>Dicas:</p>
                    <ul style={{ listStyle: 'inside', textAlign: 'left' }} className='text-gray-500'>
                      <li>Tente usar palavras longas de 5 ou 4 letras. Palavras pequenas precisam de muita sorte!</li>
                      <li>Se usar palavras pequenas certifique-se que elas são válidas tanto na horizontal como na vertical.</li>
                      <li>Nada contra palavras em inglês mas utilize apenas as mais conhecidas.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
