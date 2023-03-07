// @strict: true

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