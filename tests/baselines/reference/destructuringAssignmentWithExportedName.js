//// [destructuringAssignmentWithExportedName.ts]
export let exportedFoo: any;
let nonexportedFoo: any;

// sanity checks
exportedFoo = null;
nonexportedFoo = null;

if (null as any) {
    ({ exportedFoo, nonexportedFoo } = null as any);
}
else if (null as any) {
	({ foo: exportedFoo, bar: nonexportedFoo } = null as any);
}
else if (null as any) {
	({ foo: { bar: exportedFoo, baz: nonexportedFoo } } = null as any);
}
else if (null as any) {
	([exportedFoo, nonexportedFoo] = null as any);
}
else {
	([[exportedFoo, nonexportedFoo]] = null as any);
}

export { nonexportedFoo };
export { exportedFoo as foo, nonexportedFoo as nfoo };

//// [destructuringAssignmentWithExportedName.js]
"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfoo = exports.foo = exports.nonexportedFoo = exports.exportedFoo = void 0;
exports.foo = exports.exportedFoo;
let nonexportedFoo;
exports.nonexportedFoo = nonexportedFoo;
exports.nfoo = nonexportedFoo;
// sanity checks
exports.foo = exports.exportedFoo = null;
exports.nfoo = exports.nonexportedFoo = nonexportedFoo = null;
if (null) {
    (_a = null, exports.foo = exports.exportedFoo = _a.exportedFoo, exports.nfoo = exports.nonexportedFoo = nonexportedFoo = _a.nonexportedFoo);
}
else if (null) {
    (_b = null, exports.foo = exports.exportedFoo = _b.foo, exports.nfoo = exports.nonexportedFoo = nonexportedFoo = _b.bar);
}
else if (null) {
    (_c = null.foo, exports.foo = exports.exportedFoo = _c.bar, exports.nfoo = exports.nonexportedFoo = nonexportedFoo = _c.baz);
}
else if (null) {
    (_d = null, exports.foo = exports.exportedFoo = _d[0], exports.nfoo = exports.nonexportedFoo = nonexportedFoo = _d[1]);
}
else {
    (_e = null[0], exports.foo = exports.exportedFoo = _e[0], exports.nfoo = exports.nonexportedFoo = nonexportedFoo = _e[1]);
}
