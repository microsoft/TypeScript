//@module: amd
// @declaration: true
export module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

import b = a.weekend;
export var bVal: b = b.Sunday;
