//// [dynamicImportEvaluateSpecifier.ts]
// https://github.com/microsoft/TypeScript/issues/48285
let i = 0;

import(String(i++));
import(String(i++));

const getPath = async () => {
	/* in reality this would do some async FS operation, or a web request */
	return "/root/my/cool/path";
};

const someFunction = async () => {
	const result = await import(await getPath());
};


//// [dynamicImportEvaluateSpecifier.js]
var _a, _b;
// https://github.com/microsoft/TypeScript/issues/48285
let i = 0;
_a = String(i++), Promise.resolve().then(() => require(_a));
_b = String(i++), Promise.resolve().then(() => require(_b));
const getPath = async () => {
    /* in reality this would do some async FS operation, or a web request */
    return "/root/my/cool/path";
};
const someFunction = async () => {
    var _a;
    const result = await (_a = await getPath(), Promise.resolve().then(() => require(_a)));
};
