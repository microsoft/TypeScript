// @strict: true
// @exactOptionalPropertyTypes: false

/**
 * The (OK/Error) X (expected/unexpected) notations on the rhs 
 * of the assignments are valid for versions 4.2.3 ~ 4.8 dev
 */

{
    type T1 = [x:number,y?:boolean];
    type T2 = [...T1, "$"];  // GUI shows type T2 = [number, boolean | undefined, "$"]

    const t2a:T2 = [1, "$"]; // Error (expected)
    const t2b:T2 = [1, true, "$"]; // OK (expected)
}

{
    type Last = "$";
    type T11 = [x:"^",...y:boolean[]];
    type T11m = [z?:string];
    type T12 = [...T11, ...T11m,"$"]; // type T12 = [1, ...(string | boolean | undefined)[], "$"]

    const t12a:T12 = ["^", "$"]; // Error (unexpected)
    const t12b:T12 = ["^", true, "$"]; // Error (unexpected)
    const t12c:T12 = ["^", "$" as Last]; // OK (expected)
    const t12d:T12 = ["^", true, "$" as Last]; // OK (expected)
}