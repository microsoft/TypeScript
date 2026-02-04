// @target: es2015


function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;