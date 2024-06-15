//// [tests/cases/compiler/mappedTypeNoTypeNoCrash.ts] ////

//// [mappedTypeNoTypeNoCrash.ts]
type T0<T> = ({[K in keyof T]}) extends ({[key in K]: T[K]}) ? number : never;

//// [mappedTypeNoTypeNoCrash.js]


//// [mappedTypeNoTypeNoCrash.d.ts]
type T0<T> = ({
    [K in keyof T]: ;
}) extends ({
    [key in K]: T[K];
}) ? number : never;
