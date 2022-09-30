// @strict: true

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
