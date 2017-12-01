//// [noImplicitAnyReferencingDeclaredInterface.ts]
interface Entry {
    // Should return error for implicit any.
    new ();
}

declare var x: Entry;

//// [noImplicitAnyReferencingDeclaredInterface.js]
