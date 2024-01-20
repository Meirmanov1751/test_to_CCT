import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; // Добавляем декларацию children
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
                {children}
                <button className="mt-2 p-2 bg-gray-500 text-white rounded-md" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;