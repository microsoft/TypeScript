currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/lib/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": [
    "src"
  ]
}

//// [/home/src/workspaces/project/lib/src/utils.ts]
export const test = () => 'test';

//// [/home/src/workspaces/project/lib/dist/utils.d.ts]
export declare const test: () => string;

//// [/home/src/workspaces/project/app/tsconfig.json]
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler"
  },
  "references": [
    {
      "path": "../lib"
    }
  ]
}

//// [/home/src/workspaces/project/app/index.ts]

                    import TestSrc from '../lib/src/utils'; // Error
                    import TestDecl from '../lib/dist/utils'; // Error
                    console.log(TestSrc.test());
                    console.log(TestDecl.test());

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --p app --pretty false
Output::
app/index.ts(2,28): error TS1192: Module '"/home/src/workspaces/project/lib/dist/utils"' has no default export.
app/index.ts(3,28): error TS1192: Module '"/home/src/workspaces/project/lib/dist/utils"' has no default export.


//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/project/app/index.js]
import TestSrc from '../lib/src/utils'; // Error
import TestDecl from '../lib/dist/utils'; // Error
console.log(TestSrc.test());
console.log(TestDecl.test());



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
