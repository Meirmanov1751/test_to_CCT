import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; // Добавляем декларацию children
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2>Add Card</h2>
            <label>
                Card Title:
                <input type="text" value={newCardTitle} onChange={(e) => setNewCardTitle(e.target.value)} />
            </label>
            <label>
                Select Column:
                <select value={selectedColumnId} onChange={(e) => setSelectedColumnId(e.target.value)}>
                    <option value="">Select a Column</option>
                    {columns.map((column) => (
                        <option key={column.id} value={column.id}>
                            {column.title}
                        </option>
                    ))}
                </select>
            </label>
            <button onClick={handleAddCard}>Add Card</button>
        </Modal>
    );
};

export default Modal;