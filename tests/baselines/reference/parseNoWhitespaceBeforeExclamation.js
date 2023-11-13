//// [tests/cases/compiler/parseNoWhitespaceBeforeExclamation.ts] ////

//// [parseNoWhitespaceBeforeExclamation.ts]
declare var value: any;

value !;
value !instanceof String;
value/* this is a comment */! instanceof String;


//// [parseNoWhitespaceBeforeExclamation.js]
value;
value instanceof String;
value /* this is a comment */ instanceof String;
