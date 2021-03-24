// @strict: true

// Accessors in interfaces/types

{
    interface IHasGetSet {
        get foo(): number;
        set foo(): number | string;
    }
    
    declare const ihgs: IHasGetSet;
    ihgs.foo = "32";
    let r_ihgs_foo: number = ihgs.foo;
}

{
    type T_HasGetSet = {
        get foo(): number;
        set foo(): number | string;
    }
    
    declare const t_hgs: T_HasGetSet;
    t_hgs.foo = "32";
    let r_t_hgs_foo: number = t_hgs.foo;
}
