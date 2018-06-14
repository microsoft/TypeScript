/// <reference path='fourslash.ts' />

/////// This is simple /// comments
////function simple() {
////}
////
////sim/*1q*/ple( /*1*/);
////
/////// multiLine /// Comments
/////// This is example of multiline /// comments
/////// Another multiLine
////function multiLine() {
////}
////mul/*2q*/tiLine( /*2*/);
////
/////** this is eg of single line jsdoc style comment */
////function jsDocSingleLine() {
////}
////jsDoc/*3q*/SingleLine(/*3*/);
////
////
/////** this is multiple line jsdoc stule comment
////*New line1
////*New Line2*/
////function jsDocMultiLine() {
////}
////jsDocM/*4q*/ultiLine(/*4*/);
////
/////** this is multiple line jsdoc stule comment
////*New line1
////*New Line2*/
/////** Shoul mege this line as well
////* and this too*/ /** Another this one too*/
////function jsDocMultiLineMerge() {
////}
////jsDocMu/*5q*/ltiLineMerge(/*5*/);
////
////
/////// Triple slash comment
/////** jsdoc comment */
////function jsDocMixedComments1() {
////}
////jsDocMix/*6q*/edComments1(/*6*/);
////
/////// Triple slash comment
/////** jsdoc comment */ /** another jsDocComment*/
////function jsDocMixedComments2() {
////}
////jsDocMi/*7q*/xedComments2(/*7*/);
////
/////** jsdoc comment */ /*** triplestar jsDocComment*/
/////// Triple slash comment
////function jsDocMixedComments3() {
////}
////jsDocMixe/*8q*/dComments3(/*8*/);
////
/////** jsdoc comment */ /** another jsDocComment*/
/////// Triple slash comment
/////// Triple slash comment 2
////function jsDocMixedComments4() {
////}
////jsDocMixed/*9q*/Comments4(/*9*/);
////
/////// Triple slash comment 1
/////** jsdoc comment */ /** another jsDocComment*/
/////// Triple slash comment
/////// Triple slash comment 2
////function jsDocMixedComments5() {
////}
////jsDocM/*10q*/ixedComments5(/*10*/);
////
/////** another jsDocComment*/
/////// Triple slash comment 1
/////// Triple slash comment
/////// Triple slash comment 2
/////** jsdoc comment */
////function jsDocMixedComments6() {
////}
////jsDocMix/*11q*/edComments6(/*11*/);
////
////// This shoulnot be help comment
////function noHelpComment1() {
////}
////noHel/*12q*/pComment1(/*12*/);
////
/////* This shoulnot be help comment */
////function noHelpComment2() {
////}
////noHelpC/*13q*/omment2(/*13*/);
////
////function noHelpComment3() {
////}
////noHelpC/*14q*/omment3(/*14*/);
/////** Adds two integers and returns the result
////  * @param {number} a first number
////  * @param b second number
////  */
////function sum(/*16aq*/a: number, /*17aq*/b: number) {
////    return /*18*/a + b;
////}
/////*15*/s/*16q*/um(/*16*/10, /*17*/20);
/////** This is multiplication function*/
/////** @param */
/////** @param a first number*/
/////** @param b */
/////** @param c {
//// @param d @anotherTag*/
/////** @param e LastParam @anotherTag*/
////function multiply(/*19aq*/a: number, /*20aq*/b: number, /*21aq*/c?: number, /*22aq*/d?, /*23aq*/e?) {
////}
////mult/*19q*/iply(/*19*/10,/*20*/ 20,/*21*/ 30, /*22*/40, /*23*/50);
/////** fn f1 with number
////* @param { string} b about b
////*/
////function f1(/*25aq*/a: number);
////function f1(/*26aq*/b: string);
/////**@param opt optional parameter*/
////function f1(aOrb, opt?) {
////    return /*24*/aOrb;
////}
////f/*25q*/1(/*25*/10);
////f/*26q*/1(/*26*/"hello");
/////*27*/
/////** This is subtract function
////@param { a
////*@param { number | } b this is about b
////@param { { () => string; } } c this is optional param c
////@param { { () => string; } d this is optional param d
////@param { { () => string; } } e this is optional param e
////@param { { { () => string; } } f this is optional param f
////*/
////function subtract(/*28aq*/a: number, /*29aq*/b: number, /*30aq*/c?: () => string, /*31aq*/d?: () => string, /*32aq*/e?: () => string, /*33aq*/f?: () => string) {
////}
////subt/*28q*/ract(/*28*/10, /*29*/ 20, /*30*/ null, /*31*/ null, /*32*/ null, /*33*/null);
/////** this is square function
////@paramTag { number } a this is input number of paramTag
////@param { number } a this is input number
////@returnType { number } it is return type
////*/
////function square(/*34aq*/a: number) {
////    return a * a;
////}
////squ/*34q*/are(/*34*/10);
/////** this is divide function
////@param { number} a this is a
////@paramTag { number } g this is optional param g
////@param { number} b this is b
////*/
////function divide(/*35aq*/a: number, /*36aq*/b: number) {
////}
////div/*35q*/ide(/*35*/10, /*36*/20);
/////**
////Function returns string concat of foo and bar
////@param			{string}		foo		is string
////@param		    {string}		bar		is second string
////*/
////function fooBar(/*37aq*/foo: string, /*38aq*/bar: string) {
////    return foo + bar;
////}
////fo/*37q*/oBar(/*37*/"foo",/*38*/"bar");
/////** This is a comment */
////var x;
/////**
////  * This is a comment
////  */
////var y;
/////** this is jsdoc style function with param tag as well as inline parameter help
////*@param a it is first parameter
////*@param c it is third parameter
////*/
////function jsDocParamTest(/** this is inline comment for a *//*40aq*/a: number, /** this is inline comment for b*/ /*41aq*/b: number, /*42aq*/c: number, /*43aq*/d: number) {
////    return /*39*/a + b + c + d;
////}
/////*44*/jsD/*40q*/ocParamTest(/*40*/30, /*41*/40, /*42*/50, /*43*/60);
/////** This is function comment
////  * And properly aligned comment
////  */
////function jsDocCommentAlignmentTest1() {
////}
////jsDocCom/*45q*/mentAlignmentTest1(/*45*/);
/////** This is function comment
////  *     And aligned with 4 space char margin
////  */
////function jsDocCommentAlignmentTest2() {
////}
////jsDocComme/*46q*/ntAlignmentTest2(/*46*/);
/////** This is function comment
////  *     And aligned with 4 space char margin
////  * @param {string} a this is info about a
////  *                   spanning on two lines and aligned perfectly
////  * @param b          this is info about b
////  *                   spanning on two lines and aligned perfectly
////  *                   spanning one more line alined perfectly
////  *                       spanning another line with more margin
////  * @param c          this is info about b
////  *  not aligned text about parameter will eat only one space
////  */
////function jsDocCommentAlignmentTest3(/*47aq*/a: string, /*48aq*/b, /*49aq*/c) {
////}
////jsDocComme/*47q*/ntAlignmentTest3(/*47*/"hello",/*48*/1, /*49*/2);
/////**/
////class NoQuic/*50*/kInfoClass {
////}

