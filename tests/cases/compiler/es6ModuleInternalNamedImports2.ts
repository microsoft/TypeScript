// @target: ES6

export module M {
    // variable
    export var M_V = 0;
    // interface
    export interface M_I { }
    //calss
    export class M_C { }
    // instantiated module
    export module M_M { var x; }
    // uninstantiated module
    export module M_MU { }
    // function
    export function M_F() { }
    // enum
    export enum M_E { }
    // type
    export type M_T = number;
    // alias
    export import M_A = M_M;
}

export module M {
    // Reexports
    export {M_V as v};
    export {M_I as i};
    export {M_C as c};
    export {M_M as m};
    export {M_MU as mu};
    export {M_F as f};
    export {M_E as e};
    export {M_A as a};
}
