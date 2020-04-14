//// [partialApplicationPropertyAccess.ts]
const square = Math.pow(?, 2);

square(4) === 16;

const struct = {
    a: {
        b: 10,
    },
};

const ultraCube = Math.pow(?, struct.a.b);
ultraCube(2) == 1024;

let s: undefined | { c: number };

const useC = (s2: typeof s) =>
    Math.pow(?, s2?.c ?? 0);

useC(undefined)(5) === 1;
useC({ c: 2 })(4) === 16;


//// [partialApplicationPropertyAccess.js]
var _pow_1, y_1, _pow_2;
var square = (_pow_1 = Math.pow, function (x) { return _pow_1(x, 2); });
square(4) === 16;
var struct = {
    a: {
        b: 10
    }
};
var ultraCube = (_pow_2 = Math.pow, y_1 = struct.a.b, function (x) { return _pow_2(x, y_1); });
ultraCube(2) == 1024;
var s;
var useC = function (s2) { var _a; var y_2, _pow_3; return (_pow_3 = Math.pow, y_2 = (_a = s2 === null || s2 === void 0 ? void 0 : s2.c) !== null && _a !== void 0 ? _a : 0, function (x) { return _pow_3(x, y_2); }); };
useC(undefined)(5) === 1;
useC({ c: 2 })(4) === 16;
