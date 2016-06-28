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

////class C {
////    private p;
////    /*0*/
////    constructor(a, b, c, d);
////    /*1*/
////    constructor(public a, private b, protected c, d, e?) {
////    }
////
////    foo();
////    foo(a?, b?, ...args) {
////    }
////}

const newTextOffset = 12;
confirmNormalizedJsDoc("0", /*newTextOffset*/ newTextOffset,
   `/**
     * 
     * @param a
     * @param b
     * @param c
     * @param d
     */`);

confirmNormalizedJsDoc("1", /*newTextOffset*/ newTextOffset,
   `/**
     * 
     * @param a
     * @param b
     * @param c
     * @param d
     * @param e
     */`);
