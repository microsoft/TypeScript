<<<<<<< HEAD
//@module: amd
export module a {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
//@module: amd
export namespace a {
=======
//@module: commonjs
export namespace a {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
    export interface I {
    }
}

export module c {
    import b = a.I;
    export var x: b;
}

var x: c.b;