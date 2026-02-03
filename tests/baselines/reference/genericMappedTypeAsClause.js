//// [tests/cases/compiler/genericMappedTypeAsClause.ts] ////

//// [genericMappedTypeAsClause.ts]
type Model = {
    a: string;
    b: number;
};

type MappedModel<Suffix extends string> = {
    [K in keyof Model as `${K}${Suffix}`]: Model[K];
};

const foo1: MappedModel<'Foo'> = { aFoo: 'test', bFoo: 42 };
const foo2: MappedModel<'Foo'> = { bFoo: 'bar' };  // Error

function f1<T extends string>() {
    const x1: MappedModel<T> = 42;  // Error
    const x2: MappedModel<T> = 'test';  // Error
    const x3: MappedModel<T> = [1, 2, 3];  // Error
    const x4: MappedModel<T> = false;  // Error
    const x5: MappedModel<T> = { a: 'bar', b: 42 };  // Error
    const x6: MappedModel<T> = undefined;  // Error
}

// repro from #43189

type RemapRecord<K extends keyof any, V> = { [_ in never as K]: V }
interface RecordInterface2<K extends keyof any, V> extends RemapRecord<K, V> {} // should error


//// [genericMappedTypeAsClause.js]
"use strict";
var foo1 = { aFoo: 'test', bFoo: 42 };
var foo2 = { bFoo: 'bar' }; // Error
function f1() {
    var x1 = 42; // Error
    var x2 = 'test'; // Error
    var x3 = [1, 2, 3]; // Error
    var x4 = false; // Error
    var x5 = { a: 'bar', b: 42 }; // Error
    var x6 = undefined; // Error
}
