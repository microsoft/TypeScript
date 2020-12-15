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
declare const v: number
function doSomethingWithAlias(thing: ThingWithOriginal | undefined, defaultValue: ThingWithOriginal | undefined) {
    if (v === 1) {
        if (thing &&= thing.original) {
            thing.name;
        }
    }
    else if (v === 2) {
        if (thing &&= defaultValue) {
            thing.name;
            defaultValue.name
        }
    }
    else if (v === 3) {
        if (thing ||= defaultValue) {
            thing.name;
            defaultValue.name;
        }
    }
    else {
        if (thing ??= defaultValue) {
            thing.name;
            defaultValue.name;
        }
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
function doSomethingWithAlias(thing, defaultValue) {
    if (v === 1) {
        if (thing &&= thing.original) {
            thing.name;
        }
    }
    else if (v === 2) {
        if (thing &&= defaultValue) {
            thing.name;
            defaultValue.name;
        }
    }
    else if (v === 3) {
        if (thing ||= defaultValue) {
            thing.name;
            defaultValue.name;
        }
    }
    else {
        if (thing ??= defaultValue) {
            thing.name;
            defaultValue.name;
        }
    }
}
