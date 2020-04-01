// @strict: true
// @target: esnext, es2020, es2015

function foo1(results: number[] | undefined) {
    (results ||= []).push(100);
}

function foo2(results: number[] | undefined) {
    (results ??= []).push(100);
}

function foo3(results: number[] | undefined) {
    results ||= [];
    results.push(100);
}

function foo4(results: number[] | undefined) {
    results ||= [];
    results.push(100);
}

interface ThingWithOriginal {
    name: string;
    original?: ThingWithOriginal
}
function doSomethingWithAlias(thing?: ThingWithOriginal | undefined) {
    if (thing &&= thing.original) {
        console.log(thing.name);
    }
}