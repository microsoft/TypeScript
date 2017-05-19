/// <reference path='fourslash.ts' />

const CRLF = "\r\n";
/**
 * @returns the given value with '\n' normalized to '\r\n' and with no leading newline
 */
function useCRLFAndStripLeadingNewline(str: string): string {
    str = str.replace(/\r?\n/g, CRLF);
    if (str.indexOf(CRLF) === 0) {
        str = str.slice(CRLF.length);
    }
    return str;
}

function confirmNormalizedJsDoc(markerName: string, newTextOffset: number, template: string): void {
    goTo.marker(markerName);
    const normalized = useCRLFAndStripLeadingNewline(template);
    verify.DocCommentTemplate(normalized, newTextOffset);
}

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

confirmNormalizedJsDoc("a", /*newTextOffset*/ 8, `
/**
 * 
 * @param x
 */`);

confirmNormalizedJsDoc("b", /*newTextOffset*/ 8, `
/**
 * 
 * @param x
 * @param y
 * @param z
 */`);

confirmNormalizedJsDoc("c", /*newTextOffset*/ 8, `
/**
 * 
 * @param x
 */`);

confirmNormalizedJsDoc("d", /*newTextOffset*/ 8, `
/**
 * 
 */`);

confirmNormalizedJsDoc("e", /*newTextOffset*/ 8, `
/**
 * 
 * @param param0
 */`);

confirmNormalizedJsDoc("f", /*newTextOffset*/ 8, `
/**
 * 
 */`);

confirmNormalizedJsDoc("g", /*newTextOffset*/ 8, `
/**
 * 
 * @param x
 */`);