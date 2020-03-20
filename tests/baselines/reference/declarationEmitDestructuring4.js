//// [declarationEmitDestructuring4.ts]
// For an array binding pattern with empty elements,
// we will not make any modification and will emit
// the similar binding pattern users' have written
function baz([]) { }
function baz1([] = [1,2,3]) { }
function baz2([[]] = [[1,2,3]]) { }

function baz3({}) { }
function baz4({} = { x: 10 }) { }



//// [declarationEmitDestructuring4.js]
// For an array binding pattern with empty elements,
// we will not make any modification and will emit
// the similar binding pattern users' have written
function baz(_a) { }
function baz1(_b) {
    _b = [1, 2, 3];
}
function baz2(_c) {
    var _d = (_c === void 0 ? [[1, 2, 3]] : _c)[0];
}
function baz3(_e) { }
function baz4(_f) {
    _f = { x: 10 };
}


//// [declarationEmitDestructuring4.d.ts]
declare function baz([]: any[]): void;
declare function baz1([]?: number[]): void;
declare function baz2([[]]?: [number[]]): void;
declare function baz3({}: {}): void;
declare function baz4({}?: {
    x: number;
}): void;
