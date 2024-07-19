import React from "react"
import { createPortal } from "react-dom";
import ModalBackDrop from "./modal-backdrop";
import { X } from 'lucide-react';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void
}

function ModalPortal (content: React.ReactNode) {
  return (
    createPortal(content, document.body)
  );
}

function Modal({ children, onClose }: ModalProps) {
  return (
    ModalPortal(
      <>
          <ModalBackDrop onClose={onClose}/>
          <div className="fixed top-0 left-0 w-full h-full z-[100] overflow-y-auto flex items-center pointer-events-none animate-fadeUp">
              <div className="pointer-events-auto max-w-[500px] mx-auto bg-white rounded-lg shadow-lg w-full pt-[60px] pb-[50px] px-[35px]  relative">
                <button 
                  type="button" 
                  className="absolute top-[20px] right-[20px] rounded-lg bg-gray-500 w-[35px] h-[35px] flex items-center justify-center hover:bg-[#ff7675] transition-colors"
                  onClick={() => { onClose() }}>
                  <X size={28} strokeWidth={2.25} absoluteStrokeWidth color="#fff"/>
                </button>
                {children} 
              </div>
          </div>
      </>
    )
  )
}

export default Modal