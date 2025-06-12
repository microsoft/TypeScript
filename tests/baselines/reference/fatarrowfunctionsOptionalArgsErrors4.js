//// [tests/cases/compiler/fatarrowfunctionsOptionalArgsErrors4.ts] ////

//// [fatarrowfunctionsOptionalArgsErrors4.ts]
    false ? (arg?: number = 0) => 47 : null;
    false ? ((arg?: number = 0) => 57) : null;
    false ? null : (arg?: number = 0) => 67;
    ((arg?:number = 1) => 0) + '' + ((arg?:number = 2) => 106);

    foo(
        (a) => 110, 
        ((a) => 111), 
        (a) => {
            return 112;
        },
        (a? ) => 113, 
        (a, b? ) => 114, 
        (a: number) => 115, 
        (a: number = 0) => 116, 
        (a = 0) => 117, 
        (a?: number = 0) => 118, 
        (...a: number[]) => 119, 
        (a, b? = 0, ...c: number[]) => 120,
        (a) => (b) => (c) => 121,
        false? (a) => 0 : (b) => 122
    );

//// [fatarrowfunctionsOptionalArgsErrors4.js]
false ? (arg = 0) => 47 : null;
false ? ((arg = 0) => 57) : null;
false ? null : (arg = 0) => 67;
((arg = 1) => 0) + '' + ((arg = 2) => 106);
foo((a) => 110, ((a) => 111), (a) => {
    return 112;
}, (a) => 113, (a, b) => 114, (a) => 115, (a = 0) => 116, (a = 0) => 117, (a = 0) => 118, (...a) => 119, (a, b = 0, ...c) => 120, (a) => (b) => (c) => 121, false ? (a) => 0 : (b) => 122);
