//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/specializedSignatureWithOptional.ts] ////

//// [specializedSignatureWithOptional.ts]
declare function f(x?: "hi"): void;
declare function f(x?: string): void;

//// [specializedSignatureWithOptional.js]
