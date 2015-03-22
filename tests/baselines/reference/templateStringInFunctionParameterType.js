//// [templateStringInFunctionParameterType.ts]
function f(`hello`);
function f(x: string);
function f(x: string) {
    return x;
}

//// [templateStringInFunctionParameterType.js]
"hello";
;
function f(x) {
    return x;
}
