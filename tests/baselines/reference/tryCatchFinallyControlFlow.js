//// [tests/cases/compiler/tryCatchFinallyControlFlow.ts] ////

//// [tryCatchFinallyControlFlow.ts]
// Repro from #34797

function f1() {
    let a: number | null = null;
    try {
        a = 123;
        return a;
    }
    catch (e) {
        throw e;
    }
    finally {
        if (a != null && a.toFixed(0) == "123") { 
        }
    }
}

function f2() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        throw e;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f3() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f4() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1 | 2
}

function f5() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 2
}

function f6() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f7() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // Unreachable
}

function f8() {
    let x: 0 | 1 = 0;
    (() => {
        try {
            x = 1;
            return;
        }
        finally {
            x;  // 0 | 1
        }
        x;  // Unreachable
    })();
    x;  // 1
}

function f9() {
    let x: 0 | 1 | 2 = 0;
    (() => {
        try {
            if (!!true) {
                x = 1;
                return;
            }
        }
        finally {
            x;  // 0 | 1
        }
        x;  // 0
        x = 2;
    })();
    x;  // 1 | 2
}

function f10() {
    let x: 0 | 1 | 2 | 3 = 0;
    (() => {
        try {
            x = 1;
            return;
        }
        catch (e) {
            x = 2;
        }
        finally {
            x;  // 0 | 1 | 2
        }
        x;  // 2
        x = 3;
    })();
    x;  // 1 | 3
}

function f11() {
    let x: 0 | 1 | 2 | 3 | 4 | 5 = 0;
    (() => {
        try {
            if (!!true) {
                x = 1;
                return;
            }
            if (!!true) {
                x = 2;
                throw 0;
            }
        }
        catch (e) {
            x;  // 0 | 1 | 2
            x = 3;
        }
        finally {
            x;  // 0 | 1 | 2 | 3
            if (!!true) {
                x = 4;
            }
        }
        x;  // 0 | 3 | 4
        x = 5;
    })();
    x;  // 1 | 4 | 5
}

function f12() {
    let x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 = 0;
    (() => {
        try {
            if (!!true) {
                x = 1;
                return;
            }
            if (!!true) {
                x = 2;
                throw 0;
            }
        }
        catch (e) {
            x;  // 0 | 1 | 2
            x = 3;
        }
        finally {
            x;  // 0 | 1 | 2 | 3
            if (!!true) {
                x = 4;
                return;
            }
            if (!!true) {
                x = 5;
                return;
            }
            x = 6;
            return;
            x; // unreachable
        }
        x; // unreachable
        x = 7; // no effect
    })();
    x;  // 4 | 5 | 6
}

// Repro from #35644

const main = () => {
    let hoge: string | undefined = undefined;
    try {
        hoge = 'hoge!';
        return;
    }
    catch {
        return;
    }
    finally {
        if (hoge) {
            hoge.length;
        }
        return;
    }
}

// Repro from #36828

function t1() {
    const x = (() => {
        try {
            return 'x';
        }
        catch (e) {
            return null;
        }
        x;  // Unreachable
    })();
    x;  // Reachable
}

// Repro from #39043

type State = { tag: "one" } | { tag: "two" } | { tag: "three" };

function notallowed(arg: number) {
    let state: State = { tag: "one" };
    try {
        state = { tag: "two" };
        try {
            state = { tag: "three" };
        }
        finally { }
    }
    catch (err) {
        state.tag;
        if (state.tag !== "one" && state.tag !== "two") {
            console.log(state.tag);
        }
    }
}

function f20() {
    let x: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;
    try {
        x = 1;
        try {
            x = 2;
            try {
                x = 3;
            }
            finally {
                if (!!true) x = 4;
            }
            x;  // 3 | 4
        }
        finally {
            if (!!true) x = 5;
        }
        x;  // 3 | 4 | 5
    }
    finally {
        if (!!true) x = 6;
    }
    x;  // 3 | 4 | 5 | 6
}

function f21() {
    let x: 0 | 1 | 2 | 3 | 4 | 5 = 0;
    try {
        x = 1;
        try {
            x = 2;
            try {
                x = 3;
            }
            finally {
                if (!!true) x = 4;
            }
            x;  // 3 | 4
        }
        finally {
            if (!!true) x = 5;
        }
        x;  // 3 | 4 | 5
    }
    catch (e) {
        x;  // 0 | 1 | 2 | 3 | 4 | 5
    }
}


