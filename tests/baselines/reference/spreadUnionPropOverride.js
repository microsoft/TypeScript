//// [tests/cases/compiler/spreadUnionPropOverride.ts] ////

//// [spreadUnionPropOverride.ts]
// Repro from #62655
type Thing = {
    id: string;
    label: string;
};

const things: Thing[] = [];

function find(id: string): undefined | Thing {
    return things.find(thing => thing.id === id);
}

declare function fun(thing: Thing): void;

fun({
    id: 'foo',
    ...find('foo') ?? {
        label: 'Foo',
    },
});

// Should not error when spreading a union where one type doesn't have the property
const obj1 = {
    x: 1,
    ...(Math.random() > 0.5 ? { y: 2 } : { y: 2, x: 3 }),
}; // OK - x might be overwritten

// Should error when the property is in all constituents
const obj2 = {
    x: 1,
    ...(Math.random() > 0.5 ? { x: 2, y: 3 } : { x: 4, z: 5 }),
}; // Error - x is always overwritten

// Should not error with optional property in union
type Partial1 = { a: string; b?: number };
type Partial2 = { a: string; c: boolean };
declare const partial: Partial1 | Partial2;

const obj3 = {
    b: 42,
    ...partial,
}; // OK - b is optional in Partial1 and missing in Partial2

// Should error when property is required in all types
const obj4 = {
    a: "test",
    ...partial,
}; // Error - a is required in both types

// More complex union case
type A = { id: string; name: string };
type B = { name: string; age: number };
type C = { name: string };

declare const abc: A | B | C;

const obj5 = {
    id: "123",
    ...abc,
}; // OK - id is only in A

const obj6 = {
    name: "test",
    ...abc,
}; // Error - name is in all types


//// [spreadUnionPropOverride.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
var things = [];
function find(id) {
    return things.find(function (thing) { return thing.id === id; });
}
fun(__assign({ id: 'foo' }, (_a = find('foo')) !== null && _a !== void 0 ? _a : {
    label: 'Foo',
}));
// Should not error when spreading a union where one type doesn't have the property
var obj1 = __assign({ x: 1 }, (Math.random() > 0.5 ? { y: 2 } : { y: 2, x: 3 })); // OK - x might be overwritten
// Should error when the property is in all constituents
var obj2 = __assign({ x: 1 }, (Math.random() > 0.5 ? { x: 2, y: 3 } : { x: 4, z: 5 })); // Error - x is always overwritten
var obj3 = __assign({ b: 42 }, partial); // OK - b is optional in Partial1 and missing in Partial2
// Should error when property is required in all types
var obj4 = __assign({ a: "test" }, partial); // Error - a is required in both types
var obj5 = __assign({ id: "123" }, abc); // OK - id is only in A
var obj6 = __assign({ name: "test" }, abc); // Error - name is in all types
