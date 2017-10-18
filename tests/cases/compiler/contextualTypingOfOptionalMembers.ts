// @noImplicitAny: true
// @strictNullChecks: true
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
