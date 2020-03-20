//// [declarationEmitBindingPatterns.ts]
const k = ({x: z = 'y'}) => { }

var a;
function f({} = a, [] = a, { p: {} = a} = a) {
}

//// [declarationEmitBindingPatterns.js]
var k = function (_a) {
    var _b = _a.x, z = _b === void 0 ? 'y' : _b;
};
var a;
function f(_c, _d, _e) {
    _c = a;
    _d = a;
    var _f = (_e === void 0 ? a : _e).p, _g = _f === void 0 ? a : _f;
}


//// [declarationEmitBindingPatterns.d.ts]
declare const k: ({ x: z }: {
    x?: string;
}) => void;
declare var a: any;
declare function f({}?: any, []?: any, { p: {} }?: any): void;
