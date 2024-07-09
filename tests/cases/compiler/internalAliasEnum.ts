// @declaration: true
module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

module c {
    import b = a.weekend;
    export var bVal: b = b.Sunday;
}
