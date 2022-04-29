//// [noImplicitAnyForwardReferencedInterface.ts]
declare var x: Entry;

interface Entry {
    // Should return error for implicit any.
    new ();
}

//// [noImplicitAnyForwardReferencedInterface.js]
