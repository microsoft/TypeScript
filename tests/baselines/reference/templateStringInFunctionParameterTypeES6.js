//// [templateStringInFunctionParameterTypeES6.ts]
function f(`hello`);
function f(x: string);
function f(x: string) {
    return x;
}

//// [templateStringInFunctionParameterTypeES6.js]
`hello`;
;
function f(x) {
    return x;
}
