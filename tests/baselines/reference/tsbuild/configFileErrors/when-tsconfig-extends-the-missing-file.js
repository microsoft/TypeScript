currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/tsconfig.first.json]
{
	"extends": "./foobar.json",
	"compilerOptions": {
		"composite": true
	}
}

//// [/src/tsconfig.json]
{
	"compilerOptions": {
		"composite": true
	},
	"references": [
		{ "path": "./tsconfig.first.json" },
		{ "path": "./tsconfig.second.json" }
	]
}

//// [/src/tsconfig.second.json]
{
	"extends": "./foobar.json",
	"compilerOptions": {
		"composite": true
	}
}



Output::
/lib/tsc --b /src/tsconfig.json
[91m● [0m [91mError[0m TS5083Cannot read file '/src/foobar.json'.

[91m● [0m [91mError[0m TS18003No inputs were found in config file '/src/tsconfig.first.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.

[91m● [0m [91mError[0m TS5083Cannot read file '/src/foobar.json'.

[91m● [0m [91mError[0m TS18003No inputs were found in config file '/src/tsconfig.second.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.


Found 4 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


