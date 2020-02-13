//// [tests/cases/conformance/types/range/ranges.ts] ////

//// [semantics.ts]
// Rules (from https://gist.github.com/rbuckton/5fd81582fdf86a34b45bae82d842304c)

// Semantic Rules
{
    // - The result of a *Range Type* has the same mutability as its *object type*.
    type T1 = [1, 2, 3][0:2];
    type T2 = (readonly [1, 2, 3])[0:2];
}

{
    // - The *object type* of a *Range Type* is constrained to be an *Array Type* or a *Tuple Type*.
    type T1 = [1, 2, 3][0:2];
    type T2 = number[][0:2];
    type T3 = {}[0:2]; // error
}

{
    // - The *start type* and *end type* of a *Range Type* are constrained to `string | number`.
    type T1 = [1, 2, 3][0:2];
    type T2 = [1, 2, 3]["0":"2"];
    type T3 = [1, 2, 3][true:false]; // error
}

{
    // - The *start type* of a *Range Type* is optional. If not present, the *lower bound type* (`0`) is used.
    type T2 = [1, 2, 3][:1];

    // - The *end type* of a *Range Type* is optional. If not present, the *upper bound type* (`^0`) is used.
    type T3 = [1, 2, 3][1:];
    type T1 = [1, 2, 3][:];
}

{
    // - If the *start type* or *end type* of a *Range Type* are negative-valued *Numeric Literal Types* (or numeric index-valued *String Literal Types*), they are treated
    //   as an *Inverse Offset Type* for the absolute value of the numeric index value of the respective type.
    //     - NOTE: This does not work for `-0` as JavaScript generally treats `-0` and `0` as the same value except for a few small corner cases and we must 
    //       align with this behavior.
    type T1 = [1, 2, 3, 4][1:-1];
    type T2 = [1, 2, 3, 4][1:-0];
}

{
    // - If the *object type* is a "generic object type", or if either of the *start type* or *end type* are
    //   "generic index types", then the operation is deferred until it they can be instantiated.
    type T1<A extends any[]> = A[0:2];
    type T2 = T1<[1, 2, 3]>;
    type T3 = T1<number[]>;

    type T4<X extends number> = [1, 2, 3][X:];
    type T5 = T4<1>;

    type T6<Y extends number> = [1, 2, 3][:Y];
    type T7 = T6<^1>;
}

{
    // - If either the *object type*, *start type*, or *end type* are *Union Types*, the result is distributed over
    //   each constituent in the following manner:
    //   - The *object type* is distributed over any *Inverse Offset Type* constituent of *start type* or *end type*.
    //     This is necessary as an *Inverse Offset Type* can have a different outcome depending on the *object type*
    //     it is resolved against.
    //   - The *start type* and *end type* are distributed over each constituent of the *object type*.
    //   - The *object type* is distributed over each constituent of the *start type* and *end type*.
    //   - The results of the distribution are either an *Intersection Type* (if the *Range Type* was a "write"
    //     location), or a *Union Type* (if the *Range Type* was a "read" location).
    type T1 = ([1, 2, 3] | [2, 3, 4])[0:2];
    type T2 = [1, 2, 3][0|1:2];
    type T3 = [1, 2, 3][0:1|2];
    type T4 = ([1, 2, 3] | [2, 3, 4])[0|1:2|3];
    type T5 = ([1, 2, 3] | [9, 8])[0:^1];
}

