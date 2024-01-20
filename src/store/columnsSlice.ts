import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Card {
    id: string;
    title: string;
}

interface Column {
    id: string;
    title: string;
    cards: Card[];
}

interface ColumnsState {
    columns: Column[];
}

const initialState: ColumnsState = {
    columns: [
        { id: 'column1', title: 'Backlog', cards: [{ id: 'card12', title: 'Task 1' }] },
        { id: 'column2', title: 'To Do', cards: [{ id: 'card1', title: 'Task 1' }] },
        { id: 'column3', title: 'In Progress', cards: [{ id: 'card2', title: 'Task 2' }] },
        { id: 'column4', title: 'Done', cards: [{ id: 'card3', title: 'Task 3' }] },
    ],
};

export const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        editColumnTitle: (state, action: PayloadAction<{ columnId: string; newTitle: string }>) => {
            const column = state.columns.find((col) => col.id === action.payload.columnId);
            if (column) {
                column.title = action.payload.newTitle;
            }
        },
        editCard: (state, action: PayloadAction<{ cardId: string; newTitle: string }>) => {
            for (const column of state.columns) {
                const card = column.cards.find((c) => c.id === action.payload.cardId);
                if (card) {
                    card.title = action.payload.newTitle;
                    break;
                }
            }
        },
        addCard: (state, action: PayloadAction<{ columnId: string; cardTitle: string }>) => {
            const column = state.columns.find((col) => col.id === action.payload.columnId);
            if (column) {
                column.cards.push({
                    id: `card${column.cards.length + 1}`,
                    title: action.payload.cardTitle,
                });
            }
        },
        moveCard: (state, action: PayloadAction<{ sourceColumnId: string; targetColumnId: string; cardId: string }>) => {
            const { sourceColumnId, targetColumnId, cardId } = action.payload;
            const sourceColumn = state.columns.find((col) => col.id === sourceColumnId);
            const targetColumn = state.columns.find((col) => col.id === targetColumnId);

            if (sourceColumn && targetColumn) {
                const cardIndex = sourceColumn.cards.findIndex((card) => card.id === cardId);

                if (cardIndex !== -1) {
                    const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);
                    targetColumn.cards.push(movedCard);
                }
            }
        },
    },
});

export const { editColumnTitle, editCard, addCard, moveCard } = columnsSlice.actions;

export const selectColumns = (state: RootState) => state.columns.columns;

export default columnsSlice.reducer;