verify.signatureHelp({ marker: "1", docComment: "" });
verify.quickInfoAt("1q", "function simple(): void");

verify.signatureHelp({ marker: "2", docComment: "" });
verify.quickInfoAt("2q", "function multiLine(): void");

verify.signatureHelp({ marker: "3", docComment: "this is eg of single line jsdoc style comment " });
verify.quickInfoAt("3q", "function jsDocSingleLine(): void", "this is eg of single line jsdoc style comment ");

verify.signatureHelp({ marker: "4", docComment: "this is multiple line jsdoc stule comment\nNew line1\nNew Line2" });
verify.quickInfoAt("4q", "function jsDocMultiLine(): void", "this is multiple line jsdoc stule comment\nNew line1\nNew Line2");

verify.signatureHelp({ marker: "5", docComment: "this is multiple line jsdoc stule comment\nNew line1\nNew Line2\nShoul mege this line as well\nand this too\nAnother this one too" });
verify.quickInfoAt("5q", "function jsDocMultiLineMerge(): void", "this is multiple line jsdoc stule comment\nNew line1\nNew Line2\nShoul mege this line as well\nand this too\nAnother this one too");

verify.signatureHelp({ marker: "6", docComment: "jsdoc comment " });
verify.quickInfoAt("6q", "function jsDocMixedComments1(): void", "jsdoc comment ");

