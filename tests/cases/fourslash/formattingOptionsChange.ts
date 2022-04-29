///<reference path="fourslash.ts"/>

/////*insertSpaceAfterCommaDelimiter*/[1,2,   3];[ 72  ,    ];
/////*insertSpaceAfterSemicolonInForStatements*/for (i = 0;i;    i++);
/////*insertSpaceBeforeAndAfterBinaryOperators*/1+2-    3
/////*insertSpaceAfterKeywordsInControlFlowStatements*/if     (true) { }
/////*insertSpaceAfterFunctionKeywordForAnonymousFunctions*/(function               () { })
/////*insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis*/(1  )
/////*insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets*/[1  ]; [ ]; []; [,];
/////*insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces*/`${1}`;`${   1  }`
/////*insertSpaceAfterTypeAssertion*/const bar = <Bar>    Thing.getFoo();
/////*insertSpaceBeforeTypeAnnotation*/const bar   :   number = 1;
/////*placeOpenBraceOnNewLineForFunctions*/class   foo   { 
////}
/////*placeOpenBraceOnNewLineForControlBlocks*/if (true)   {
////}
/////*insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces*/{          var t = 1}; var  {a,b  }    = {   a: 'sw',  b:'r'   };function f(  {  a, b}) { }
/////*insertSpaceAfterOpeningAndBeforeClosingEmptyBraces*/constructor() {        }

const defaultFormatOption = format.copyFormatOptions();

runTest("insertSpaceAfterCommaDelimiter", "[1, 2, 3];[72,];", "[1,2,3];[72,];");
runTest("insertSpaceAfterSemicolonInForStatements", "for (i = 0; i; i++);", "for (i = 0;i;i++);");
runTest("insertSpaceBeforeAndAfterBinaryOperators", "1 + 2 - 3", "1+2-3");
runTest("insertSpaceAfterKeywordsInControlFlowStatements", "if (true) { }", "if(true) { }");
runTest("insertSpaceAfterFunctionKeywordForAnonymousFunctions", "(function () { })", "(function() { })");
runTest("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis", "    ( 1 )", "    (1)");
runTest("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets", "[ 1 ];[];[];[ , ];", "[1];[];[];[,];");
runTest("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces", "`${ 1 }`; `${ 1 }`", "`${1}`; `${1}`");
runTest("insertSpaceAfterTypeAssertion", "const bar = <Bar> Thing.getFoo();", "const bar = <Bar>Thing.getFoo();");
runTest("insertSpaceBeforeTypeAnnotation", "const bar : number = 1;", "const bar: number = 1;");
runTest("placeOpenBraceOnNewLineForFunctions", "class foo", "class foo {");
runTest("placeOpenBraceOnNewLineForControlBlocks", "if (true)", "if (true) {");
runTest("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces", "{ var t = 1 }; var { a, b } = { a: 'sw', b: 'r' }; function f({ a, b }) { }", "{var t = 1}; var {a, b} = {a: 'sw', b: 'r'}; function f({a, b}) {}");
runTest("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces", "constructor() { }", "constructor() {}");

function runTest(propertyName: string, expectedStringWhenTrue: string, expectedStringWhenFalse: string) {
    // Go to the correct file
    goTo.marker(propertyName);

    // Set the option to false first
    format.setOption(propertyName, false);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenFalse);

    // Set the option to true
    format.setOption(propertyName, true);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenTrue);

    format.setOption(propertyName, defaultFormatOption[propertyName])
}