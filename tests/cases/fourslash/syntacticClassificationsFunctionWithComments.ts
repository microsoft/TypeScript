/// <reference path="fourslash.ts"/>

/////**
//// * This is my function.
//// * There are many like it, but this one is mine.
//// */
////function myFunction(/* x */ x: any) {
////    var y = x ? x++ : ++x;
////}
////// end of file

var firstCommentText =
"\
/**\n\
 * This is my function.\n\
 * There are many like it, but this one is mine.\n\
 */";

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment(firstCommentText),
    c.keyword("function"), c.identifier("myFunction"), c.punctuation("("), c.comment("/* x */"), c.parameterName("x"), c.punctuation(":"), c.keyword("any"), c.punctuation(")"), c.punctuation("{"),
    c.keyword("var"), c.identifier("y"), c.operator("="), c.identifier("x"), c.operator("?"), c.identifier("x"), c.operator("++"), c.operator(":"), c.operator("++"), c.identifier("x"), c.punctuation(";"),
    c.punctuation("}"),
    c.comment("// end of file"));

    const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("function.declaration", "myFunction"), 
    c2.semanticToken("parameter.declaration", "x"), 
    c2.semanticToken("variable.declaration.local", "y"), 
    c2.semanticToken("parameter", "x"), 
    c2.semanticToken("parameter", "x"), 
    c2.semanticToken("parameter", "x"), 
);