verify.signatureHelp({ marker: "7", docComment: "jsdoc comment \nanother jsDocComment" });
verify.quickInfoAt("7q", "function jsDocMixedComments2(): void", "jsdoc comment \nanother jsDocComment");

verify.signatureHelp({ marker: "8", docComment: "jsdoc comment \n* triplestar jsDocComment" });
verify.quickInfoAt("8q", "function jsDocMixedComments3(): void", "jsdoc comment \n* triplestar jsDocComment");

verify.signatureHelp({ marker: "9", docComment: "jsdoc comment \nanother jsDocComment" });
verify.quickInfoAt("9q", "function jsDocMixedComments4(): void", "jsdoc comment \nanother jsDocComment");

verify.signatureHelp({ marker: "10", docComment: "jsdoc comment \nanother jsDocComment" });
verify.quickInfoAt("10q", "function jsDocMixedComments5(): void", "jsdoc comment \nanother jsDocComment");

verify.signatureHelp({ marker: "11", docComment: "another jsDocComment\njsdoc comment " });
verify.quickInfoAt("11q", "function jsDocMixedComments6(): void", "another jsDocComment\njsdoc comment ");

verify.signatureHelp({ marker: "12", docComment: "" });
verify.quickInfoAt("12q", "function noHelpComment1(): void");

verify.signatureHelp({ marker: "13", docComment: "" });
verify.quickInfoAt("13q", "function noHelpComment2(): void");

verify.signatureHelp({ marker: "14", docComment: "" });
verify.quickInfoAt("14q", "function noHelpComment3(): void");

goTo.marker('15');
verify.completionListContains("sum", "function sum(a: number, b: number): number", "Adds two integers and returns the result");

const addTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "a first number" },
    { name: "param", text: "b second number" },
];
verify.signatureHelp({
    marker: "16",
    docComment: "Adds two integers and returns the result",
    parameterDocComment: "first number",
    tags: addTags,
});
verify.quickInfos({
    "16q": ["function sum(a: number, b: number): number", "Adds two integers and returns the result"],
    "16aq": ["(parameter) a: number", "first number"]
});

verify.signatureHelp({
    marker: "17",
    docComment: "Adds two integers and returns the result",
    parameterDocComment: "second number",
    tags: addTags,
});
verify.quickInfoAt("17aq", "(parameter) b: number", "second number");

goTo.marker('18');
verify.quickInfoIs("(parameter) a: number", "first number");
verify.completionListContains("a", "(parameter) a: number", "first number");
verify.completionListContains("b", "(parameter) b: number", "second number");

const multiplyTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "" },
    { name: "param", text: "a first number" },
    { name: "param", text: "b" },
    { name: "param", text: "c" },
    { name: "param", text: "d" },
    { name: "anotherTag", text: undefined },
    { name: "param", text: "e LastParam " },
    { name: "anotherTag", text: undefined },
];
verify.signatureHelp({ marker: "19", docComment: "This is multiplication function", parameterDocComment: "first number", tags: multiplyTags });
verify.quickInfos({
    "19q": [
        "function multiply(a: number, b: number, c?: number, d?: any, e?: any): void",
        "This is multiplication function"
    ],
    "19aq": ["(parameter) a: number", "first number"]
});

verify.signatureHelp({ marker: "20", docComment: "This is multiplication function", tags: multiplyTags });
verify.quickInfoAt("20aq", "(parameter) b: number");

verify.signatureHelp({ marker: "21", docComment: "This is multiplication function", tags: multiplyTags });
verify.quickInfoAt("21aq", "(parameter) c: number");

verify.signatureHelp({ marker: "22", docComment: "This is multiplication function", tags: multiplyTags });
verify.quickInfoAt("22aq", "(parameter) d: any");

verify.signatureHelp({ marker: "23", docComment: "This is multiplication function", parameterDocComment: "LastParam ", tags: multiplyTags });
verify.quickInfoAt("23aq", "(parameter) e: any", "LastParam ");

goTo.marker('24');
verify.completionListContains("aOrb", "(parameter) aOrb: any", "");
verify.completionListContains("opt", "(parameter) opt: any", "optional parameter");

