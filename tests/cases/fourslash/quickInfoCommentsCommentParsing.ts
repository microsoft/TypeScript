/// <reference path='fourslash.ts' />

/////// This is simple /// comments
////function simple() {
////}
////
////sim/*1q*/ple( );
////
/////// multiLine /// Comments
/////// This is example of multiline /// comments
/////// Another multiLine
////function multiLine() {
////}
////mul/*2q*/tiLine( );
////
/////** this is eg of single line jsdoc style comment */
////function jsDocSingleLine() {
////}
////jsDoc/*3q*/SingleLine();
////
////
/////** this is multiple line jsdoc stule comment
////*New line1
////*New Line2*/
////function jsDocMultiLine() {
////}
////jsDocM/*4q*/ultiLine();
////
/////** multiple line jsdoc comments no longer merge
////*New line1
////*New Line2*/
/////** Shoul mege this line as well
////* and this too*/ /** Another this one too*/
////function jsDocMultiLineMerge() {
////}
////jsDocMu/*5q*/ltiLineMerge();
////
////
/////// Triple slash comment
/////** jsdoc comment */
////function jsDocMixedComments1() {
////}
////jsDocMix/*6q*/edComments1();
////
/////// Triple slash comment
/////** jsdoc comment */ /** another jsDocComment*/
////function jsDocMixedComments2() {
////}
////jsDocMi/*7q*/xedComments2();
////
/////** jsdoc comment */ /*** triplestar jsDocComment*/
/////// Triple slash comment
////function jsDocMixedComments3() {
////}
////jsDocMixe/*8q*/dComments3();
////
/////** jsdoc comment */ /** another jsDocComment*/
/////// Triple slash comment
/////// Triple slash comment 2
////function jsDocMixedComments4() {
////}
////jsDocMixed/*9q*/Comments4();
////
/////// Triple slash comment 1
/////** jsdoc comment */ /** another jsDocComment*/
/////// Triple slash comment
/////// Triple slash comment 2
////function jsDocMixedComments5() {
////}
////jsDocM/*10q*/ixedComments5();
////
/////** another jsDocComment*/
/////// Triple slash comment 1
/////// Triple slash comment
/////// Triple slash comment 2
/////** jsdoc comment */
////function jsDocMixedComments6() {
////}
////jsDocMix/*11q*/edComments6();
////
////// This shoulnot be help comment
////function noHelpComment1() {
////}
////noHel/*12q*/pComment1();
////
/////* This shoulnot be help comment */
////function noHelpComment2() {
////}
////noHelpC/*13q*/omment2();
////
////function noHelpComment3() {
////}
////noHelpC/*14q*/omment3();
/////** Adds two integers and returns the result
////  * @param {number} a first number
////  * @param b second number
////  */
////function sum(/*16aq*/a: number, /*17aq*/b: number) {
////    return a + b;
////}
////s/*16q*/um(10, 20);
/////** This is multiplication function
//// * @param 
//// * @param a first number
//// * @param b
//// * @param c {
//// @param d @anotherTag
//// * @param e LastParam @anotherTag*/
////function multiply(/*19aq*/a: number, /*20aq*/b: number, /*21aq*/c?: number, /*22aq*/d?, /*23aq*/e?) {
////}
////mult/*19q*/iply(10, 20, 30, 40, 50);
/////** fn f1 with number
////* @param { string} b about b
////*/
////function f1(/*25aq*/a: number);
////function f1(/*26aq*/b: string);
/////**@param opt optional parameter*/
////function f1(aOrb, opt?) {
////    return aOrb;
////}
////f/*25q*/1(10);
////f/*26q*/1("hello");
////
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
////subt/*28q*/ract(10,  20,  null,  null,  null, null);
/////** this is square function
////@paramTag { number } a this is input number of paramTag
////@param { number } a this is input number
////@returnType { number } it is return type
////*/
////function square(/*34aq*/a: number) {
////    return a * a;
////}
////squ/*34q*/are(10);
/////** this is divide function
////@param { number} a this is a
////@paramTag { number } g this is optional param g
////@param { number} b this is b
////*/
////function divide(/*35aq*/a: number, /*36aq*/b: number) {
////}
////div/*35q*/ide(10, 20);
/////**
////Function returns string concat of foo and bar
////@param			{string}		foo		is string
////@param		    {string}		bar		is second string
////*/
////function fooBar(/*37aq*/foo: string, /*38aq*/bar: string) {
////    return foo + bar;
////}
////fo/*37q*/oBar("foo","bar");
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
////    return a + b + c + d;
////}
////jsD/*40q*/ocParamTest(30, 40, 50, 60);
/////** This is function comment
////  * And properly aligned comment
////  */
////function jsDocCommentAlignmentTest1() {
////}
////jsDocCom/*45q*/mentAlignmentTest1();
/////** This is function comment
////  *     And aligned with 4 space char margin
////  */
////function jsDocCommentAlignmentTest2() {
////}
////jsDocComme/*46q*/ntAlignmentTest2();
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
////jsDocComme/*47q*/ntAlignmentTest3("hello",1, 2);
/////**/
////class NoQuic/*50q*/kInfoClass {
////}
verify.baselineQuickInfo()
