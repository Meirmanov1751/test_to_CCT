import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import Card from './Card';
import { moveCard } from '../store/columnsSlice';

interface ColumnProps {
    id: string;
    title: string;
    cards: any;
}

const Column: React.FC<ColumnProps> = ({ id, title, cards }) => {
    const dispatch = useDispatch();

    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item: any) => {
            if (item.columnId !== id) {
                dispatch(moveCard({ sourceColumnId: item.columnId, targetColumnId: id, cardId: item.id }));
            }
        },
    });

    return (
        <div ref={drop} className="bg-gray-200 p-4 rounded-md m-2 w-64">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            {cards.map((card: any) => (
                <Card key={card.id} id={card.id} title={card.title} columnId={id} />
            ))}
        </div>
    );
};

export default Column;
