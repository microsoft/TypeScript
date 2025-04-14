// @strict: true
// @noEmit: true

// repro #48524

type Magic<X> = X extends [[infer Y, ...infer _], ...infer __] ? Y : never;

type R = Magic<[[number]]>

// repro #52722

type Recursive<Id> = {
    id: Id
    children: readonly Recursive<Id>[]
}

declare function getIds<Id>(items: readonly Recursive<Id>[]): Id[];

const items = [{
    id: 'a',
    children: [{
        id: 'b',
        children: []
    }]
}] as const satisfies readonly Recursive<string>[]

const foo = getIds(items)

// variant with a fresh argument
const foo2 = getIds([{
    id: 'a',
    children: [{
        id: 'b',
        children: []
    }]
}] as const)

// Repro from comment in #49226

type T1<T> = [number, T1<{ x: T }>];
type T2<T> = [42, T2<{ x: T }>];

function qq<U>(x: T1<U>, y: T2<U>) {
    x = y;
    y = x;  // Error
}
