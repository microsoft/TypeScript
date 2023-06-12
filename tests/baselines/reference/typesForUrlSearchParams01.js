//// [tests/cases/compiler/typesForUrlSearchParams01.ts] ////

//// [typesForUrlSearchParams01.ts]
export const carQuery = new URLSearchParams([
    ["query", "suv"],
    ["new", true],
    ["accidents", false],
    ["miles", 42_000],
]);

carQuery.set("used", true);
carQuery.append("year", 2023);
carQuery.append("year", 2024);

let str: string | null, strs: string[];

str = carQuery.get("query");
strs = carQuery.getAll("year");

for (const [key, value] of carQuery) {
    str = key;
    str = value;
}
for (const [key, value] of carQuery.entries()) {
    str = key;
    str = value;
}
for (const value of carQuery.values()) {
    str = value;
}
carQuery.forEach((value, key) => {
    str = key;
    str = value;
});


//// [typesForUrlSearchParams01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carQuery = void 0;
exports.carQuery = new URLSearchParams([
    ["query", "suv"],
    ["new", true],
    ["accidents", false],
    ["miles", 42000],
]);
exports.carQuery.set("used", true);
exports.carQuery.append("year", 2023);
exports.carQuery.append("year", 2024);
var str, strs;
str = exports.carQuery.get("query");
strs = exports.carQuery.getAll("year");
for (var _i = 0, carQuery_1 = exports.carQuery; _i < carQuery_1.length; _i++) {
    var _a = carQuery_1[_i], key = _a[0], value = _a[1];
    str = key;
    str = value;
}
for (var _b = 0, _c = exports.carQuery.entries(); _b < _c.length; _b++) {
    var _d = _c[_b], key = _d[0], value = _d[1];
    str = key;
    str = value;
}
for (var _e = 0, _f = exports.carQuery.values(); _e < _f.length; _e++) {
    var value = _f[_e];
    str = value;
}
exports.carQuery.forEach(function (value, key) {
    str = key;
    str = value;
});
