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