import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XCircleIcon } from '@heroicons/react/outline'
import { Key } from '../keyboard/Key'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const HelpModal = ({ isOpen, handleClose }: Props) => {
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
                    Como Jogar?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-justify">
                      Para resolver o <b>CRUDLE</b> de hoje considere cada linha ou coluna como um <b>WORDLE</b>. Você possui 
                      6 tentativas para cada palavra.
                      <br />
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="A" status="correct" />
                      <Cell value="C" />
                      <Cell value="A" />
                      <Cell value="S" />
                      <Cell value="O" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra <b>A</b> está na posição correta.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="N" />
                      <Cell value="U" />
                      <Cell value="V" status="present" />
                      <Cell value="E" />
                      <Cell value="M" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra <b>V</b> está na posição errada.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="V" />
                      <Cell value="A" />
                      <Cell value="G" />
                      <Cell value="O" status="absent" />
                      <Cell value="S" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra <b>O</b> não existe na palavra.
                    </p>
                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="V" />
                      <Cell value="I" />
                      <Cell value="S" />
                      <Cell value="O" />
                      <Cell knownValue="R" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra <b>R</b> está no local correto.
                    </p>
                    <br />
                    <div className="flex justify-center mb-1 mt-4">
                      <Key value="T"/>
                      <Key value="E"/>
                      <Key value="C"/>
                      <Key value="L"/>
                      <Key value="A"/>
                      <Key value="D"/>
                      <Key value="O"/>
                    </div>
                    <p className='text-sm text-gray-500'>O teclado vai mudar conforme as tentativas.</p>
                    <div className="flex justify-center mb-1 mt-4">
                        <Key value="A"/>
                        <Key value="B" status='correct'/>
                        <Key value="C" status='present'/> 
                        <Key value="D" crossedStatus='absent'/>
                        <Key value="E" status='present' crossedStatus='absent'/>
                        <Key value="F" status='correct' crossedStatus='absent'/>
                    </div>
                    
                    <p className="text-sm text-gray-500 text-justify">
                      A letra <b>A</b> ainda ainda não foi utilizada.
                      <br />
                      A letra <b>B</b> existe mas está na posição errada.
                      <br />
                      A letra <b>C</b> está na posição correta.
                      <br />
                      A letra <b>D</b> ainda ainda não foi utilizada.
                      <br />
                      A letra <b>E</b> existe mas está na posição errada.
                      <br />
                      A letra <b>F</b> está na posição correta.
                    </p> 
                    
                    <br />

                    <br />
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
