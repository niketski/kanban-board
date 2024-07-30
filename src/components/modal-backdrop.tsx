interface ModalBackDropProps {
  onClose: () => void
}

function ModalBackDrop({ onClose }: ModalBackDropProps) {

  return (
    <div 
      onClick={() => { onClose() }}
      className="fixed top-0 left-0 w-full h-full z-[99] bg-black opacity-40">
        <span className="hidden">ModalBackDrop</span>
    </div>
  )

}

export default ModalBackDrop