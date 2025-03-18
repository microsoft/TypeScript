//// [tests/cases/compiler/destructuringAssignmentWithExportedName.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfoo = exports.foo = exports.nonexportedFoo = exports.exportedFoo = void 0;
let nonexportedFoo;
exports.foo = exports.exportedFoo = null;
exports.nfoo = exports.nonexportedFoo = nonexportedFoo = null;
if (null) {
    ({ exportedFoo: { set value(value) { exports.foo = exports.exportedFoo = value; } }.value, nonexportedFoo: { set value(value) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value; } }.value } = null);
}
else if (null) {
    ({ foo: { set value(value) { exports.foo = exports.exportedFoo = value; } }.value, bar: { set value(value) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value; } }.value } = null);
}
else if (null) {
    ({ foo: { bar: { set value(value) { exports.foo = exports.exportedFoo = value; } }.value, baz: { set value(value) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value; } }.value } } = null);
}
else if (null) {
    ([{ set value(value) { exports.foo = exports.exportedFoo = value; } }.value, { set value(value) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value; } }.value] = null);
}
else {
    ([[{ set value(value) { exports.foo = exports.exportedFoo = value; } }.value, { set value(value) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value; } }.value]] = null);
}
