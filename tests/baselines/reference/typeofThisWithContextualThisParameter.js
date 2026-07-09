//// [tests/cases/compiler/typeofThisWithContextualThisParameter.ts] ////

//// [typeofThisWithContextualThisParameter.ts]
// Reproduces #63616: typeof this inconsistent when this parameter comes from a contextual signature

interface A { a: string }

// ---- Object-literal method case ----

{
    interface B { g: (this: A) => void }

    function f(_: B): void {}

    // Case 1: typeof this without explicit this usage — should resolve to A
    f({
        g() {
            type X = typeof this;
            //    ^ should be A
        }
    })

    // Case 2: this used before typeof this — should resolve to A
    f({
        g() {
            this;
            type X = typeof this;
            //    ^ should be A
        }
    })

    // Case 3: this used after typeof this — should resolve to A
    f({
        g() {
            type X = typeof this;
            //    ^ should be A
            this;
        }
    })
}

// ---- Function expression case ----

{
    function f(_: (this: A) => void): void {}

    // Case 4: typeof this only — should resolve to A (not implicit any error for typeof this context)
    f(function g() {
        type X = typeof this;
    })

    // Case 5: this used before typeof this — should resolve to A
    f(function g() {
        this;
        type X = typeof this;
    })

    // Case 6: this used after typeof this — should resolve to A
    f(function g() {
        type X = typeof this;
        this;
    })
}


//// [typeofThisWithContextualThisParameter.js]
"use strict";
// Reproduces #63616: typeof this inconsistent when this parameter comes from a contextual signature
// ---- Object-literal method case ----
{
    function f(_) { }
    // Case 1: typeof this without explicit this usage — should resolve to A
    f({
        g() {
            //    ^ should be A
        }
    });
    // Case 2: this used before typeof this — should resolve to A
    f({
        g() {
            this;
            //    ^ should be A
        }
    });
    // Case 3: this used after typeof this — should resolve to A
    f({
        g() {
            //    ^ should be A
            this;
        }
    });
}
// ---- Function expression case ----
{
    function f(_) { }
    // Case 4: typeof this only — should resolve to A (not implicit any error for typeof this context)
    f(function g() {
    });
    // Case 5: this used before typeof this — should resolve to A
    f(function g() {
        this;
    });
    // Case 6: this used after typeof this — should resolve to A
    f(function g() {
        this;
    });
}


//// [typeofThisWithContextualThisParameter.d.ts]
interface A {
    a: string;
}
