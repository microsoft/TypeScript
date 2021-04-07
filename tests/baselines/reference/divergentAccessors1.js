//// [divergentAccessors1.ts]
// Accessors in interfaces/types

{
    interface IHasGetSet {
        get foo(): number;
        set foo(v: number | string);
    }
    
    const ihgs: IHasGetSet = null as any;
    ihgs.foo = "32";
    let r_ihgs_foo: number = ihgs.foo;
}

{
    type T_HasGetSet = {
        get foo(): number;
        set foo(v: number | string);
    }
    
    const t_hgs: T_HasGetSet = null as any;
    t_hgs.foo = "32";
    let r_t_hgs_foo: number = t_hgs.foo;
}


//// [divergentAccessors1.js]
"use strict";
// Accessors in interfaces/types
{
    var ihgs = null;
    ihgs.foo = "32";
    var r_ihgs_foo = ihgs.foo;
}
{
    var t_hgs = null;
    t_hgs.foo = "32";
    var r_t_hgs_foo = t_hgs.foo;
}
