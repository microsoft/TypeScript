//// [logicalAssignment4.ts]
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
    results ??= [];
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

//// [logicalAssignment4.js]
"use strict";
function foo1(results) {
    (results ||= []).push(100);
}
function foo2(results) {
    (results ??= []).push(100);
}
function foo3(results) {
    results ||= [];
    results.push(100);
}
function foo4(results) {
    results ??= [];
    results.push(100);
}
function doSomethingWithAlias(thing) {
    if (thing &&= thing.original) {
        console.log(thing.name);
    }
}
