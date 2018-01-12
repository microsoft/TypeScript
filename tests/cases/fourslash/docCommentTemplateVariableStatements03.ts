/// <reference path='fourslash.ts' />

/////*a*/
////var a = x => x
////
/////*b*/
////let b = (x,y,z) => x + y + z;
////
/////*c*/
////const c = ((x => +x))
////
/////*d*/
////let d = (function () { })
////
/////*e*/
////let e = function e([a,b,c]) {
////    return "hello"
////};
////
/////*f*/
////let f = class {
////}
////
/////*g*/
////const g = ((class G {
////    constructor(private x);
////    constructor(x,y,z);
////    constructor(x,y,z, ...okayThatsEnough) {
////    }
////}))

verify.docCommentTemplateAt("a", /*newTextOffset*/ 8,
`/**
 * 
 * @param x
 */`);

verify.docCommentTemplateAt("b", /*newTextOffset*/ 8,
`/**
 * 
 * @param x
 * @param y
 * @param z
 */`);

verify.docCommentTemplateAt("c", /*newTextOffset*/ 8,
`/**
 * 
 * @param x
 */`);

verify.docCommentTemplateAt("d", /*newTextOffset*/ 3,
"/** */");

verify.docCommentTemplateAt("e", /*newTextOffset*/ 8,
`/**
 * 
 * @param param0
 */`);

verify.docCommentTemplateAt("f", /*newTextOffset*/ 3,
"/** */");

verify.docCommentTemplateAt("g", /*newTextOffset*/ 8,
`/**
 * 
 * @param x
 */`);