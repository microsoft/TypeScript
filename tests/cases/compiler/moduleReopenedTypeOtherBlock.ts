module M {
    export class C1 { }
    export interface I { n: number; }
}
module M {
    export class C2 { f(): I { return null; } }
}