//// [tryCatchFinallyControlFlow.js]
"use strict";
// Repro from #34797
function f1() {
    var a = null;
    try {
        a = 123;
        return a;
    }
    catch (e) {
        throw e;
    }
    finally {
        if (a != null && a.toFixed(0) == "123") {
        }
    }
}
function f2() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        throw e;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1
}
function f3() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1
}
function f4() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1 | 2
}
function f5() {
    var x = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 2
}
function f6() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1
}
function f7() {
    var x = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // Unreachable
}
function f8() {
    var x = 0;
    (function () {
        try {
            x = 1;
            return;
        }
        finally {
            x; // 0 | 1
        }
        x; // Unreachable
    })();
    x; // 1
}
function f9() {
    var x = 0;
    (function () {
        try {
            if (!!true) {
                x = 1;
                return;
            }
        }
        finally {
            x; // 0 | 1
        }
        x; // 0
        x = 2;
    })();
    x; // 1 | 2
}
function f10() {
    var x = 0;
    (function () {
        try {
            x = 1;
            return;
        }
        catch (e) {
            x = 2;
        }
        finally {
            x; // 0 | 1 | 2
        }
        x; // 2
        x = 3;
    })();
    x; // 1 | 3
}
function f11() {
    var x = 0;
    (function () {
        try {
            if (!!true) {
                x = 1;
                return;
            }
            if (!!true) {
                x = 2;
                throw 0;
            }
        }
        catch (e) {
            x; // 0 | 1 | 2
            x = 3;
        }
        finally {
            x; // 0 | 1 | 2 | 3
            if (!!true) {
                x = 4;
            }
        }
        x; // 0 | 3 | 4
        x = 5;
    })();
    x; // 1 | 4 | 5
}
function f12() {
    var x = 0;
    (function () {
        try {
            if (!!true) {
                x = 1;
                return;
            }
            if (!!true) {
                x = 2;
                throw 0;
            }
        }
        catch (e) {
            x; // 0 | 1 | 2
            x = 3;
        }
        finally {
            x; // 0 | 1 | 2 | 3
            if (!!true) {
                x = 4;
                return;
            }
            if (!!true) {
                x = 5;
                return;
            }
            x = 6;
            return;
            x; // unreachable
        }
        x; // unreachable
        x = 7; // no effect
    })();
    x; // 4 | 5 | 6
}
// Repro from #35644
var main = function () {
    var hoge = undefined;
    try {
        hoge = 'hoge!';
        return;
    }
    catch (_a) {
        return;
    }
    finally {
        if (hoge) {
            hoge.length;
        }
        return;
    }
};
// Repro from #36828
function t1() {
    var x = (function () {
        try {
            return 'x';
        }
        catch (e) {
            return null;
        }
        x; // Unreachable
    })();
    x; // Reachable
}
function notallowed(arg) {
    var state = { tag: "one" };
    try {
        state = { tag: "two" };
        try {
            state = { tag: "three" };
        }
        finally { }
    }
    catch (err) {
        state.tag;
        if (state.tag !== "one" && state.tag !== "two") {
            console.log(state.tag);
        }
    }
}
function f20() {
    var x = 0;
    try {
        x = 1;
        try {
            x = 2;
            try {
                x = 3;
            }
            finally {
                if (!!true)
                    x = 4;
            }
            x; // 3 | 4
        }
        finally {
            if (!!true)
                x = 5;
        }
        x; // 3 | 4 | 5
    }
    finally {
        if (!!true)
            x = 6;
    }
    x; // 3 | 4 | 5 | 6
}
function f21() {
    var x = 0;
    try {
        x = 1;
        try {
            x = 2;
            try {
                x = 3;
            }
            finally {
                if (!!true)
                    x = 4;
            }
            x; // 3 | 4
        }
        finally {
            if (!!true)
                x = 5;
        }
        x; // 3 | 4 | 5
    }
    catch (e) {
        x; // 0 | 1 | 2 | 3 | 4 | 5
    }
}
