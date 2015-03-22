//@target: es6

function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;