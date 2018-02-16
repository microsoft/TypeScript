//// [controlFlowObjectLiteralDeclaration.ts]
type A = {
    x?: string[]
    y?: number[]
    z?: {
        ka?: boolean
        ki?: boolean
    }
    extra?: string
}
const y = [1, 2, 3]
const wat = { extra: "life" }
let a: A = {
    x: [],
    y,
    z: {
        ka: false
    },
    ...wat
}
a.x.push('hi')
a.y.push(4)
let b = a.z.ka
b = a.z.ki // error, object is possibly undefined
a.extra.length // error, reference doesn't match 'wat', so object is possibly undefined




//// [controlFlowObjectLiteralDeclaration.js]
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var y = [1, 2, 3];
var wat = { extra: "life" };
var a = __assign({ x: [], y: y, z: {
        ka: false
    } }, wat);
a.x.push('hi');
a.y.push(4);
var b = a.z.ka;
b = a.z.ki; // error, object is possibly undefined
a.extra.length; // error, reference doesn't match 'wat', so object is possibly undefined
