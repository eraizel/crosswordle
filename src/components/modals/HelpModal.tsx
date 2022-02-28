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
                    How to play
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Resolva o Crudle adivinhando o WORDLE para cada palavra horizontal e vertical.
                      Clique na linha da cruzada e use as regras do Wordle para resolver. Você possui 6 tentivas para cada palavra.
                      Assim como no Wordle a cada tentativa a cor das letras vai trocar para indicar o quão próximo
                      de acertar a palavra.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="A" status="correct" />
                      <Cell value="C" />
                      <Cell value="A" />
                      <Cell value="S" />
                      <Cell value="O" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra A está na palabra e está na posição correta.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="N" />
                      <Cell value="U" />
                      <Cell value="V" status="present" />
                      <Cell value="E" />
                      <Cell value="M" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra V existe na palavra mas está na posição errada.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="V" />
                      <Cell value="A" />
                      <Cell value="G" />
                      <Cell value="O" status="absent" />
                      <Cell value="S" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra O não existe na palavra.
                    </p>

                    <br />
                    <p className="text-sm text-gray-500">
                      Se você travar em alguma das palavras.
                      Clique nas celulas para trocar a direção horizontal e vertical.
                      Se a letra for encontrada na posição correta em qualquer direção a letra vai se tornar verde.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="V" />
                      <Cell value="I" />
                      <Cell value="S" />
                      <Cell value="O" />
                      <Cell knownValue="R" />
                    </div>
                    <p className="text-sm text-gray-500">
                      A letra R exite nesta posição por que foi encontrada na vertical ou horizontal.
                    </p>
                    <br />

                    <h4>Teclado</h4>
                    <p className='text-sm text-gray-500'>O teclado vai mudar de cor de acordo com as tentativas.</p>
                    <div className="flex mb-1 mt-4 items-center">
                      <div className='grow mr-2'>
                        <Key value="X"/>
                      </div>
                      <p className="text-sm text-gray-500 text-left">A letra X pode aparecer na palavra selecionada.</p>
                    </div>
                    <div className="flex mb-1 mt-4 items-center">
                      <div className='grow mr-2'>
                        <Key value="P" status='present'/>
                      </div>
                      <p className="text-sm text-gray-500 text-left">A letra P está na palavra selecionada mas está na posição errada.</p>
                    </div>
                    <div className="flex mb-1 mt-4 items-center">
                      <div className='grow mr-2'>
                        <Key value="Z" status='correct'/>
                      </div>
                      <p className="text-sm text-gray-500 text-left">
                        A letra Z existe na palavra selecionada e foi usada na posição correta.
                        Ela pode aparecer novamente.
                      </p>
                    </div>
                    <br />
                    <p className="text-sm text-gray-500">
                      Você também poderá encontrar as seguintes cores para as letras que você selecionar.
                    </p>
                    <div className="flex mb-1 mt-4 items-center">
                      <div className='grow mr-2'>
                        <Key value="X" crossedStatus='absent'/>
                      </div>
                      <p className="text-sm text-gray-500 text-left">A letra X pode aparecer na palavra selecionada.</p>
                    </div>
                    <div className="flex mb-1 mt-4 items-center">
                      <div className='grow mr-2'>
                        <Key value="P" status='present' crossedStatus='absent'/>
                      </div>
                      <p className="text-sm text-gray-500 text-left">A letra P está na palavra selecionada mas está na posição errada.</p>
                    </div>
                    <div className="flex mb-1 mt-4 items-center">
                      <div className='grow mr-2'>
                        <Key value="Z" status='correct' crossedStatus='absent'/>
                      </div>
                      <p className="text-sm text-gray-500 text-left">
                        A letra Z existe na palavra selecionada e foi usada na posição correta.
                        Ela pode aparecer novamente.
                      </p>
                    </div>
                    <br />
                    <p className="text-sm text-gray-500">
                      Quando você entrar uma letra a próxima letra na palavra será ativada.
                    </p>
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
