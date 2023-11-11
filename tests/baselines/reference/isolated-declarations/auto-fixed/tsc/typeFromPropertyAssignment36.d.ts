//// [tests/cases/conformance/salsa/typeFromPropertyAssignment36.ts] ////

//// [typeFromPropertyAssignment36.ts]
function f(b: boolean): {
    (): void
    e: number
    q: boolean
    r: number
    s: string
} {
    function d() {
    }
    d.e = 12
    d.e

    if (b) {
        d.q = false
    }
    // error d.q might not be assigned
    d.q
    if (b) {
        d.q = false
    }
    else {
        d.q = true
    }
    d.q
    if (b) {
        d.r = 1
    }
    else {
        d.r = 2
    }
    d.r
    if (b) {
        d.s = 'hi'
    }
    return d
}
// OK to access possibly-unassigned properties outside the initialising scope
var test: string = f(true).s

function d(): void {
}
d.e = 12
d.e

if (!!false) {
    d.q = false
}
d.q
if (!!false) {
    d.q = false
}
else {
    d.q = true
}
d.q
if (!!false) {
    d.r = 1
}
else {
    d.r = 2
}
d.r

// test function expressions too
const g: {
    (): void
    expando: number
    both: string | number
} = function() {
}
if (!!false) {
    g.expando = 1
}
g.expando // error

if (!!false) {
    g.both = 'hi'
}
else {
    g.both = 0
}
g.both


/// [Declarations] ////



//// [/.src/typeFromPropertyAssignment36.d.ts]
declare function f(b: boolean): {
    (): void;
    e: number;
    q: boolean;
    r: number;
    s: string;
};
declare var test: string;
declare function d(): void;
declare namespace d {
    var e: number;
    var q: boolean;
    var r: number;
}
declare const g: {
    (): void;
    expando: number;
    both: string | number;
};
/// [Errors] ////

typeFromPropertyAssignment36.ts(17,7): error TS2565: Property 'q' is used before being assigned.
typeFromPropertyAssignment36.ts(48,3): error TS2565: Property 'q' is used before being assigned.


==== typeFromPropertyAssignment36.ts (2 errors) ====
    function f(b: boolean): {
        (): void
        e: number
        q: boolean
        r: number
        s: string
    } {
        function d() {
        }
        d.e = 12
        d.e
    
        if (b) {
            d.q = false
        }
        // error d.q might not be assigned
        d.q
          ~
!!! error TS2565: Property 'q' is used before being assigned.
        if (b) {
            d.q = false
        }
        else {
            d.q = true
        }
        d.q
        if (b) {
            d.r = 1
        }
        else {
            d.r = 2
        }
        d.r
        if (b) {
            d.s = 'hi'
        }
        return d
    }
    // OK to access possibly-unassigned properties outside the initialising scope
    var test: string = f(true).s
    
    function d(): void {
    }
    d.e = 12
    d.e
    
    if (!!false) {
        d.q = false
    }
    d.q
      ~
!!! error TS2565: Property 'q' is used before being assigned.
    if (!!false) {
        d.q = false
    }
    else {
        d.q = true
    }
    d.q
    if (!!false) {
        d.r = 1
    }
    else {
        d.r = 2
    }
    d.r
    
    // test function expressions too
    const g: {
        (): void
        expando: number
        both: string | number
    } = function() {
    }
    if (!!false) {
        g.expando = 1
    }
    g.expando // error
    
    if (!!false) {
        g.both = 'hi'
    }
    else {
        g.both = 0
    }
    g.both
    