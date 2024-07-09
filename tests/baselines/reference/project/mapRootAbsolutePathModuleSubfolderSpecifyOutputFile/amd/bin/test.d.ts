declare module "ref/m1" {
    export var m1_a1: number;
    export class m1_c1 {
        m1_c1_p1: number;
    }
    export var m1_instance1: m1_c1;
    export function m1_f1(): m1_c1;
}
declare module "test" {
    import m1 = require("ref/m1");
    export var a1: number;
    export class c1 {
        p1: number;
    }
    export var instance1: c1;
    export function f1(): c1;
    export var a2: typeof m1.m1_c1;
}