verify.signatureHelp({
    marker: "25",
    overloadsCount: 2,
    docComment: "fn f1 with number",
    tags: [{ name: "param", text: "b about b" }],
});
verify.quickInfos({
    "25q": ["function f1(a: number): any (+1 overload)", "fn f1 with number"],
    "25aq": "(parameter) a: number"
});

verify.signatureHelp({ marker: "26", overloadsCount: 2, docComment: "" });
verify.quickInfos({
    "26q": "function f1(b: string): any (+1 overload)",
    "26aq": "(parameter) b: string"
});

goTo.marker('27');
verify.completionListContains("multiply", "function multiply(a: number, b: number, c?: number, d?: any, e?: any): void", "This is multiplication function");
verify.completionListContains("f1", "function f1(a: number): any (+1 overload)", "fn f1 with number");

const subtractDoc = "This is subtract function";
const subtractTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "" },
    { name: "param", text: "b this is about b" },
    { name: "param", text: "c this is optional param c" },
    { name: "param", text: "d this is optional param d" },
    { name: "param", text: "e this is optional param e" },
    { name: "param", text: " { () => string; } } f this is optional param f" },
];
verify.signatureHelp({ marker: "28", docComment: subtractDoc, tags: subtractTags });
verify.quickInfos({
    "28q": [
        "function subtract(a: number, b: number, c?: () => string, d?: () => string, e?: () => string, f?: () => string): void",
        subtractDoc,
    ],
    "28aq": "(parameter) a: number"
});

verify.signatureHelp({ marker: "29", docComment: subtractDoc, tags: subtractTags, parameterDocComment: "this is about b" });
verify.quickInfoAt("29aq", "(parameter) b: number", "this is about b");

verify.signatureHelp({ marker: "30", docComment: subtractDoc, tags: subtractTags, parameterDocComment: "this is optional param c" });
verify.quickInfoAt("30aq", "(parameter) c: () => string", "this is optional param c");

verify.signatureHelp({ marker: "31", docComment: subtractDoc, tags: subtractTags, parameterDocComment: "this is optional param d" });
verify.quickInfoAt("31aq", "(parameter) d: () => string", "this is optional param d");

verify.signatureHelp({ marker: "32", docComment: subtractDoc, tags: subtractTags, parameterDocComment: "this is optional param e" });
verify.quickInfoAt("32aq", "(parameter) e: () => string", "this is optional param e");

verify.signatureHelp({ marker: "33", docComment: subtractDoc, tags: subtractTags });
verify.quickInfoAt("33aq", "(parameter) f: () => string");

verify.signatureHelp({
    marker: "34",
    docComment: "this is square function",
    parameterDocComment: "this is input number",
    tags: [
        { name: "paramTag", text: "{ number } a this is input number of paramTag" },
        { name: "param", text: "a this is input number" },
        { name: "returnType", text: "{ number } it is return type" },
    ],
});
verify.quickInfos({
    "34q": [
        "function square(a: number): number",
        "this is square function"
    ],
    "34aq": [
        "(parameter) a: number",
        "this is input number"
    ]
});

const divideTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "a this is a" },
    { name: "paramTag", text: "{ number } g this is optional param g" },
    { name: "param", text: "b this is b" },
];
verify.signatureHelp({ marker: "35", docComment: "this is divide function", parameterDocComment: "this is a", tags: divideTags });
verify.quickInfos({
    "35q": [
        "function divide(a: number, b: number): void",
        "this is divide function"
    ],
    "35aq": [
        "(parameter) a: number",
        "this is a"
    ]
});

verify.signatureHelp({ marker: "36", docComment: "this is divide function", parameterDocComment: "this is b", tags: divideTags });
verify.quickInfoAt("36aq", "(parameter) b: number", "this is b");

const concatDoc = "Function returns string concat of foo and bar";
const concatTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "foo is string" },
    { name: "param", text: "bar is second string" },
];
verify.signatureHelp({ marker: "37", docComment: concatDoc, parameterDocComment: "is string", tags: concatTags });
verify.quickInfos({
    "37q": ["function fooBar(foo: string, bar: string): string", concatDoc],
    "37aq": ["(parameter) foo: string", "is string"]
});

verify.signatureHelp({ marker: "38", docComment: concatDoc, parameterDocComment: "is second string", tags: concatTags });
verify.quickInfoAt("38aq", "(parameter) bar: string", "is second string");

