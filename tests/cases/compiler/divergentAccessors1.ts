// @strict: true

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
