//// [inKeywordAndUnknown.ts]
// Repro from #50531

function f(x: {}, y: unknown) {
    if (!("a" in x)) {
        return;
    }
    x;  // {}
    if (!y) {
        return;
    }
    y;  // {}
    if (!("a" in y)) {
        return;
    }
    y;  // {}
}


// repro #51007
function isHTMLTable(table: unknown): boolean {
    return !!table && table instanceof Object && 'html' in table;
}

function tryGetHtmlPropFromTable(table: unknown) {
    if (!!table && table instanceof Object && 'html' in table && table.html instanceof Object) {
        return table.html;
    }
    return undefined;
}


//// [inKeywordAndUnknown.js]
"use strict";
// Repro from #50531
function f(x, y) {
    if (!("a" in x)) {
        return;
    }
    x; // {}
    if (!y) {
        return;
    }
    y; // {}
    if (!("a" in y)) {
        return;
    }
    y; // {}
}
// repro #51007
function isHTMLTable(table) {
    return !!table && table instanceof Object && 'html' in table;
}
function tryGetHtmlPropFromTable(table) {
    if (!!table && table instanceof Object && 'html' in table && table.html instanceof Object) {
        return table.html;
    }
    return undefined;
}
