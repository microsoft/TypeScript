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

var c = classification;
verify.syntacticClassificationsAre(
    c.comment(firstCommentText),
    c.keyword("function"), c.text("myFunction"), c.punctuation("("), c.comment("/* x */"), c.text("x"), c.punctuation(":"), c.keyword("any"), c.punctuation(")"), c.punctuation("{"),
    c.keyword("var"), c.text("y"), c.operator("="), c.text("x"), c.operator("?"), c.text("x"), c.operator("++"), c.operator(":"), c.operator("++"), c.text("x"), c.punctuation(";"),
    c.punctuation("}"),
    c.comment("// end of file"));