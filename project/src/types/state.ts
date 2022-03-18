import {store} from '../store/index.js';

export type State = ReturnType<typeof store.getState>;
