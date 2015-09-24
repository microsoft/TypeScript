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
    Gutter = 0,
    Proper = 4,
}


////class C {
/////*0*/    /*1*/
////    foo();
////    /*2*/foo(a);
////    /*3*/foo(a, b);
////    /*4*/ foo(a, {x: string}, c);
////    /*5*/foo(a?, b?, ...args) {
////    }
////}

confirmNormalizedJsDoc("0", Indentation.Gutter, `
/**
 * 
 */`);

confirmNormalizedJsDoc("2", Indentation.Proper, `
/**
 * 
 * @param a
 */`);

confirmNormalizedJsDoc("3", Indentation.Proper, `
/**
 * 
 * @param a
 * @param b
 */`);

confirmNormalizedJsDoc("4", Indentation.Proper, `
/**
 * 
 * @param a
 * @param param1
 * @param b
 */`);

confirmNormalizedJsDoc("5", Indentation.Proper, `
/**
 * 
 * @param a
 * @param b
 * @param args
 */`);
