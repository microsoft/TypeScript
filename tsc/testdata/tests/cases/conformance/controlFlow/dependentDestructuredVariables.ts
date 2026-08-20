// @strict: true
// @declaration: true
// @target: es2015
// @lib: esnext, dom

type Action =
    | { kind: 'A', payload: number }
    | { kind: 'B', payload: string };

function f10({ kind, payload }: Action) {
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}

function f11(action: Action) {
    const { kind, payload } = action;
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}

function f12({ kind, payload }: Action) {
    switch (kind) {
        case 'A':
            payload.toFixed();
            break;
        case 'B':
            payload.toUpperCase();
            break;
        default:
            payload;  // never
    }
}

// repro #50206
function f13<T extends Action>({ kind, payload }: T) {
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}

function f14<T extends Action>(t: T) {
    const { kind, payload } = t;
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}

type Action2 =
    | { kind: 'A', payload: number | undefined }
    | { kind: 'B', payload: string | undefined };

function f20({ kind, payload }: Action2) {
    if (payload) {
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}

function f21(action: Action2) {
    const { kind, payload } = action;
    if (payload) {
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}

function f22(action: Action2) {
    if (action.payload) {
        const { kind, payload } = action;
        if (kind === 'A') {
            payload.toFixed();
        }
        if (kind === 'B') {
            payload.toUpperCase();
        }
    }
}

function f23({ kind, payload }: Action2) {
    if (payload) {
        switch (kind) {
            case 'A':
                payload.toFixed();
                break;
            case 'B':
                payload.toUpperCase();
                break;
            default:
                payload;  // never
        }
    }
}

type Foo =
    | { kind: 'A', isA: true }
    | { kind: 'B', isA: false }
    | { kind: 'C', isA: false };

function f30({ kind, isA }: Foo) {
    if (kind === 'A') {
        isA;   // true
    }
    if (kind === 'B') {
        isA;   // false
    }
    if (kind === 'C') {
        isA;   // false
    }
    if (isA) {
        kind;  // 'A'
    }
    else {
        kind;  // 'B' | 'C'
    }
}

type Args = ['A', number] | ['B', string]

function f40(...[kind, data]: Args) {
    if (kind === 'A') {
        data.toFixed();
    }
    if (kind === 'B') {
        data.toUpperCase();
    }
}

// Repro from #35283

interface A<T> { variant: 'a', value: T }

interface B<T> { variant: 'b', value: Array<T> }

type AB<T> = A<T> | B<T>;

declare function printValue<T>(t: T): void;

declare function printValueList<T>(t: Array<T>): void;

function unrefined1<T>(ab: AB<T>): void {
    const { variant, value } = ab;
    if (variant === 'a') {
        printValue<T>(value);
    }
    else {
        printValueList<T>(value);
    }
}

// Repro from #38020

type Action3 =
    | {type: 'add', payload: { toAdd: number } }
    | {type: 'remove', payload: { toRemove: number } };

const reducerBroken = (state: number, { type, payload }: Action3) => {
    switch (type) {
        case 'add':
            return state + payload.toAdd;
        case 'remove':
            return state - payload.toRemove;
    }
}

// Repro from #46143

declare var it: Iterator<number>;
const { value, done } = it.next();
if (!done) {
    value;  // number
}

// Repro from #46658

declare function f50(cb: (...args: Args) => void): void

f50((kind, data) => {
    if (kind === 'A') {
        data.toFixed();
    }
    if (kind === 'B') {
        data.toUpperCase();
    }
});

const f51: (...args: ['A', number] | ['B', string]) => void = (kind, payload) => {
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
};

const f52: (...args: ['A', number] | ['B']) => void = (kind, payload?) => {
    if (kind === 'A') {
        payload.toFixed();
    }
    else {
        payload;  // undefined
    }
};

declare function readFile(path: string, callback: (...args: [err: null, data: unknown[]] | [err: Error, data: undefined]) => void): void;

readFile('hello', (err, data) => {
    if (err === null) {
        data.length;
    }
    else {
        err.message;
    }
});

type ReducerArgs = ["add", { a: number, b: number }] | ["concat", { firstArr: any[], secondArr: any[] }];

const reducer: (...args: ReducerArgs) => void = (op, args) => {
    switch (op) {
        case "add":
            console.log(args.a + args.b);
            break;
        case "concat":
            console.log(args.firstArr.concat(args.secondArr));
            break;
    }
}

reducer("add", { a: 1, b: 3 });
reducer("concat", { firstArr: [1, 2], secondArr: [3, 4] });

// repro from https://github.com/microsoft/TypeScript/pull/47190#issuecomment-1057603588

type FooMethod = {
  method(...args:
    [type: "str", cb: (e: string) => void] |
    [type: "num", cb: (e: number) => void]
  ): void;
}

let fooM: FooMethod = {
  method(type, cb) {
    if (type == 'num') {
      cb(123)
    } else {
      cb("abc")
    }
  }
};

type FooAsyncMethod = {
  method(...args:
    [type: "str", cb: (e: string) => void] |
    [type: "num", cb: (e: number) => void]
  ): Promise<any>;
}

let fooAsyncM: FooAsyncMethod = {
  async method(type, cb) {
    if (type == 'num') {
      cb(123)
    } else {
      cb("abc")
    }
  }
};

type FooGenMethod = {
  method(...args:
    [type: "str", cb: (e: string) => void] |
    [type: "num", cb: (e: number) => void]
  ): Generator<any, any, any>;
}

let fooGenM: FooGenMethod = {
  *method(type, cb) {
    if (type == 'num') {
      cb(123)
    } else {
      cb("abc")
    }
  }
};

type FooAsyncGenMethod = {
  method(...args:
    [type: "str", cb: (e: string) => void] |
    [type: "num", cb: (e: number) => void]
  ): AsyncGenerator<any, any, any>;
}

let fooAsyncGenM: FooAsyncGenMethod = {
  async *method(type, cb) {
    if (type == 'num') {
      cb(123)
    } else {
      cb("abc")
    }
  }
};

// Repro from #48345

type Func = <T extends ["a", number] | ["b", string]>(...args: T) => void;

const f60: Func = (kind, payload) => {
    if (kind === "a") {
        payload.toFixed();  // error
    }
    if (kind === "b") {
        payload.toUpperCase();  // error
    }
};

// Repro from #48902

function foo({
    value1,
    test1 = value1.test1,
    test2 = value1.test2,
    test3 = value1.test3,
    test4 = value1.test4,
    test5 = value1.test5,
    test6 = value1.test6,
    test7 = value1.test7,
    test8 = value1.test8,
    test9 = value1.test9
}) {}

// Repro from #49772

function fa1(x: [true, number] | [false, string]) {
    const [guard, value] = x;
    if (guard) {
        for (;;) {
            value;  // number
        }
    }
    else {
        while (!!true) {
            value;  // string
        }
    }
}

function fa2(x: { guard: true, value: number } | { guard: false, value: string }) {
    const { guard, value } = x;
    if (guard) {
        for (;;) {
            value;  // number
        }
    }
    else {
        while (!!true) {
            value;  // string
        }
    }
}

const fa3: (...args: [true, number] | [false, string]) => void = (guard, value) => {
    if (guard) {
        for (;;) {
            value;  // number
        }
    }
    else {
        while (!!true) {
            value;  // string
        }
    }
}

// Repro from #52152

interface ClientEvents {
    warn: [message: string];
    shardDisconnect: [closeEvent: CloseEvent, shardId: number];
}
  
declare class Client {
    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): void;
}

const bot = new Client();
bot.on("shardDisconnect", (event, shard) => console.log(`Shard ${shard} disconnected (${event.code},${event.wasClean}): ${event.reason}`));
bot.on("shardDisconnect", event => console.log(`${event.code} ${event.wasClean} ${event.reason}`));

// Destructuring tuple types with different arities

function fz1([x, y]: [1, 2] | [3, 4] | [5]) {
    if (y === 2) {
        x;  // 1
    }
    if (y === 4) {
        x;  // 3
    }
    if (y === undefined) {
        x;  // 5
    }
    if (x === 1) {
        y;  // 2
    }
    if (x === 3) {
        y;  // 4
    }
    if (x === 5) {
        y;  // undefined
    }
}

// Repro from #55661

function tooNarrow([x, y]: [1, 1] | [1, 2] | [1]) {
    if (y === undefined) {
        const shouldNotBeOk: never = x;  // Error
    }
}

// https://github.com/microsoft/TypeScript/issues/56312

function parameterReassigned1([x, y]: [1, 2] | [3, 4]) {
  if (Math.random()) {
    x = 1;
  }
  if (y === 2) {
    x; // 1 | 3
  }
}

function parameterReassigned2([x, y]: [1, 2] | [3, 4]) {
  if (Math.random()) {
    y = 2;
  }
  if (y === 2) {
    x; // 1 | 3
  }
}

// https://github.com/microsoft/TypeScript/pull/56313#discussion_r1416482490

const parameterReassignedContextualRest1: (...args: [1, 2] | [3, 4]) => void = (x, y) => {
  if (Math.random()) {
    y = 2;
  }
  if (y === 2) {
    x; // 1 | 3
  }
}
