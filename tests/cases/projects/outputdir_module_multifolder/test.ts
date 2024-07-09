import m1 = require("ref/m1");
import m2 = require("../outputdir_module_multifolder_ref/m2");
export var a1 = 10;
export class c1 {
    public p1: number;
}

export var instance1 = new c1();
export function f1() {
    return instance1;
}

export var a2 = m1.m1_c1;
export var a3 = m2.m2_c1;