//// [declarationEmitDestructuring4.ts]
function baz([]) { }
function baz1([] = [1,2,3]) { }
function baz2([[]] = [[1,2,3]]) { }
function baz3({}) { }
function baz4({} = { x: 10 }) { }
function baz5({} = { x: 10, y: { a: 2 }, z: [1,2] }) { }



//// [declarationEmitDestructuring4.js]
function baz(_a) {
    var ;
}
function baz1(_a) {
    var _b = _a === void 0 ? [
        1,
        2,
        3
    ] : _a;
}
function baz2(_a) {
    var _b = (_a === void 0 ? [
        [
            1,
            2,
            3
        ]
    ] : _a)[0];
}
function baz3(_a) {
    var ;
}
function baz4(_a) {
    var _b = _a === void 0 ? {
        x: 10
    } : _a;
}
function baz5(_a) {
    var _b = _a === void 0 ? {
        x: 10,
        y: {
            a: 2
        },
        z: [
            1,
            2
        ]
    } : _a;
}


//// [declarationEmitDestructuring4.d.ts]
declare function baz([]: any[]): void;
declare function baz1([]?: number[]): void;
declare function baz2([[]]?: [number[]]): void;
declare function baz3({}: {}): void;
declare function baz4({}?: {
    x: number;
}): void;
declare function baz5({}?: {
    x: number;
    y: {
        a: number;
    };
    z: number[];
}): void;
