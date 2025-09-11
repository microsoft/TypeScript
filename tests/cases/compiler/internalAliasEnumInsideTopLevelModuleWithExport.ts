//@module: amd
// @declaration: true
export namespace a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

export import b = a.weekend;
export var bVal: b = b.Sunday;
