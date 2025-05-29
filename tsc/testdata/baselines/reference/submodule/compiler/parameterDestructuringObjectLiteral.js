//// [tests/cases/compiler/parameterDestructuringObjectLiteral.ts] ////

//// [parameterDestructuringObjectLiteral.ts]
// Repro from #22644

const fn1 = (options: { headers?: {} }) => { };
fn1({ headers: { foo: 1 } });

const fn2 = ({ headers = {} }) => { };
fn2({ headers: { foo: 1 } });


//// [parameterDestructuringObjectLiteral.js]
// Repro from #22644
const fn1 = (options) => { };
fn1({ headers: { foo: 1 } });
const fn2 = ({ headers = {} }) => { };
fn2({ headers: { foo: 1 } });


//// [parameterDestructuringObjectLiteral.d.ts]
// Repro from #22644
declare const fn1: (options: {
    headers?: {};
}) => void;
declare const fn2: ({ headers = {} }: {
    headers?: {};
}) => void;


//// [DtsFileErrors]


parameterDestructuringObjectLiteral.d.ts(5,23): error TS2371: A parameter initializer is only allowed in a function or constructor implementation.


==== parameterDestructuringObjectLiteral.d.ts (1 errors) ====
    // Repro from #22644
    declare const fn1: (options: {
        headers?: {};
    }) => void;
    declare const fn2: ({ headers = {} }: {
                          ~~~~~~~
!!! error TS2371: A parameter initializer is only allowed in a function or constructor implementation.
        headers?: {};
    }) => void;
    