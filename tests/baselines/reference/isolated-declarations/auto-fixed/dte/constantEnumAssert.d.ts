//// [tests/cases/compiler/constantEnumAssert.ts] ////

//// [constantEnumAssert.ts]
enum E1 {
    a,
    b
}

enum E2 {
    a = 'a',
    b = 'b'
}

enum E3 {
    a = 1,
    b = a << 1,
    c = a << 2,
}

const enum E4 {
    a,
    b
}

const E5 = {
    a: 'a',
    b: 'b'
}

const foo1: {
    a: E1
} = { a: E1.a }

const foo2: {
    a: E2
} = { a: E2.a }

const foo3: {
    readonly a: E1.a
} = { a: E1.a } as const

const foo4: {
    readonly a: E2.a
} = { a: E2.a } as const

const foo5: {
    readonly a: E3.a
} = { a: E3.a } as const

const foo6: {
    readonly a: E4.a
} = { a: E4.a } as const

const foo7: {
    readonly a: string
} = { a: E5.a } as const

const foo8: {
    a: E1.a
} = { a: E1.a as const }

const foo9: {
    a: E2.a
} = { a: E2.a as const }

const foo10: {
    a: E3.a
} = { a: E3.a as const }

const foo11: {
    a: E4.a
} = { a: E4.a as const }

const foo12: {
    a: string
} = { a: E5.a as const }


/// [Declarations] ////



//// [/.src/constantEnumAssert.d.ts]
declare enum E1 {
    a = 0,
    b = 1
}
declare enum E2 {
    a = "a",
    b = "b"
}
declare enum E3 {
    a = 1,
    b = 2,
    c = 4
}
declare const enum E4 {
    a = 0,
    b = 1
}
declare const E5: {
    a: string;
    b: string;
};
declare const foo1: {
    a: E1;
};
declare const foo2: {
    a: E2;
};
declare const foo3: {
    readonly a: E1.a;
};
declare const foo4: {
    readonly a: E2.a;
};
declare const foo5: {
    readonly a: E3.a;
};
declare const foo6: {
    readonly a: E4.a;
};
declare const foo7: {
    readonly a: string;
};
declare const foo8: {
    a: E1.a;
};
declare const foo9: {
    a: E2.a;
};
declare const foo10: {
    a: E3.a;
};
declare const foo11: {
    a: E4.a;
};
declare const foo12: {
    a: string;
};
/// [Errors] ////

constantEnumAssert.ts(13,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constantEnumAssert.ts(14,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constantEnumAssert.ts(73,10): error TS1355: A 'const' assertions can only be applied to references to enum members, or string, number, boolean, array, or object literals.


==== constantEnumAssert.ts (3 errors) ====
    enum E1 {
        a,
        b
    }
    
    enum E2 {
        a = 'a',
        b = 'b'
    }
    
    enum E3 {
        a = 1,
        b = a << 1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = a << 2,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    const enum E4 {
        a,
        b
    }
    
    const E5 = {
        a: 'a',
        b: 'b'
    }
    
    const foo1: {
        a: E1
    } = { a: E1.a }
    
    const foo2: {
        a: E2
    } = { a: E2.a }
    
    const foo3: {
        readonly a: E1.a
    } = { a: E1.a } as const
    
    const foo4: {
        readonly a: E2.a
    } = { a: E2.a } as const
    
    const foo5: {
        readonly a: E3.a
    } = { a: E3.a } as const
    
    const foo6: {
        readonly a: E4.a
    } = { a: E4.a } as const
    
    const foo7: {
        readonly a: string
    } = { a: E5.a } as const
    
    const foo8: {
        a: E1.a
    } = { a: E1.a as const }
    
    const foo9: {
        a: E2.a
    } = { a: E2.a as const }
    
    const foo10: {
        a: E3.a
    } = { a: E3.a as const }
    
    const foo11: {
        a: E4.a
    } = { a: E4.a as const }
    
    const foo12: {
        a: string
    } = { a: E5.a as const }
             ~~~~
!!! error TS1355: A 'const' assertions can only be applied to references to enum members, or string, number, boolean, array, or object literals.
    