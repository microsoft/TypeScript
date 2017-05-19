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
function f(_a, _b, _c) {
    _a = a;
    _b = a;
    var _d = (_c === void 0 ? a : _c).p, _e = _d === void 0 ? a : _d;
}


//// [declarationEmitBindingPatterns.d.ts]
declare const k: ({x: z}: {
    x?: string;
}) => void;
declare var a: any;
declare function f({}?: any, []?: any, {p: {}}?: any): void;
