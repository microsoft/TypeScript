//// [exhaustiveSwitchImplicitReturn.ts]
function foo1(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }
}

function foo2(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }

    let unusedVariable;
}

function foo3(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }

    function neverCalled() {}
}

function foo4(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }

    foo3(bar);
}

function foo5(bar: "a" | "b"): number {
    switch(bar) {
        case "a":
            return 1;
    }
}

// Repro from #32905.

enum Foo {
    One,
    Two,
    Three
}

function test2(type: Foo): number {
    try {
        switch (type) {
            case Foo.One:
                return 0;
            case Foo.Two:
                return 0;
            case Foo.Three:
                return 0;
        }
    } catch (e) {
        throw new Error('some error')
    }
}

function test3(type: Foo): number {
    try {
        console.log('some switch')
        switch (type) {
            case Foo.One:
                return 0;
            case Foo.Two:
                return 0;
            case Foo.Three:
                return 0;
        }
    } catch (e) {
        console.log('some error')
        throw new Error('some error')
    }
}

function test4(type: Foo): number {
    try {
        console.log('some switch')
        switch (type) {
            case Foo.One:
                return 0;
            case Foo.Two:
                return 0;
            case Foo.Three:
                0;
        }
    } catch (e) {
        console.log('some error')
        throw new Error('some error')
    }
}


//// [exhaustiveSwitchImplicitReturn.js]
function foo1(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
}
function foo2(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
    var unusedVariable;
}
function foo3(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
    function neverCalled() { }
}
function foo4(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
    foo3(bar);
}
function foo5(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
}
// Repro from #32905.
var Foo;
(function (Foo) {
    Foo[Foo["One"] = 0] = "One";
    Foo[Foo["Two"] = 1] = "Two";
    Foo[Foo["Three"] = 2] = "Three";
})(Foo || (Foo = {}));
function test2(type) {
    try {
        switch (type) {
            case Foo.One:
                return 0;
            case Foo.Two:
                return 0;
            case Foo.Three:
                return 0;
        }
    }
    catch (e) {
        throw new Error('some error');
    }
}
function test3(type) {
    try {
        console.log('some switch');
        switch (type) {
            case Foo.One:
                return 0;
            case Foo.Two:
                return 0;
            case Foo.Three:
                return 0;
        }
    }
    catch (e) {
        console.log('some error');
        throw new Error('some error');
    }
}
function test4(type) {
    try {
        console.log('some switch');
        switch (type) {
            case Foo.One:
                return 0;
            case Foo.Two:
                return 0;
            case Foo.Three:
                0;
        }
    }
    catch (e) {
        console.log('some error');
        throw new Error('some error');
    }
}
