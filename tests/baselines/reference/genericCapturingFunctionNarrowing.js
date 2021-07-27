//// [genericCapturingFunctionNarrowing.ts]
function needsToNarrowTheType<First extends { foo: string }, Second extends { bar: string }>(thing: First | Second) {
    if (hasAFoo(thing)) {
        console.log(thing.foo);
    }
    else {
        // I would expect this to work because the type should be narrowed in this branch to `Second`
        console.log(thing.bar); // Error: Property 'bar' does not exist on type 'First | Second'.
    }

    function hasAFoo(value: First | Second): value is First {
        return "foo" in value;
    }
}

//// [genericCapturingFunctionNarrowing.js]
function needsToNarrowTheType(thing) {
    if (hasAFoo(thing)) {
        console.log(thing.foo);
    }
    else {
        // I would expect this to work because the type should be narrowed in this branch to `Second`
        console.log(thing.bar); // Error: Property 'bar' does not exist on type 'First | Second'.
    }
    function hasAFoo(value) {
        return "foo" in value;
    }
}
