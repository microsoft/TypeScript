currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/home/src/tslibs/ts/lib/lib.d.ts]
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

//// [/src/bar.ts]


//// [/src/index.js]


//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "allowJs": true
  }
}



/home/src/tslibs/ts/lib/tsc.js --b /src/tsconfig.json -clean
Output::



exitCode:: ExitStatus.Success
