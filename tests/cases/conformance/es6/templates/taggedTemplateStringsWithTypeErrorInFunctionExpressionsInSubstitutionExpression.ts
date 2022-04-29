

function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;