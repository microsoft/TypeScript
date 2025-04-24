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
// sanity checks
exports.foo = exports.exportedFoo = null;
exports.nfoo = exports.nonexportedFoo = nonexportedFoo = null;
if (null) {
    ({ exportedFoo: { set value(value) { exports.foo = exports.exportedFoo = value; } }.value, nonexportedFoo: { set value(value_1) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value_1; } }.value } = null);
}
else if (null) {
    ({ foo: { set value(value_2) { exports.foo = exports.exportedFoo = value_2; } }.value, bar: { set value(value_3) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value_3; } }.value } = null);
}
else if (null) {
    ({ foo: { bar: { set value(value_4) { exports.foo = exports.exportedFoo = value_4; } }.value, baz: { set value(value_5) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value_5; } }.value } } = null);
}
else if (null) {
    ([{ set value(value_6) { exports.foo = exports.exportedFoo = value_6; } }.value, { set value(value_7) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value_7; } }.value] = null);
}
else {
    ([[{ set value(value_8) { exports.foo = exports.exportedFoo = value_8; } }.value, { set value(value_9) { exports.nfoo = exports.nonexportedFoo = nonexportedFoo = value_9; } }.value]] = null);
}
