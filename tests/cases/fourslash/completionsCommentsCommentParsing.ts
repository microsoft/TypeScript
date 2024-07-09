/// <reference path='fourslash.ts' />

/////// This is simple /// comments
////function simple() {
////}
////
////simple( );
////
/////// multiLine /// Comments
/////// This is example of multiline /// comments
/////// Another multiLine
////function multiLine() {
////}
////multiLine( );
////
/////** this is eg of single line jsdoc style comment */
////function jsDocSingleLine() {
////}
////jsDocSingleLine();
////
////
/////** this is multiple line jsdoc stule comment
////*New line1
////*New Line2*/
////function jsDocMultiLine() {
////}
////jsDocMultiLine();
////
/////** multiple line jsdoc comments no longer merge
////*New line1
////*New Line2*/
/////** Shoul mege this line as well
////* and this too*/ /** Another this one too*/
////function jsDocMultiLineMerge() {
////}
////jsDocMultiLineMerge();
////
////
/////// Triple slash comment
/////** jsdoc comment */
////function jsDocMixedComments1() {
////}
////jsDocMixedComments1();
////
/////// Triple slash comment
/////** jsdoc comment */ /** another jsDocComment*/
////function jsDocMixedComments2() {
////}
////jsDocMixedComments2();
////
/////** jsdoc comment */ /*** triplestar jsDocComment*/
/////// Triple slash comment
////function jsDocMixedComments3() {
////}
////jsDocMixedComments3();
////
/////** jsdoc comment */ /** another jsDocComment*/
/////// Triple slash comment
/////// Triple slash comment 2
////function jsDocMixedComments4() {
////}
////jsDocMixedComments4();
////
/////// Triple slash comment 1
/////** jsdoc comment */ /** another jsDocComment*/
/////// Triple slash comment
/////// Triple slash comment 2
////function jsDocMixedComments5() {
////}
////jsDocMixedComments5();
////
/////** another jsDocComment*/
/////// Triple slash comment 1
/////// Triple slash comment
/////// Triple slash comment 2
/////** jsdoc comment */
////function jsDocMixedComments6() {
////}
////jsDocMixedComments6();
////
////// This shoulnot be help comment
////function noHelpComment1() {
////}
////noHelpComment1();
////
/////* This shoulnot be help comment */
////function noHelpComment2() {
////}
////noHelpComment2();
////
////function noHelpComment3() {
////}
////noHelpComment3();
/////** Adds two integers and returns the result
////  * @param {number} a first number
////  * @param b second number
////  */
////function sum(a: number, b: number) {
////    return /*18*/a + b;
////}
/////*15*/sum(10, 20);
/////** This is multiplication function
//// * @param 
//// * @param a first number
//// * @param b
//// * @param c {
//// @param d @anotherTag
//// * @param e LastParam @anotherTag*/
////function multiply(a: number, b: number, c?: number, d?, e?) {
////}
////multiply(10, 20, 30, 40, 50);
/////** fn f1 with number
////* @param { string} b about b
////*/
////function f1(a: number);
////function f1(b: string);
/////**@param opt optional parameter*/
////function f1(aOrb, opt?) {
////    return /*24*/aOrb;
////}
////f1(10);
////f1("hello");
/////*27*/
/////** This is subtract function
////@param { a
////*@param { number | } b this is about b
////@param { { () => string; } } c this is optional param c
////@param { { () => string; } d this is optional param d
////@param { { () => string; } } e this is optional param e
////@param { { { () => string; } } f this is optional param f
////*/
////function subtract(a: number, b: number, c?: () => string, d?: () => string, e?: () => string, f?: () => string) {
////}
////subtract(10,  20,  null,  null,  null, null);
/////** this is square function
////@paramTag { number } a this is input number of paramTag
////@param { number } a this is input number
////@returnType { number } it is return type
////*/
////function square(a: number) {
////    return a * a;
////}
////square(10);
/////** this is divide function
////@param { number} a this is a
////@paramTag { number } g this is optional param g
////@param { number} b this is b
////*/
////function divide(a: number, b: number) {
////}
////divide(10, 20);
/////**
////Function returns string concat of foo and bar
////@param			{string}		foo		is string
////@param		    {string}		bar		is second string
////*/
////function fooBar(foo: string, bar: string) {
////    return foo + bar;
////}
////fooBar("foo","bar");
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
////function jsDocParamTest(/** this is inline comment for a */a: number, /** this is inline comment for b*/ b: number, c: number, d: number) {
////    return /*39*/a + b + c + d;
////}
/////*44*/jsDocParamTest(30, 40, 50, 60);
/////** This is function comment
////  * And properly aligned comment
////  */
////function jsDocCommentAlignmentTest1() {
////}
////jsDocCommentAlignmentTest1();
/////** This is function comment
////  *     And aligned with 4 space char margin
////  */
////function jsDocCommentAlignmentTest2() {
////}
////jsDocCommentAlignmentTest2();
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
////function jsDocCommentAlignmentTest3(a: string, b, c) {
////}
////jsDocCommentAlignmentTest3("hello",1, 2);
/////**/
////class NoQuickInfoClass {
////}

verify.baselineCompletions()
