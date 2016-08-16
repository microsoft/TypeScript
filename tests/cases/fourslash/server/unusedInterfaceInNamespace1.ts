/// <reference path="../fourslash.ts"/>

// @Filename: unusedInterfaceInNamespace1.ts
//// [| namespace greeter {
////    interface interface1 {
////    }
////} |]
// @Filename: tsconfig.json
////{ "compilerOptions": {"noUnusedLocals": true, "noUnusedLocals": true}, "files": ["unusedInterfaceInNamespace1.ts"] }

verify.codeFixAtPosition(`
namespace greeter {
}`);
