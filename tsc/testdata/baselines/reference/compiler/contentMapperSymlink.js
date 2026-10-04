//// [tests/cases/compiler/contentMapperSymlink.ts] ////

//// [package.json]
{
	"name": "mapper",
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["target", "jsx"] } }
}

//// [app.box]
const __VERSION = "1.0.0";
export const version = 7;

//// [main.ts]
import { version } from "./app.box";

export const twice: number = version * 2;


//// [main.js]
import { version } from "./app.box";
export const twice = version * 2;
