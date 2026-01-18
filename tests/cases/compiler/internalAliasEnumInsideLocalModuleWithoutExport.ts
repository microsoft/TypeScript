//@module: commonjs
// @declaration: true
export namespace a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

export namespace c {
    import b = a.weekend;
    export var bVal: b = b.Sunday;
}
