module M {
    export abstract class A {}
    export class B extends A {}
}

new M.A;
new M.B;