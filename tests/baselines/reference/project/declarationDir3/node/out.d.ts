declare module "subfolder/b" {
    export class B {
    }
}
declare module "a" {
    import { B } from "subfolder/b";
    export class A {
        b: B;
    }
}
declare module "subfolder/c" {
    import { A } from "a";
    export class C {
        a: A;
    }
}
