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
    Standard = 8,
    Indented = 12,
}


////class C {
/////*0*/    /*1*/
////    foo();
////    /*2*/foo(a);
////    /*3*/foo(a, b);
////    /*4*/ foo(a, {x: string}, [c]);
////    /*5*/foo(a?, b?, ...args) {
////    }
////}

confirmNormalizedJsDoc("0", Indentation.Standard, `
/**
 * 
 */`);


confirmNormalizedJsDoc("1", Indentation.Indented,
   `/**
     * 
     */`);


confirmNormalizedJsDoc("2", Indentation.Indented,
   `/**
     * 
     * @param a
     */
    `);

confirmNormalizedJsDoc("3", Indentation.Indented,
   `/**
     * 
     * @param a
     * @param b
     */
    `);

confirmNormalizedJsDoc("4", Indentation.Indented,
   `/**
     * 
     * @param a
     * @param param1
     * @param param2
     */`);

confirmNormalizedJsDoc("5", Indentation.Indented, 
    `/**
     * 
     * @param a
     * @param b
     * @param args
     */
    `);
