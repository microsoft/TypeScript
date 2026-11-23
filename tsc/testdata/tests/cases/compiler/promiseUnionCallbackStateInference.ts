// @strict: true
// @target: es2015

declare function createAction<State>(
    action: (state: State) => State | Promise<State>,
    initialState: State,
): () => void;
declare function createAction<State>(
    action: (state: State, payload: string) => State | Promise<State>,
    initialState: State,
): (payload: string) => void;

declare const action: (previous: unknown, value: string) => Promise<string>;
const dispatch = createAction(action, null);
const bound = dispatch.bind(null, "value");
