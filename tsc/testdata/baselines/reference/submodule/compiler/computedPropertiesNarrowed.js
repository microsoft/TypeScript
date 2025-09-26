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


//// [computedPropertiesNarrowed.js]
const x = Math.random() ? 0 : 1;
assert(x);
export let o = {
    [x]: 1 // error narrow type !== declared type
};
const y = 0;
export let o2 = {
    [y]: 1 // ok literal computed type 
};
// literals are ok
export let o3 = { [1]: 1 };
export let o31 = { [-1]: 1 };
export let o32 = { [1 - 1]: 1 }; // error number 
let u = Symbol();
export let o4 = {
    [u]: 1 // Should error, nut a unique symbol
};
export let o5 = {
    [Symbol()]: 1 // Should error
};
const uu = Symbol();
export let o6 = {
    [uu]: 1 // Should be ok
};
function foo() { return 1; }
export let o7 = {
    [foo()]: 1 // Should error
};
let E = { A: 1 };
export const o8 = {
    [E.A]: 1 // Fresh 
};
function ns() { return { v: 0 }; }
export const o9 = {
    [ns().v]: 1
};


//// [computedPropertiesNarrowed.d.ts]
export declare let o: {
    1: number;
};
export declare let o2: {
    0: number;
};
export declare let o3: {
    1: number;
};
export declare let o31: {
    [-1]: number;
};
export declare let o32: {
    [x: number]: number;
};
export declare let o4: {
    [x: symbol]: number;
};
export declare let o5: {
    [x: symbol]: number;
};
declare const uu: unique symbol;
export declare let o6: {
    [uu]: number;
};
export declare let o7: {
    1: number;
};
export declare const o8: {
    1: number;
};
export declare const o9: {
    0: number;
};
export {};
