//// [variadicTupleRestSandwich.ts]
/**
 * The before: (OK/Error) X (expected/unexpected) notations on the rhs 
 * of the assignments are valid for versions 4.2.3 ~ 4.8 dev.
 */

{
    // Type T2 IS NOT a rest sandwich format - always no change in result between before and after
    type T1 = [x:number,y?:boolean];
    type T2 = [...T1, "$"];  // GUI shows type T2 = [number, boolean | undefined, "$"] canonical type 1 format (no rest)

    const t2a:T2 = [1, "$"]; // { before: Error (expected), after: Error (expected) }
    const t2b:T2 = [1, true, "$"]; // { before: OK (expected), after: OK (expected) }
}

{
    // Type T12 IS a rest sandwich format - this example shows results that improvably differ between before and after.
    type Last = "$";
    type T11 = [x:"^",...y:boolean[]];
    type T11m = [z?:string];
    type T12 = [...T11, ...T11m,"$"]; // type T12 = ["^", ...(string | boolean | undefined)[], "$"] canonical type 2 format (rest sandwich)

    /** 
    * In the next two assignment examples:
    *   before: the glutinous rest element `T12[1]` greedily eats the rhs `$`, preventing `T12[2]` from correctly matching rhs `$`. 
    *   after: first `T12[0]` matches rhs "^", rest element `T12[1]` matching is deffered, `T12[2]`matches the last "$", 
    *     and finally matches the rest element `T12[1]`.
    */
    const t12a:T12 = ["^", "$"]; // { before: Error (unexpected), after: OK (expected) } 
    const t12b:T12 = ["^", true, "$"]; // { before :Error (unexpected), after: OK (expected) }

    // In the next two assignment examples, the before unexpected errors are prevented by explicity casting rhs "$" to the literal type it really is meant to be,
    // which is not compatible with the rest element `T12[1]`.  This is just to illustrate how the unidirecitonal L to R matching is working
    // and can sometimes get the right answer.
    const t12c:T12 = ["^", "$" as Last]; // { before: OK (expected), after: OK (expected) }
    const t12d:T12 = ["^", true, "$" as Last]; // { before: OK (expected), after: OK (expected) }
}


//// [variadicTupleRestSandwich.js]
"use strict";
/**
 * The before: (OK/Error) X (expected/unexpected) notations on the rhs
 * of the assignments are valid for versions 4.2.3 ~ 4.8 dev.
 */
{
    var t2a = [1, "$"]; // { before: Error (expected), after: Error (expected) }
    var t2b = [1, true, "$"]; // { before: OK (expected), after: OK (expected) }
}
{
    /**
    * In the next two assignment examples:
    *   before: the glutinous rest element `T12[1]` greedily eats the rhs `$`, preventing `T12[2]` from correctly matching rhs `$`.
    *   after: first `T12[0]` matches rhs "^", rest element `T12[1]` matching is deffered, `T12[2]`matches the last "$",
    *     and finally matches the rest element `T12[1]`.
    */
    var t12a = ["^", "$"]; // { before: Error (unexpected), after: OK (expected) } 
    var t12b = ["^", true, "$"]; // { before :Error (unexpected), after: OK (expected) }
    // In the next two assignment examples, the before unexpected errors are prevented by explicity casting rhs "$" to the literal type it really is meant to be,
    // which is not compatible with the rest element `T12[1]`.  This is just to illustrate how the unidirecitonal L to R matching is working
    // and can sometimes get the right answer.
    var t12c = ["^", "$"]; // { before: OK (expected), after: OK (expected) }
    var t12d = ["^", true, "$"]; // { before: OK (expected), after: OK (expected) }
}
