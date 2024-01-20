import React, {useState} from 'react';
import {useDrag} from 'react-dnd';
import {useDispatch} from 'react-redux';
import {editCard} from '../store/columnsSlice';

export interface CardProps {
    id: string;
    title: string;
    columnId: string;
}

const Card: React.FC<CardProps> = ({id, title, columnId}) => {
    const dispatch = useDispatch();
    const [, drag] = useDrag({
        type: 'CARD',
        item: {id, title, columnId},
    });

    const [isEditing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleEditCard = () => {
        dispatch(editCard({cardId: id, newTitle: editedTitle}));
        setEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedTitle(title);
        setEditing(false);
    };

    return (
        <div ref={drag}
             className="bg-white p-4 mb-4 rounded-md cursor-move shadow-md w-full max-w-md transition duration-300 ease-in-out transform hover:scale-105">
            {isEditing ? (
                <div >
                    <div>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="border border-gray-300 p-2 mb-2 w-3/4 mr-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex">
                        <button
                            onClick={handleEditCard}
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-red-500 text-white p-2 rounded-md ml-2 hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div >
                    <div className="flex-grow">{title}</div>
                    <button
                        onClick={() => setEditing(true)}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Card;
