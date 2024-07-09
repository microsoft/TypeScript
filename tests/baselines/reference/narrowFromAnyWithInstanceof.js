//// [tests/cases/conformance/types/any/narrowFromAnyWithInstanceof.ts] ////

//// [narrowFromAnyWithInstanceof.ts]
declare var x: any;

if (x instanceof Function) { // 'any' is not narrowed when target type is 'Function'
    x();
    x(1, 2, 3);
    x("hello!");
    x.prop;
}

if (x instanceof Object) { // 'any' is not narrowed when target type is 'Object'
    x.method();
    x();
}

if (x instanceof Error) { // 'any' is narrowed to types other than 'Function'/'Object'
    x.message;
    x.mesage;
}

if (x instanceof Date) {
    x.getDate();
    x.getHuors();
}


//// [narrowFromAnyWithInstanceof.js]
if (x instanceof Function) { // 'any' is not narrowed when target type is 'Function'
    x();
    x(1, 2, 3);
    x("hello!");
    x.prop;
}
if (x instanceof Object) { // 'any' is not narrowed when target type is 'Object'
    x.method();
    x();
}
if (x instanceof Error) { // 'any' is narrowed to types other than 'Function'/'Object'
    x.message;
    x.mesage;
}
if (x instanceof Date) {
    x.getDate();
    x.getHuors();
}
