//// [tests/cases/compiler/declarationEmitScopeConsistency3.ts] ////

//// [a.ts]
export const g = (v: "outer") => {
    const f = (v: "inner") => () => null! as typeof v;
    const r = f(null!)
    return r;
}

//// [a.js]
export const g = (v) => {
    const f = (v) => () => null;
    const r = f(null);
    return r;
};


//// [a.d.ts]
export declare const g: (v: "outer") => () => "inner";
