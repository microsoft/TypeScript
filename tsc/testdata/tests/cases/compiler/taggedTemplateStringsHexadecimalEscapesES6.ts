//@target: es6
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;