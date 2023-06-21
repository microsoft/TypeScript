// @strict: true, false
// @target: es2022
// export async function returnsAsyncFunction() {
//     return { foo: "" }
// }

// export function *returnsIterableFunction(){
//     yield { yield: "" }

//     return { return: "" }
// }

// export function *returnsIterableFunction2() {
//     yield { yield: "" }
// }


// export function *returnsEmptyYield() {
//     yield;
// }

// export async function *returnsEmptyAsyncIterableFunction() {
    
// }

// export function *returnsIterableFunction4() {
    
// }

// export async function *returnsAsyncIterableFunction() {
//     yield { yield: "" }

//     return { return: "" }
// }

// export async function *returnsAsyncIterableFunction2() {
//     yield { yield: "" }
// }

// export function returnsStringParenthesized() {
//     return ((("A")))
// }

// export function returnsFreshString() {
//     return "A"
// }

// export function returnsCollapsibleType() {
//     if(Math.random()) return "" as string
//     return "A" as "A"
// }

// export function returnFreshLiteralType() {
//     if(Math.random()) return 1;
//     if(Math.random()) return 1;
//     return 1;
// }

// export function returnsSingleNegativeNumbers() {
//     return -1;
// }
// export function returnsNegativeNumbers() {
//     if(Math.random()) return 1;
//     return -1;
// }

// export function returnsNegativeNumbersAndString() {
//     if(Math.random()) return "1" as string;
//     return -1;
// }

// export function returnsNegativeNumbersAndNumber() {
//     if(Math.random()) return 1 as number;
//     return -1;
// }
// export function returnNotFreshLiteralType() {
//     if(Math.random()) return 1 as 1;
//     if(Math.random()) return 1;
//     return 1;
// }


// export function returnNotFreshAndObjects() {
//     if(Math.random()) return 1 as 1;
//     if(Math.random()) return 1;
//     return  { foo: 1 };
// }

// export function returnTypeFreshAndObjects() {
//     if(Math.random()) return 1;
//     if(Math.random()) return 1;
//     return  { foo: 1 };
// }

// export function returnsNumber() {
//     return 1
// }

// export function returnsObject() {
//     return {
//         foo: ""
//     };
// }

// export function returnsObjectUnion() {
//     if(Math.random() > 0) {
//         return {
//             foo: "",
//             bar: 1
//         };
//     }
//     return {
//         foo: ""
//     };
// }

// export function returnsUnionPrimitive() {
//     if(Math.random() > 0) {
//         return "A";
//     }
//     return "B";
// }


// export function ternaryReturn() {
//     return Math.random() ? 1 : "";
// }


let contextInfoCache ="";
export function getCachedClientContextInfo() {
    return contextInfoCache;
}