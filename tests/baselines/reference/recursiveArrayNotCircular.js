//// [tests/cases/compiler/recursiveArrayNotCircular.ts] ////

//// [recursiveArrayNotCircular.ts]
type Action<T, P> = P extends void ? { type : T } : { type: T, payload: P }

enum ActionType {
    Foo,
    Bar,
    Baz,
    Batch
}

type ReducerAction =
  | Action<ActionType.Bar, number>
  | Action<ActionType.Baz, boolean>
  | Action<ActionType.Foo, string>
  | Action<ActionType.Batch, ReducerAction[]>

function assertNever(a: never): never {
    throw new Error("Unreachable!");
}

function reducer(action: ReducerAction): void {
    switch(action.type) {
        case ActionType.Bar:
            const x: number = action.payload;
            break;
        case ActionType.Baz:
            const y: boolean = action.payload;
            break;
        case ActionType.Foo:
            const z: string = action.payload;
            break;
        case ActionType.Batch:
            action.payload.map(reducer);
            break;
        default: return assertNever(action);
    }
}

//// [recursiveArrayNotCircular.js]
var ActionType;
(function (ActionType) {
    ActionType[ActionType["Foo"] = 0] = "Foo";
    ActionType[ActionType["Bar"] = 1] = "Bar";
    ActionType[ActionType["Baz"] = 2] = "Baz";
    ActionType[ActionType["Batch"] = 3] = "Batch";
})(ActionType || (ActionType = {}));
function assertNever(a) {
    throw new Error("Unreachable!");
}
function reducer(action) {
    switch (action.type) {
        case ActionType.Bar:
            var x = action.payload;
            break;
        case ActionType.Baz:
            var y = action.payload;
            break;
        case ActionType.Foo:
            var z = action.payload;
            break;
        case ActionType.Batch:
            action.payload.map(reducer);
            break;
        default: return assertNever(action);
    }
}
