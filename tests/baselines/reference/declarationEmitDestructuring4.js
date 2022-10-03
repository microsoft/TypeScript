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
function baz1(_a) {
    _a = [1, 2, 3];
}
function baz2(_a) {
    var _b = _a === void 0 ? [[1, 2, 3]] : _a, _c = _b[0];
}
function baz3(_a) { }
function baz4(_a) {
    _a = { x: 10 };
}


//// [declarationEmitDestructuring4.d.ts]
declare function baz([]: any[]): void;
declare function baz1([]?: number[]): void;
declare function baz2([[]]?: [number[]]): void;
declare function baz3({}: {}): void;
declare function baz4({}?: {
    x: number;
}): void;
