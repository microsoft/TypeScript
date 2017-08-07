// @noImplicitAny: true
// @filename: index.ts
interface ActionsObject<State> {
    [prop: string]: (state: State) => State;
}

interface Options<State, Actions> {
    state?: State;
    view?: (state: State, actions: Actions) => any;
    actions: string | Actions;
}

declare function app<State, Actions extends ActionsObject<State>>(obj: Options<State, Actions>): void;

app({
    state: 100,
    actions: {
        foo: s => s
    },
    view: (s, a) => undefined as any,
});
