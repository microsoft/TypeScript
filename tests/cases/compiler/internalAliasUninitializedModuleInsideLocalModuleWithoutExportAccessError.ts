<<<<<<< HEAD
//@module: amd
export module a {
    export module b {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
//@module: amd
export namespace a {
    export namespace b {
=======
//@module: commonjs
export namespace a {
    export namespace b {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
        export interface I {
            foo();
        }
    }
}

export module c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}


export var z: c.b.I;