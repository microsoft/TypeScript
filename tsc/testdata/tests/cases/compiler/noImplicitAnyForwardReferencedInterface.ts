// @target: es2015
//@noImplicitAny: true
declare var x: Entry;

interface Entry {
    // Should return error for implicit any.
    new ();
}