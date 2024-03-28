//// [tests/cases/compiler/callExpressionWithMissingTypeArgument1.ts] ////

//// [callExpressionWithMissingTypeArgument1.ts]
Foo<a,,b>();

//// [callExpressionWithMissingTypeArgument1.js]
Foo();
