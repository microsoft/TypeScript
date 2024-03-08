//// [tests/cases/conformance/parser/ecmascript5/Expressions/parserMemberAccessAfterPostfixExpression1.ts] ////

//// [parserMemberAccessAfterPostfixExpression1.ts]
a--.toString()

//// [parserMemberAccessAfterPostfixExpression1.js]
a--;
toString();
