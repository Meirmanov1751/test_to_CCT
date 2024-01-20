// columnsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: string;
    title: string;
}

interface Column {
    id: string;
    title: string;
    cards: Card[];
}

interface ColumnsState extends Array<Column> {}

const initialState: ColumnsState = [
    { id: '1', title: 'Backlog', cards: [] },
    { id: '2', title: 'To Do', cards: [{ id: '101', title: 'Task 1' }, { id: '102', title: 'Task 2' }] },
    { id: '3', title: 'In Progress', cards: [{ id: '103', title: 'Task 3' }] },
    { id: '4', title: 'Queue', cards: [] },
];

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        editColumnTitle: (state, action: PayloadAction<{ columnId: string; newTitle: string }>) => {
            const column = state.find((c) => c.id === action.payload.columnId);
            if (column) {
                column.title = action.payload.newTitle;
            }
        },
        addCard: (state, action: PayloadAction<{ columnId: string; cardTitle: string }>) => {
            const column = state.find((c) => c.id === action.payload.columnId);
            if (column) {
                column.cards.push({ id: Date.now().toString(), title: action.payload.cardTitle });
            }
        },
        editCard: (state, action: PayloadAction<{ cardId: string; newTitle: string }>) => {
            for (const column of state) {
                const card = column.cards.find((c) => c.id === action.payload.cardId);
                if (card) {
                    card.title = action.payload.newTitle;
                    break;
                }
            }
        },
    },
});

export const { editColumnTitle, addCard, editCard } = columnsSlice.actions;

export default columnsSlice.reducer;
