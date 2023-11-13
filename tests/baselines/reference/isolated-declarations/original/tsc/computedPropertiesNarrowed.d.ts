//// [tests/cases/compiler/computedPropertiesNarrowed.ts] ////

//// [computedPropertiesNarrowed.ts]
const x: 0 | 1 = Math.random()? 0: 1;
declare function assert(n: number): asserts n is 1;
assert(x);
export let o = {
    [x]: 1 // error narrow type !== declared type
}


const y: 0 = 0
export let o2 = {
    [y]: 1 // ok literal computed type 
}

// literals are ok
export let o3 = { [1]: 1 }
export let o31 = { [-1]: 1 }

export let o32 = { [1-1]: 1 } // error number 

let u = Symbol();
export let o4 = {
    [u]: 1 // Should error, nut a unique symbol
}

export let o5  ={
    [Symbol()]: 1 // Should error
}

const uu: unique symbol = Symbol();
export let o6  = {
    [uu]: 1 // Should be ok
}


function foo (): 1 { return 1; }
export let o7 = {
    [foo()]: 1 // Should error
};

let E = { A: 1 } as const
export const o8 = {
    [E.A]: 1 // Fresh 
}

function ns() { return { v: 0 } as const }
export const o9 = {
    [ns().v]: 1
}


/// [Declarations] ////



//// [computedPropertiesNarrowed.d.ts]
export declare let o: invalid;
declare const y: 0;
export declare let o2: {
    [y]: number;
};
export declare let o3: {
    1: number;
};
export declare let o31: {
    [-1]: number;
};
export declare let o32: invalid;
export declare let o4: invalid;
export declare let o5: invalid;
declare const uu: unique symbol;
export declare let o6: {
    [uu]: number;
};
export declare let o7: invalid;
declare let E: {
    readonly A: 1;
};
export declare const o8: {
    [E.A]: number;
};
export declare const o9: invalid;
export {};

/// [Errors] ////

computedPropertiesNarrowed.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertiesNarrowed.ts(18,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertiesNarrowed.ts(22,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertiesNarrowed.ts(26,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertiesNarrowed.ts(37,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertiesNarrowed.ts(47,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== computedPropertiesNarrowed.ts (6 errors) ====
    const x: 0 | 1 = Math.random()? 0: 1;
    declare function assert(n: number): asserts n is 1;
    assert(x);
    export let o = {
        [x]: 1 // error narrow type !== declared type
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    
    const y: 0 = 0
    export let o2 = {
        [y]: 1 // ok literal computed type 
    }
    
    // literals are ok
    export let o3 = { [1]: 1 }
    export let o31 = { [-1]: 1 }
    
    export let o32 = { [1-1]: 1 } // error number 
                       ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    let u = Symbol();
    export let o4 = {
        [u]: 1 // Should error, nut a unique symbol
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    export let o5  ={
        [Symbol()]: 1 // Should error
        ~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    const uu: unique symbol = Symbol();
    export let o6  = {
        [uu]: 1 // Should be ok
    }
    
    
    function foo (): 1 { return 1; }
    export let o7 = {
        [foo()]: 1 // Should error
        ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    };
    
    let E = { A: 1 } as const
    export const o8 = {
        [E.A]: 1 // Fresh 
    }
    
    function ns() { return { v: 0 } as const }
    export const o9 = {
        [ns().v]: 1
        ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    