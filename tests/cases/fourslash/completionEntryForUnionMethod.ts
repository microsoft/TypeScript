///<reference path="fourslash.ts" />

////var y: Array<string>|Array<number>;
////y.map/**/(

const text = "(property) Array<T>.map: (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[]) | (<U>(callbackfn: (value: number, index: number, array: number[]) => U, thisArg?: any) => U[])";
const documentation = "Calls a defined callback function on each element of an array, and returns an array that contains the results.";

verify.quickInfoAt("", text, documentation);
verify.completions({
    marker: "",
    includes: {
        name: "map",
        text,
        documentation,
        tags: [
            { name: "param", text: "callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array." },
            { name: "param", text: "thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value." }
        ],
    },
});
