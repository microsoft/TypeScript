//// [tests/cases/compiler/parseNoWhitespaceBeforeExclamation.ts] ////

//// [parseNoWhitespaceBeforeExclamation.ts]
declare var value: any;

value !;
value !instanceof String;
value ! instanceof String
value/* this is a comment */!instanceof String;
value/* this is a comment */! instanceof String;
value !in String;
value ! in String
value/* this is a comment */!in String;
value/* this is a comment */! in String;


//// [parseNoWhitespaceBeforeExclamation.js]
value;
value instanceof String;
value instanceof String;
value /* this is a comment */ instanceof String;
value /* this is a comment */ instanceof String;
value in String;
value in String;
value /* this is a comment */ in String;
value /* this is a comment */ in String;