goTo.marker('39');
verify.completionListContains("a", "(parameter) a: number", "it is first parameter\nthis is inline comment for a ");
verify.completionListContains("b", "(parameter) b: number", "this is inline comment for b");
verify.completionListContains("c", "(parameter) c: number", "it is third parameter");
verify.completionListContains("d", "(parameter) d: number", "");

const jsdocTestDocComment = "this is jsdoc style function with param tag as well as inline parameter help";
const jsdocTestTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "a it is first parameter" },
    { name: "param", text: "c it is third parameter" },
];
verify.signatureHelp({ marker: "40", docComment: jsdocTestDocComment, parameterDocComment: "it is first parameter\nthis is inline comment for a ", tags: jsdocTestTags });
verify.quickInfos({
    "40q": [
        "function jsDocParamTest(a: number, b: number, c: number, d: number): number",
        jsdocTestDocComment
    ],
    "40aq": [
        "(parameter) a: number",
        "it is first parameter\nthis is inline comment for a "
    ]
});

verify.signatureHelp({ marker: "41", docComment: jsdocTestDocComment, parameterDocComment: "this is inline comment for b", tags: jsdocTestTags });
verify.quickInfoAt("41aq", "(parameter) b: number", "this is inline comment for b");

verify.signatureHelp({ marker: "42", docComment: jsdocTestDocComment, parameterDocComment: "it is third parameter", tags: jsdocTestTags });
verify.quickInfoAt("42aq", "(parameter) c: number", "it is third parameter");

verify.signatureHelp({ marker: "43", docComment: jsdocTestDocComment, tags: jsdocTestTags });
verify.quickInfoAt("43aq", "(parameter) d: number");

goTo.marker('44');
verify.completionListContains("jsDocParamTest", "function jsDocParamTest(a: number, b: number, c: number, d: number): number", jsdocTestDocComment);
verify.completionListContains("x", "var x: any", "This is a comment ");
verify.completionListContains("y", "var y: any", "This is a comment");

verify.signatureHelp({ marker: "45", docComment: "This is function comment\nAnd properly aligned comment" });
verify.quickInfoAt("45q", "function jsDocCommentAlignmentTest1(): void", "This is function comment\nAnd properly aligned comment");

const alignmentDocComment = "This is function comment\n    And aligned with 4 space char margin";
verify.signatureHelp({ marker: "46", docComment: alignmentDocComment });
verify.quickInfoAt("46q", "function jsDocCommentAlignmentTest2(): void", alignmentDocComment);

const alignmentTags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "a this is info about a\nspanning on two lines and aligned perfectly" },
    { name: "param", text: "b this is info about b\nspanning on two lines and aligned perfectly\nspanning one more line alined perfectly\n    spanning another line with more margin" },
    { name: "param", text: "c this is info about b\nnot aligned text about parameter will eat only one space" },
];
verify.signatureHelp({
    marker: "47",
    docComment: alignmentDocComment,
    parameterDocComment: "this is info about a\nspanning on two lines and aligned perfectly",
    tags: alignmentTags,
});
verify.quickInfos({
    "47q": [
        "function jsDocCommentAlignmentTest3(a: string, b: any, c: any): void",
        alignmentDocComment
    ],
    "47aq": [
        "(parameter) a: string",
        "this is info about a\nspanning on two lines and aligned perfectly"
    ]
});

verify.signatureHelp({
    marker: "48",
    docComment: alignmentDocComment,
    parameterDocComment: "this is info about b\nspanning on two lines and aligned perfectly\nspanning one more line alined perfectly\n    spanning another line with more margin",
    tags: alignmentTags,
});
verify.quickInfoAt("48aq", "(parameter) b: any", "this is info about b\nspanning on two lines and aligned perfectly\nspanning one more line alined perfectly\n    spanning another line with more margin");

verify.signatureHelp({
    marker: "49",
    docComment: alignmentDocComment,
    parameterDocComment: "this is info about b\nnot aligned text about parameter will eat only one space",
    tags: alignmentTags,
});
verify.quickInfos({
    "49aq": [
        "(parameter) c: any",
        "this is info about b\nnot aligned text about parameter will eat only one space"
    ],
    50: "class NoQuickInfoClass"
});
