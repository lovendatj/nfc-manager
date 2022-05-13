export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type UserState = {
    user: User | null;
    token: string | null;
    tokenExpiration: number | null;
    status: 'idle' | 'loading' | 'success' | 'error';
}

export const initialState: UserState = {
    user: null,
    token: null,
    tokenExpiration: null,
    status: 'idle',
}