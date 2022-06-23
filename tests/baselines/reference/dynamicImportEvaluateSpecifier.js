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
// https://github.com/microsoft/TypeScript/issues/48285
let i = 0;
Promise.resolve(String(i++)).then(c => require(c));
Promise.resolve(String(i++)).then(c => require(c));
const getPath = async () => {
    /* in reality this would do some async FS operation, or a web request */
    return "/root/my/cool/path";
};
const someFunction = async () => {
    const result = await Promise.resolve(await getPath()).then(c => require(c));
};
