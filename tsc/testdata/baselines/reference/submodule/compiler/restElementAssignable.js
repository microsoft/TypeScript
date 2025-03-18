//// [tests/cases/compiler/restElementAssignable.ts] ////

//// [restElementAssignable.ts]
{
    const { ...props } = {};
    // Use to fail
    const t1: { [x: symbol]: unknown } = props;
    // Working equivalent
    const t2: { [x: symbol]: unknown } = {};
}

{
    const { ...props } = { a: 1, b: false, c: "str" };
    // Use to fail
    const t1: { [x: string]: number | boolean | string } = props;
    // Working equivalent
    const t2: { [x: string]: number | boolean | string } = { a: 1, b: false, c: "str" };;
}


//// [restElementAssignable.js]
{
    const { ...props } = {};
    const t1 = props;
    const t2 = {};
}
{
    const { ...props } = { a: 1, b: false, c: "str" };
    const t1 = props;
    const t2 = { a: 1, b: false, c: "str" };
    ;
}
