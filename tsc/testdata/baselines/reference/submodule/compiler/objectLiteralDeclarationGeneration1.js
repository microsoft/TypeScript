//// [tests/cases/compiler/objectLiteralDeclarationGeneration1.ts] ////

//// [objectLiteralDeclarationGeneration1.ts]
class y<T extends {}>{ }

//// [objectLiteralDeclarationGeneration1.js]
class y {
}
