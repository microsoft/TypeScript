// @target: es6
module M {
    export class C { }
}
module M {
    {
        let M = 0;
        new C();
    }
}