{
    // - Otherwise (or for each constituent of the distribution),
    {
        // - If neither the *start type* nor the *end type* are *String Literal Types* or a *Numeric Literal Types*, then
        //   - Return an *Array Type* for the union of each element of the *object type*: `T[any:any] -> T[number][]`.
        type T1 = [1, 2, 3][number:number];
        type T2 = [1, 2, 3][string:string];
        type T3 = [1, 2, 3][any:any];
        type T4 = [1, 2, 3][never:never];
    }
    {
        // - If the *start type* is neither a *String Literal Type* nor a *Numeric Literal Type*, then
        //   - Return an *Array Type* for the union of each element of the *Range Type* for the same *object type* and
        //     *end type*, but with a *start type* of `0`: `T[any:Y] -> T[:Y][number][]`.
        type T1 = [1, 2, 3][number:2];
        type T2 = [1, 2, 3][string:2];
        type T3 = [1, 2, 3][any:2];
        type T4 = [1, 2, 3][never:2];
    }
    {
        // - If the *end type* is neither a *String Literal Type* nor a *Numeric Literal Type*, then
        //   - Return an *Array Type* for the union of each element of the *Range Type* for the same *object type* and
        //     *start type*, but with an *end type* of `^0`: `T[X:any] -> T[X:][number][]`.
        type T1 = [1, 2, 3][1:number];
        type T2 = [1, 2, 3][1:string];
        type T3 = [1, 2, 3][1:any];
        type T4 = [1, 2, 3][1:never];
    }
    {
        // - If the *start type* is the *lower bound type* (`0`) and the *end type* is the *upper bound type* (`^0`),
        //   then we are including all elements: return the *object type* of the *Range Type*.
        type T1 = [1, 2, 3][0:^0];
    }
    {
        // - If the *start type* is the *upper bound type* (`^0`) or the *end type* is the *lower bound type* (`0`),
        //   then we are including no elements: return the empty *Tuple Type* (`[]`).
        type T1 = [1, 2, 3][^0:^0];
        type T2 = [1, 2, 3][0:0];
    }
    {
        // - If the *object type* is an *Array Type*, then
        {
            // - If the signs of both the *start type* and *end type* agree, then return
            //   a fixed-length *Tuple Type* with a minimum length of `0` for the difference between the *end type* and
            //   the *start type* whose elements are the element type of the *object type*: `T[][0:1] -> [T?]`.
            type T1 = number[][0:2];
            type T2 = number[][^2:^0];
        }
        {
            // - If the *start type* is an *Inverse Offset Type* and the *end type* is not, we can create a tuple of
            //   `min(abs(start), end)` optional elements.
            type T1 = number[][^2:4];
        }
        {
            // - Otherwise, we cannot derive a fixed length: return the *object type* of the *Range Type*.
            type T1 = number[][0:^2];
        }
    }
    {
        // - Otherwise, the *object type* is a *Tuple Type*:
        {
            // - If the *object type* has a rest element, then
            {
                // - If the *start type* is an *Inverse Offset Type*, return an *Array Type* for the union of each
                //   *optional type* and the *rest element type*, along with the set of `n` right-most required
                //   elements of the *object type* where `n` is the absolute value of the *start type*.
                type T1 = [1, 2, 3, ...4[]][^1:];
                type T2 = [1, 2, 3, ...4[]][^2:];
                type T3 = [1, 2, 3, ...4[]][^3:];
                type T4 = [1, 2, 3?, ...4[]][^1:];
                type T5 = [1, 2, 3?, ...4[]][^2:];
                type T6 = [1, 2, 3?, ...4[]][^3:];
            }
            {
                // - If the *end type* is an *Inverse Offset Type*, return a *Tuple Type* of the elements of the
                //   *object type* starting from the index at *start type*, but whose minimum length is reduced by the
                //   absolute value of the *end type*.
                type T1 = [1, 2, 3, ...4[]][1:^1];
                type T2 = [1, 2, 3, ...4[]][1:^2];
                type T3 = [1, 2, 3, ...4[]][1:^3];
                type T4 = [1, 2, 3?, ...4[]][1:^1];
                type T5 = [1, 2, 3?, ...4[]][1:^2];
                type T6 = [1, 2, 3?, ...4[]][1:^3];
            }
        }
        {
            // - Otherwise,
            {
                // - Clamp the *start type* and *end type* to values between `0` and the length of *object type*.
                type T1 = [1, 2, 3][^5:10];
            }
            {
                // - Return a *Tuple Type* for the elements of *object type* starting at *start type* and ending at
                //   *end type*.
                type T1 = [1, 2, 3][1: 2];
            }
        }
    }
}

//// [assignability.ts]
// - `S` is assignable to `T[X:Y]` if `S` is assignable to `C`, where `C` is the base constraint of `T[X:Y]` for writing.
function f1<T extends [1, 2, 3, 4], U extends 1 | 2>(t: T[U:^1], s: [3] & [2, 3]) {
    t = s;
}

// - `S[X:Y]` is assignable to `T[]` if `S[number]` is assignable to `T`.
function f2<T, S extends [T, T, T]>(t: T[], s: S[0:2]) {
    t = s;
}

// - `S[XS:YS]` is assignable to `T[XT:YT]` if `S` is assignable to `T`, `XS` is assignable to `XT`, and `YS` is assignable to `YT`.
function f3<T extends [1 | 9, 2 | 8, 3 | 7, 4 | 6], S extends T>(t: T[1 | 2:3], s: S[1:3]) {
    t = s;
}

//// [semantics.js]
"use strict";
// Rules (from https://gist.github.com/rbuckton/5fd81582fdf86a34b45bae82d842304c)
// Semantic Rules
{
}
{
}
{
}
{
}
{
}
{
}
{
}
{
    // - Otherwise (or for each constituent of the distribution),
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
        // - If the *object type* is an *Array Type*, then
        {
        }
        {
        }
        {
        }
    }
    {
        // - Otherwise, the *object type* is a *Tuple Type*:
        {
            // - If the *object type* has a rest element, then
            {
            }
            {
            }
        }
        {
            // - Otherwise,
            {
            }
            {
            }
        }
    }
}
//// [assignability.js]
"use strict";
// - `S` is assignable to `T[X:Y]` if `S` is assignable to `C`, where `C` is the base constraint of `T[X:Y]` for writing.
function f1(t, s) {
    t = s;
}
// - `S[X:Y]` is assignable to `T[]` if `S[number]` is assignable to `T`.
function f2(t, s) {
    t = s;
}
// - `S[XS:YS]` is assignable to `T[XT:YT]` if `S` is assignable to `T`, `XS` is assignable to `XT`, and `YS` is assignable to `YT`.
function f3(t, s) {
    t = s;
}
