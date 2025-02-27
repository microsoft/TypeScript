
currentDirectory::/home/src/projects/myproject
useCaseSensitiveFileNames::true
Input::--showConfig
//// [/home/src/projects/myproject/main.ts] new file

	// some comment
	export const y = 10;
	import { x } from "@myscope/sometype";

//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] new file

	export const k = 10;

//// [/home/src/projects/myproject/src/secondary.ts] new file

	// some comment
	export const z = 10;
	import { k } from "other/sometype2";

//// [/home/src/projects/myproject/tsconfig.json] new file
{
	"extends": "../configs/first/tsconfig.json",
	"compilerOptions": {
		"declaration": true,
		"outDir": "outDir",
		"traceResolution": true,
	},
}
//// [/home/src/projects/myproject/types/sometype.ts] new file

	export const x = 10;


ExitStatus:: 5

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
    "noCheck": null,
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
    "outFile": "",
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
    "showConfig": true,
    "tscBuild": null
}
Output::
No output
//// [/home/src/projects/myproject/main.ts] no change
//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] no change
//// [/home/src/projects/myproject/src/secondary.ts] no change
//// [/home/src/projects/myproject/tsconfig.json] no change
//// [/home/src/projects/myproject/types/sometype.ts] no change

