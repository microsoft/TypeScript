var [p0,p1, p2] : any = [2, 3, 4];
var [a, b, c]: [number, number, string] = [1, 2, "string"];
var [d, e]: any = undefined;
var [f = false, g = 1]: any = undefined;
g = 10;
f = true;

var [x] = []
var [[[y]], [[[[z]]]]] = [[[]], [[[[]]]]]
var [[w], m]: [[string|number], boolean] = [[1], true];
interface J extends Array<Number> {
    2: number;
}

var [, w1] = [1, 2, 3];
var [,,, w2] = [1, 2, 3, 4];
var [,,, w2] = [1, 2, 3, 4];
var [,,,...w3] = [1, 2, 3, 4, "hello"];

var [r, s, ...t] = [1, 2, "string"];
var [r1, s1, t1] = [1, 2, "string"];

