//// [tests/cases/compiler/contentMapperTransform.ts] ////

//// [package.json]
{
	"name": "mapper",
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["target", "jsx"] } }
}

//// [app.box]
const __VERSION = "1.0.0";
export const label: string = "widget";
export const version = 7;
export const flavor = undefined;

//// [main.ts]
import { label, version, flavor } from "./app.box";

export const upper: string = label;
export const twice: number = version * 2;
export const maybe: undefined = flavor;


//// [main.js]
import { label, version, flavor } from "./app.box";
export const upper = label;
export const twice = version * 2;
export const maybe = flavor;
