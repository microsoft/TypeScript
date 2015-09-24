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

function confirmNormalizedJsDoc(markerName: string, indentation: number, template: string): void {
    goTo.marker(markerName);
    const normalized = useCRLFAndStripLeadingNewline(template);
    verify.DocCommentTemplate(normalized, indentation);
}

/////*namespaceN*/
////namespace n {
////}
////
/////*namespaceM*/
////module m {
////}
////
/////*ambientModule*/
////module "ambientModule" {
////}

confirmNormalizedJsDoc("namespaceN", /*indentation*/ 4, `
/**
 * 
 */`);

confirmNormalizedJsDoc("namespaceM", /*indentation*/ 4, `
/**
 * 
 */`);

confirmNormalizedJsDoc("namespaceM", /*indentation*/ 4, `
/**
 * 
 */`);
