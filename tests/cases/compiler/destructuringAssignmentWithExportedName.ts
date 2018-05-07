// @target: es2015
// @module: commonjs
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