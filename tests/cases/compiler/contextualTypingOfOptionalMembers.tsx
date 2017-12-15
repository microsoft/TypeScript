// @noImplicitAny: true
// @strictNullChecks: true
// @jsx: preserve
// @filename: index.tsx
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
        foo: s => s // Should be typed number => number
    },
    view: (s, a) => undefined as any,
});


interface Bar {
    bar: (a: number) => void;
}

declare function foo<T extends Bar>(x: string | T): T;

const y = foo({
    bar(x) { // Should be typed number => void
    }
});

interface Options2<State, Actions> {
    state?: State;
    view?: (state: State, actions: Actions) => any;
    actions?: Actions;
}

declare function app2<State, Actions extends ActionsObject<State>>(obj: Options2<State, Actions>): void;

app2({
    state: 100,
    actions: {
        foo: s => s // Should be typed number => number
    },
    view: (s, a) => undefined as any,
});


type ActionsArray<State> = ((state: State) => State)[];

declare function app3<State, Actions extends ActionsArray<State>>(obj: Options<State, Actions>): void;

app3({
    state: 100,
    actions: [
        s => s // Should be typed number => number
    ],
    view: (s, a) => undefined as any,
});

namespace JSX {
    export interface Element {}
    export interface IntrinsicElements {}
}

interface ActionsObjectOr<State> {
    [prop: string]: ((state: State) => State) | State;
}

declare function App4<State, Actions extends ActionsObjectOr<State>>(props: Options<State, Actions>["actions"] & { state: State }): JSX.Element;

const a = <App4 state={100} foo={s => s} />; // TODO: should be number => number, but JSX resolution is missing an inferential pass
