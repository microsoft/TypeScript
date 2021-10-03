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
var _receiver_1, _pow_1, _receiver_2, _pow_2, y;
var square = (_receiver_1 = Math, _pow_1 = _receiver_1.pow, function pow(x) { return _pow_1.call(_receiver_1, x, 2); });
square(4) === 16;
var struct = {
    a: {
        b: 10
    }
};
var ultraCube = (_receiver_2 = Math, _pow_2 = _receiver_2.pow, y = struct.a.b, function pow(x) { return _pow_2.call(_receiver_2, x, y); });
ultraCube(2) == 1024;
var s;
var useC = function (s2) { var _a; var _receiver_3, _pow_3, y; return (_receiver_3 = Math, _pow_3 = _receiver_3.pow, y = (_a = s2 === null || s2 === void 0 ? void 0 : s2.c) !== null && _a !== void 0 ? _a : 0, function pow(x) { return _pow_3.call(_receiver_3, x, y); }); };
useC(undefined)(5) === 1;
useC({ c: 2 })(4) === 16;
