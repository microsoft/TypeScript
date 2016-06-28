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

const enum Indentation {
    Indented = 12,
}


////var x = {
////    /*0*/
////    foo() {
////        return undefined;
////    }
////    /*1*/
////    [1 + 2 + 3 + Math.rand()](x: number, y: string, z = true) { }
////}

confirmNormalizedJsDoc("0", Indentation.Indented,
   `/**
     * 
     */`);

confirmNormalizedJsDoc("1", Indentation.Indented,
   `/**
     * 
     * @param x
     * @param y
     * @param z
     */`);