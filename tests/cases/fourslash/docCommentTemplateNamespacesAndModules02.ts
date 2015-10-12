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

function confirmNormalizedJsDoc(markerName: string, charOffset: number, template: string): void {
    goTo.marker(markerName);
    const normalized = useCRLFAndStripLeadingNewline(template);
    verify.DocCommentTemplate(normalized, charOffset);
}

/////*top*/
////namespace n1.
////    /*n2*/ n2.
////    /*n3*/ n3 {
////}

confirmNormalizedJsDoc("top", /*indentation*/ 8, `
/**
 * 
 */`);

goTo.marker("n2");
verify.noDocCommentTemplate();

goTo.marker("n3");
verify.noDocCommentTemplate();