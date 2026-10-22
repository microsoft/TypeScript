//// [tests/cases/compiler/checkOrderEmitBeforeCheck.ts] ////

//// [checkOrderEmitBeforeCheck.ts]
// The circularity in the mapped type is found by checking the annotation of
// "each". Emitting first must not instead report it at the use import
// elision visits, nor cache the result without the error.
type NonOptionalKeys<T> = { [P in keyof T]: undefined extends T[P] ? never : P }[keyof T];
type Child<T> = { [P in NonOptionalKeys<T>]: T[P] }

export interface ListWidget {
    "type": "list",
    "each": Child<ListWidget>;
}

type ListChild = Child<ListWidget>

declare let x: ListChild;
x.type;


//// [checkOrderEmitBeforeCheck.js]
x.type;
export {};


//// [checkOrderEmitBeforeCheck.d.ts]
type NonOptionalKeys<T> = {
    [P in keyof T]: undefined extends T[P] ? never : P;
}[keyof T];
type Child<T> = {
    [P in NonOptionalKeys<T>]: T[P];
};
export interface ListWidget {
    "type": "list";
    "each": Child<ListWidget>;
}
export {};
