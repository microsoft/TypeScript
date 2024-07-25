// @lib: es2019
// @target: es2019
// @module: commonjs
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
