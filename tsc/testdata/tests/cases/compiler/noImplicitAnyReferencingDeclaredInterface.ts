// @target: es2015
//@noImplicitAny: true

interface Entry {
    // Should return error for implicit any.
    new ();
}

declare var x: Entry;