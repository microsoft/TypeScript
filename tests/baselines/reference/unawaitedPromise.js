//// [unawaitedPromise.ts]
declare function doThing(): Promise<string>;

function f() {
    // Should error
    doThing();

    let m: Promise<string>;
    // Should not error
    m = doThing();

    // Should not error
    void doThing();
}

//// [unawaitedPromise.js]
"use strict";
function f() {
    // Should error
    doThing();
    var m;
    // Should not error
    m = doThing();
    // Should not error
    void doThing();
}
