// @target: es2015
let ka: any;
let nested: { ki };
let other: number;
let rest: { };
let complex: { x: { ka, ki }, y: number };
({x: { ka, ...nested }, y: other, ...rest} = complex);

// should be:
let overEmit: { a: { ka: string, x: string }[], b: { z: string, ki: string, ku: string }, ke: string, ko: string };

// var _g = overEmit.a, [_h, ...y] = _g, nested2 = __rest(_h, []), _j = overEmit.b, { z } = _j, c = __rest(_j, ["z"]), rest2 = __rest(overEmit, ["a", "b"]);
var { a: [{ ...nested2 }, ...y], b: { z, ...c }, ...rest2 } = overEmit;
({ a: [{ ...nested2 }, ...y], b: { z, ...c }, ...rest2 } = overEmit);
