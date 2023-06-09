//// [tests/cases/conformance/controlFlow/controlFlowInstanceOfGuardPrimitives.ts] ////

//// [controlFlowInstanceOfGuardPrimitives.ts]
function distinguish(thing: string | number | Date) {
    if (thing instanceof Object) {
        console.log("Aha!! It's a Date in " + thing.getFullYear());
    } else if (typeof thing === 'string') {
        console.log("Aha!! It's a string of length " + thing.length);
    } else {
        console.log("Aha!! It's the number " + thing.toPrecision(3));
    }
}

distinguish(new Date());
distinguish("beef");
distinguish(3.14159265);

//// [controlFlowInstanceOfGuardPrimitives.js]
function distinguish(thing) {
    if (thing instanceof Object) {
        console.log("Aha!! It's a Date in " + thing.getFullYear());
    }
    else if (typeof thing === 'string') {
        console.log("Aha!! It's a string of length " + thing.length);
    }
    else {
        console.log("Aha!! It's the number " + thing.toPrecision(3));
    }
}
distinguish(new Date());
distinguish("beef");
distinguish(3.14159265);
