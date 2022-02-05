// @target: es2015

interface I {
    get x?(): string;
    set x?(value: string);
}

class C implements I {}
