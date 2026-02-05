//// [tests/cases/compiler/parameterDestructuringObjectLiteral.ts] ////

//// [parameterDestructuringObjectLiteral.ts]
// Repro from #22644

const fn1 = (options: { headers?: {} }) => { };
fn1({ headers: { foo: 1 } });

const fn2 = ({ headers = {} }) => { };
fn2({ headers: { foo: 1 } });


//// [parameterDestructuringObjectLiteral.js]
"use strict";
// Repro from #22644
const fn1 = (options) => { };
fn1({ headers: { foo: 1 } });
const fn2 = ({ headers = {} }) => { };
fn2({ headers: { foo: 1 } });


//// [parameterDestructuringObjectLiteral.d.ts]
declare const fn1: (options: {
    headers?: {} | undefined;
}) => void;
declare const fn2: ({ headers }: {
    headers?: {} | undefined;
}) => void;
