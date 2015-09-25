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
////let d = function d(x, y, z) {
////    return +(x + y + z);
////};
////
/////*e*/
////let e = class E {
////    constructor(a, b, c) {
////        this.a = a;
////        this.b = b || (this.c = c);
////    }
////}
////
/////*f*/
////let f = {
////    foo: 10,
////    bar: "20"
////};

for (const varName of "abcdef".split("")) {
    confirmNormalizedJsDoc(varName, /*newTextOffset*/ 8, `
/**
 * 
 */`);
}
