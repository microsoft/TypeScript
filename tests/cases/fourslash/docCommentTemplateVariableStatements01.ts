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
////var a = 10;
////
/////*b*/
////let b = "";
////
/////*c*/
////const c = 30;
////
/////*d*/
////let d = {
////    foo: 10,
////    bar: "20"
////};
////
/////*e*/
////let e = function e(x, y, z) {
////    return +(x + y + z);
////};
////
/////*f*/
////let f = class F {
////    constructor(a, b, c) {
////        this.a = a;
////        this.b = b || (this.c = c);
////    }
////}

for (const varName of "abcd".split("")) {
    confirmNormalizedJsDoc(varName, /*newTextOffset*/ 8, `
/**
 * 
 */`);
}

confirmNormalizedJsDoc("e", /*newTextOffset*/ 8, `
/**
 * 
 * @param x
 * @param y
 * @param z
 */`);

confirmNormalizedJsDoc("f", /*newTextOffset*/ 8, `
/**
 * 
 * @param a
 * @param b
 * @param c
 */`);