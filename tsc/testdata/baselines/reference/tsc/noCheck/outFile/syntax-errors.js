
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::--noCheck --outFile built
//// [/home/src/workspaces/project/a.ts] new file
export const a = "hello
//// [/home/src/workspaces/project/b.ts] new file
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] new file
{
	"compilerOptions": {
		"declaration": true,
	}
}

ExitStatus:: 2

CompilerOptions::{
    "allowJs": null,
    "allowArbitraryExtensions": null,
    "allowSyntheticDefaultImports": null,
    "allowImportingTsExtensions": null,
    "allowNonTsExtensions": null,
    "allowUmdGlobalAccess": null,
    "allowUnreachableCode": null,
    "allowUnusedLabels": null,
    "assumeChangesOnlyAffectDirectDependencies": null,
    "alwaysStrict": null,
    "baseUrl": "",
    "build": null,
    "checkJs": null,
    "customConditions": null,
    "composite": null,
    "emitDeclarationOnly": null,
    "emitBOM": null,
    "emitDecoratorMetadata": null,
    "downlevelIteration": null,
    "declaration": null,
    "declarationDir": "",
    "declarationMap": null,
    "disableSizeLimit": null,
    "disableSourceOfProjectReferenceRedirect": null,
    "disableSolutionSearching": null,
    "disableReferencedProjectLoad": null,
    "esModuleInterop": null,
    "exactOptionalPropertyTypes": null,
    "experimentalDecorators": null,
    "forceConsistentCasingInFileNames": null,
    "isolatedModules": null,
    "isolatedDeclarations": null,
    "ignoreDeprecations": "",
    "importHelpers": null,
    "inlineSourceMap": null,
    "inlineSources": null,
    "init": null,
    "incremental": null,
    "jsx": 0,
    "jsxFactory": "",
    "jsxFragmentFactory": "",
    "jsxImportSource": "",
    "keyofStringsOnly": null,
    "lib": null,
    "locale": "",
    "mapRoot": "",
    "module": 0,
    "moduleResolution": 0,
    "moduleSuffixes": null,
    "moduleDetectionKind": 0,
    "newLine": 0,
    "noEmit": null,
    "noCheck": true,
    "noErrorTruncation": null,
    "noFallthroughCasesInSwitch": null,
    "noImplicitAny": null,
    "noImplicitThis": null,
    "noImplicitReturns": null,
    "noEmitHelpers": null,
    "noLib": null,
    "noPropertyAccessFromIndexSignature": null,
    "noUncheckedIndexedAccess": null,
    "noEmitOnError": null,
    "noUnusedLocals": null,
    "noUnusedParameters": null,
    "noResolve": null,
    "noImplicitOverride": null,
    "noUncheckedSideEffectImports": null,
    "out": "",
    "outDir": "",
    "outFile": "/home/src/workspaces/project/built",
    "paths": null,
    "preserveConstEnums": null,
    "preserveSymlinks": null,
    "project": "",
    "resolveJsonModule": null,
    "resolvePackageJsonExports": null,
    "resolvePackageJsonImports": null,
    "removeComments": null,
    "rewriteRelativeImportExtensions": null,
    "reactNamespace": "",
    "rootDir": "",
    "rootDirs": null,
    "skipLibCheck": null,
    "strict": null,
    "strictBindCallApply": null,
    "strictBuiltinIteratorReturn": null,
    "strictFunctionTypes": null,
    "strictNullChecks": null,
    "strictPropertyInitialization": null,
    "stripInternal": null,
    "skipDefaultLibCheck": null,
    "sourceMap": null,
    "sourceRoot": "",
    "suppressOutputPathCheck": null,
    "target": 0,
    "traceResolution": null,
    "tsBuildInfoFile": "",
    "typeRoots": null,
    "types": null,
    "useDefineForClassFields": null,
    "useUnknownInCatchVariables": null,
    "verbatimModuleSyntax": null,
    "maxNodeModuleJsDepth": null,
    "configFilePath": "",
    "noDtsResolution": null,
    "pathsBasePath": "",
    "diagnostics": null,
    "extendedDiagnostics": null,
    "generateCpuProfile": "",
    "generateTrace": "",
    "listEmittedFiles": null,
    "listFiles": null,
    "explainFiles": null,
    "listFilesOnly": null,
    "noEmitForJsFiles": null,
    "preserveWatchOutput": null,
    "pretty": null,
    "version": null,
    "watch": null,
    "showConfig": null,
    "tscBuild": null
}
Output::
a.ts(1,24): error TS1002: Unterminated string literal.


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.js] new file
export const a = "hello;

//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/b.js] new file
export const b = 10;

//// [/home/src/workspaces/project/b.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change

