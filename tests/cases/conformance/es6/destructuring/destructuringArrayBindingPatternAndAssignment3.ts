interface H {
    0: number,
    1: string
}
interface J extends Array<Number> {
    2: number;
}

function bar(): J {
    return <[number, number, number]>[1, 2, 3];
}

function gg(idx: number) {
    return {
        [idx]: true
    }
}

var [h, g, i]: H = [];
var [[[y]], [[[[z]]]]] = []
var [, , ...w4, , ] = []
var [a = "string", b, c] = bar();
var [r, s, t] = gg(1);