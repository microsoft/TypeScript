Input::
//// [/user/username/projects/myproject/file1.ts]
export const c = 30;

//// [/user/username/projects/myproject/src/file2.ts]
import {c} from "file1"; export const d = 30;

//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable project compilation */
    // "tsBuildInfoFile": "./",                          /* Specify file to store incremental compilation information */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable use of source files instead of declaration files from referenced projects. */
    // "disableSolutionSearching": true,                 /* Projects */
    // "disableReferencedProjectLoad": true,             /* Disable loading referenced projects. */

    /* Language and Environment */
    "target": "es5",                                     /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    // "lib": [],                                        /* Specify library files to be included in the compilation. */
    // "jsx": "preserve",                                /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    // "experimentalDecorators": true,                   /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,                    /* Enables experimental support for emitting type metadata for decorators. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function to use when targeting 'react' JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX fragment factory function to use when targeting 'react' JSX emit with 'jsxFactory' compiler option is specified, e.g. 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify the module specifier to be used to import the 'jsx' and 'jsxs' factory functions from. eg, react */
    // "reactNamespace": "",                             /* [Deprecated] Use '--jsxFactory' instead. Specify the object invoked for createElement when targeting 'react' JSX emit */
    // "noLib": true,                                    /* Do not include the default library file (lib.d.ts). */
    // "useDefineForClassFields": true,                  /* Emit class fields with Define instead of Set. */

    /* Modules */
    "module": "amd",                                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "rootDir": "./",                                  /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "moduleResolution": "node",                       /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                                  /* Base directory to resolve non-absolute module names. */
    // "paths": {},                                      /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                                   /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                                  /* List of folders to include type definitions from. */
    // "types": [],                                      /* Type declaration files to be included in compilation. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "resolveJsonModule": true,                        /* Include modules imported with '.json' extension */
    // "noResolve": true,                                /* Do not add triple-slash references or imported modules to the list of compiled files. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow javascript files to be compiled. */
    // "checkJs": true,                                  /* Report errors in .js files. */
    // "maxNodeModuleJsDepth": 1,                        /* The maximum dependency depth to search under node_modules and load JavaScript files. */

    /* Emit */
    // "declaration": true,                              /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                           /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "emitDeclarationOnly": true,                      /* Only emit '.d.ts' declaration files. */
    // "sourceMap": true,                                /* Generates corresponding '.map' file. */
    // "outFile": "./",                                  /* Concatenate and emit output to single file. */
    // "outDir": "./",                                   /* Redirect output structure to the directory. */
    // "removeComments": true,                           /* Do not emit comments to output. */
    // "noEmit": true,                                   /* Do not emit outputs. */
    // "importHelpers": true,                            /* Import emit helpers from 'tslib'. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "sourceRoot": "",                                 /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                            /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix). */
    // "stripInternal": true,                            /* Do not emit declarations for code that has an '@internal' annotation. */
    // "noEmitHelpers": true,                            /* Do not generate custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Do not emit outputs if any errors were reported. */
    // "preserveConstEnums": true,                       /* Do not erase const enum declarations in generated code. */
    // "declarationDir": "./",                           /* Output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
    // "allowSyntheticDefaultImports": true,             /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                             /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,                         /* Do not resolve the real path of symlinks. */
    "forceConsistentCasingInFileNames": true,            /* Disallow inconsistently-cased references to the same file. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* Enable strict null checks. */
    // "strictFunctionTypes": true,                      /* Enable strict checking of function types. */
    // "strictBindCallApply": true,                      /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,             /* Enable strict checking of property initialization in classes. */
    // "strictOptionalProperties": true,                 /* Enable strict checking of optional properties. */
    // "noImplicitThis": true,                           /* Raise error on 'this' expressions with an implied 'any' type. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Parse in strict mode and emit "use strict" for each source file. */
    // "noUnusedLocals": true,                           /* Report errors on unused locals. */
    // "noUnusedParameters": true,                       /* Report errors on unused parameters. */
    // "noImplicitReturns": true,                        /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,               /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an 'override' modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Require undeclared properties from index signatures to use element accesses. */
    // "allowUnusedLabels": true,                        /* Do not report errors on unused labels. */
    // "allowUnreachableCode": true,                     /* Do not report errors on unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* [Deprecated] Use '--skipLibCheck' instead. Skip type checking of default library declaration files. */
    "skipLibCheck": true                                 /* Skip type checking of declaration files. */
  }
}



/a/lib/tsc.js -w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[[90m12:00:30 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/file1.ts","/user/username/projects/myproject/src/file2.ts"]
Program options: {"target":1,"module":2,"esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/file1.ts:
  {"fileName":"/user/username/projects/myproject/file1.ts","pollingInterval":250}
/user/username/projects/myproject/src/file2.ts:
  {"fileName":"/user/username/projects/myproject/src/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = 30;
});


//// [/user/username/projects/myproject/src/file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = 30;
});



Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/file1.ts:
  {"fileName":"/user/username/projects/myproject/file1.ts","pollingInterval":250}
/user/username/projects/myproject/src/file2.ts:
  {"fileName":"/user/username/projects/myproject/src/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Add new file

Input::
//// [/user/username/projects/myproject/src/file3.ts]
export const y = 10;


Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/file1.ts","/user/username/projects/myproject/src/file2.ts","/user/username/projects/myproject/src/file3.ts"]
Program options: {"target":1,"module":2,"esModuleInterop":true,"forceConsistentCasingInFileNames":true,"strict":true,"skipLibCheck":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/file1.ts
/user/username/projects/myproject/src/file2.ts
/user/username/projects/myproject/src/file3.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file3.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/file1.ts:
  {"fileName":"/user/username/projects/myproject/file1.ts","pollingInterval":250}
/user/username/projects/myproject/src/file2.ts:
  {"fileName":"/user/username/projects/myproject/src/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/file3.ts:
  {"fileName":"/user/username/projects/myproject/src/file3.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/file3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 10;
});



Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/file1.ts:
  {"fileName":"/user/username/projects/myproject/file1.ts","pollingInterval":250}
/user/username/projects/myproject/src/file2.ts:
  {"fileName":"/user/username/projects/myproject/src/file2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/file3.ts:
  {"fileName":"/user/username/projects/myproject/src/file3.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

