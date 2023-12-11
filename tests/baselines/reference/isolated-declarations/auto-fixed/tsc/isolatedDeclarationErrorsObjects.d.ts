//// [tests/cases/compiler/isolatedDeclarationErrorsObjects.ts] ////

//// [isolatedDeclarationErrorsObjects.ts]
export let o = {
    a: 1,
    b: ""
}

export let oBad: {
    a: number;
} = {
    a: Math.random(),
}
export const V = 1;
export let oBad2: {
    a: {
        b: number;
    };
    c: {
        d: number;
        e: number;
    };
} = {
    a: {
        b: Math.random(),
    },
    c: {
        d: 1,
        e: V,
    }
}

export let oWithMethods: {
    method(): void;
    okMethod(): void;
    a: number;
    bad(): void;
    e: number;
} = {
    method() { },
    okMethod(): void { },
    a: 1,
    bad() { },
    e: V,
}
export let oWithMethodsNested = {
    foo: {
        method(): void { },
        a: 1,
        okMethod(): void { },
        bad(): void { }
    }
}



export let oWithAccessor = {
    get singleGetterBad(): number { return 0 },
    set singleSetterBad(value: any) { },

    get getSetBad(): number { return 0 },
    set getSetBad(value) { },

    get getSetOk(): number { return 0 },
    set getSetOk(value) { },

    get getSetOk2() { return 0 },
    set getSetOk2(value: number) { },
    
    get getSetOk3(): number { return 0 },
    set getSetOk3(value: number) { },
}

function prop<T>(v: T): T { return v }

const s: unique symbol = Symbol();
enum E {
    V = 10,
}
export const oWithComputedProperties: {
    [x: number]: number;
    1: number;
    2: number;
    [s]: number;
    [E.V]: number;
} = {
    [1]: 1,
    [1 + 3]: 1,
    [prop(2)]: 2,
    [s]: 1,
    [E.V]: 1,
}

const part = { a: 1 };

export const oWithSpread: {
    c: number;
    part: {
        a: number;
    };
    a: number;
    b: number;
} = {
    b: 1,
    ...part,
    c: 1,
    part,
}


export const oWithSpread: {
    b: number;
    nested: {
        a: number;
    };
    c: number;
    part: {
        a: number;
    };
} = {
    b: 1,
    nested: {
        ...part,
    },
    c: 1,
    part,
}


/// [Declarations] ////



//// [isolatedDeclarationErrorsObjects.d.ts]
export declare let o: {
    a: number;
    b: string;
};
export declare let oBad: {
    a: number;
};
export declare const V = 1;
export declare let oBad2: {
    a: {
        b: number;
    };
    c: {
        d: number;
        e: number;
    };
};
export declare let oWithMethods: {
    method(): void;
    okMethod(): void;
    a: number;
    bad(): void;
    e: number;
};
export declare let oWithMethodsNested: {
    foo: {
        method(): void;
        a: number;
        okMethod(): void;
        bad(): void;
    };
};
export declare let oWithAccessor: {
    readonly singleGetterBad: number;
    singleSetterBad: any;
    getSetBad: number;
    getSetOk: number;
    getSetOk2: number;
    getSetOk3: number;
};
declare const s: unique symbol;
declare enum E {
    V = 10
}
export declare const oWithComputedProperties: {
    [x: number]: number;
    1: number;
    2: number;
    [s]: number;
    [E.V]: number;
};
export declare const oWithSpread: {
    c: number;
    part: {
        a: number;
    };
    a: number;
    b: number;
};
export declare const oWithSpread: {
    b: number;
    nested: {
        a: number;
    };
    c: number;
    part: {
        a: number;
    };
};
export {};

/// [Errors] ////

isolatedDeclarationErrorsObjects.ts(93,14): error TS2451: Cannot redeclare block-scoped variable 'oWithSpread'.
isolatedDeclarationErrorsObjects.ts(108,14): error TS2451: Cannot redeclare block-scoped variable 'oWithSpread'.


==== isolatedDeclarationErrorsObjects.ts (2 errors) ====
    export let o = {
        a: 1,
        b: ""
    }
    
    export let oBad: {
        a: number;
    } = {
        a: Math.random(),
    }
    export const V = 1;
    export let oBad2: {
        a: {
            b: number;
        };
        c: {
            d: number;
            e: number;
        };
    } = {
        a: {
            b: Math.random(),
        },
        c: {
            d: 1,
            e: V,
        }
    }
    
    export let oWithMethods: {
        method(): void;
        okMethod(): void;
        a: number;
        bad(): void;
        e: number;
    } = {
        method() { },
        okMethod(): void { },
        a: 1,
        bad() { },
        e: V,
    }
    export let oWithMethodsNested = {
        foo: {
            method(): void { },
            a: 1,
            okMethod(): void { },
            bad(): void { }
        }
    }
    
    
    
    export let oWithAccessor = {
        get singleGetterBad(): number { return 0 },
        set singleSetterBad(value: any) { },
    
        get getSetBad(): number { return 0 },
        set getSetBad(value) { },
    
        get getSetOk(): number { return 0 },
        set getSetOk(value) { },
    
        get getSetOk2() { return 0 },
        set getSetOk2(value: number) { },
        
        get getSetOk3(): number { return 0 },
        set getSetOk3(value: number) { },
    }
    
    function prop<T>(v: T): T { return v }
    
    const s: unique symbol = Symbol();
    enum E {
        V = 10,
    }
    export const oWithComputedProperties: {
        [x: number]: number;
        1: number;
        2: number;
        [s]: number;
        [E.V]: number;
    } = {
        [1]: 1,
        [1 + 3]: 1,
        [prop(2)]: 2,
        [s]: 1,
        [E.V]: 1,
    }
    
    const part = { a: 1 };
    
    export const oWithSpread: {
                 ~~~~~~~~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'oWithSpread'.
        c: number;
        part: {
            a: number;
        };
        a: number;
        b: number;
    } = {
        b: 1,
        ...part,
        c: 1,
        part,
    }
    
    
    export const oWithSpread: {
                 ~~~~~~~~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'oWithSpread'.
        b: number;
        nested: {
            a: number;
        };
        c: number;
        part: {
            a: number;
        };
    } = {
        b: 1,
        nested: {
            ...part,
        },
        c: 1,
        part,
    }
    