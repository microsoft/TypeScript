// @alwaysStrict: true
// @outFile: out.js

// @fileName: a.ts
module M {
    export function f() {
        var arguments = [];
    }
}

// @fileName: b.ts
module M {
    export function f2() {
        var arguments = [];
    }
}