/// <reference path="../fourslash.ts"/>

// @Filename: unusedVariableInClass1.ts
////class greeter {
////    [|private greeting: string;|]
////}

// @Filename: tsconfig.json
////{ "compilerOptions": {"noUnusedLocals": true, "noUnusedParameters": true}, "files": ["unusedVariableInClass1.ts"] }

verify.codeFixAtPosition("");
