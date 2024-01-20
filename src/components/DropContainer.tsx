import React, { ReactNode, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { moveCard } from '../store/columnsSlice';

interface DropContainerProps {
    onDrop: (item: any) => void;
    columnIndex: string;
    children?: ReactNode;
}

const DropContainer: React.FC<DropContainerProps> = ({ onDrop, columnIndex, children }) => {
    const dropRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item: any) => {
            dispatch(moveCard({ sourceColumnId: item.sourceColumnId, targetColumnId: columnIndex, cardId: item.id }));
            onDrop(item);
        },
    });

    drop(dropRef);

    return <div ref={dropRef}>{children}</div>;
};

export default DropContainer;
