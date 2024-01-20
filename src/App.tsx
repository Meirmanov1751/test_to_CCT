import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumns, addCard } from './store/columnsSlice';
import Column from './components/Column';
import Modal from './components/Modal';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const columns = useSelector(selectColumns);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [selectedColumnId, setSelectedColumnId] = useState('');

    const handleAddCard = () => {
        if (selectedColumnId && newCardTitle) {
            dispatch(addCard({ columnId: selectedColumnId, cardTitle: newCardTitle }));
            setModalOpen(false);
            setNewCardTitle('');
            setSelectedColumnId('');
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex">
                {columns.map((column) => (
                    <Column key={column.id} id={column.id} title={column.title} cards={column.cards} />
                ))}
            </div>

            <button className="m-2 p-2 bg-green-500 text-white rounded-md" onClick={() => setModalOpen(true)}>
                Add Card
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="bg-white p-6 rounded-md w-96">
                    <h2 className="text-xl font-semibold mb-4">Add Card</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Card Title:</label>
                        <input
                            type="text"
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Column:</label>
                        <select
                            value={selectedColumnId}
                            onChange={(e) => setSelectedColumnId(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                        >
                            <option value="">Select a Column</option>
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>
                                    {column.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleAddCard}
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        Add Card
                    </button>
                </div>
            </Modal>
        </DndProvider>
    );
};

export default App;
