import { atom, selector } from 'recoil';

export const credentialsState = atom({
    key: 'credentialsState',
    default: {
        username: '',
        password: '',
    },
});

export const usernameSelector = selector({
    key: 'usernameSelector',
    get: ({ get }) => {
        const credentials = get(credentialsState);
        return credentials.username;
    },
    set: ({ set, get }, newValue) => {
        const credentials = get(credentialsState);
        set(credentialsState, { ...credentials, username: newValue });
    },
});

export const passwordSelector = selector({
    key: 'passwordSelector',
    get: ({ get }) => {
        const credentials = get(credentialsState);
        return credentials.password;
    },
    set: ({ set, get }, newValue) => {
        const credentials = get(credentialsState);
        set(credentialsState, { ...credentials, password: newValue });
    },
});
