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

/////*decl*/class C {
////    private p;
////    constructor(a, b, c, d);
////    constructor(public a, private b, protected c, d, e?) {
////    }
////
////    foo();
////    foo(a?, b?, ...args) {
////    }
////}

confirmNormalizedJsDoc("decl", /*newTextOffset*/ 8, `
/**
 * 
 */
`);
