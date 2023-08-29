//// [tests/cases/conformance/types/mapped/mappedTypeConstraints.ts] ////

//// [mappedTypeConstraints.ts]
function f0<T extends { a: string, b: string }>(obj: Pick<T, Extract<keyof T, 'b'>>) {
    obj.b;
}

function f1<T extends { a: string, b: string }>(obj: Pick<T, Exclude<keyof T, 'a'>>) {
    obj.b;
}

function f2<T extends { a: string, b: string }, U extends { b: string, c: string }>(obj: Pick<T | U, keyof (T | U)>) {
    obj.b;
}

function f3<T extends { a: string, b: string }, U extends { b: string, c: string }>(obj: Pick<T & U, keyof (T & U)>) {
    obj.a;
    obj.b;
    obj.c;
}

function f4<T extends { a: string, b: string }>(obj: Record<Exclude<keyof T, 'b'> | 'c', string>) {
    obj.a;
    obj.c;
}

// Repro from #28821

type TargetProps = {
    foo: string,
    bar: string
};

const modifier = <T extends TargetProps>(targetProps: T) => {
    let {bar, ...rest} = targetProps;
    rest.foo;
};


//// [mappedTypeConstraints.js]
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function f0(obj) {
    obj.b;
}
function f1(obj) {
    obj.b;
}
function f2(obj) {
    obj.b;
}
function f3(obj) {
    obj.a;
    obj.b;
    obj.c;
}
function f4(obj) {
    obj.a;
    obj.c;
}
var modifier = function (targetProps) {
    var bar = targetProps.bar, rest = __rest(targetProps, ["bar"]);
    rest.foo;
};
