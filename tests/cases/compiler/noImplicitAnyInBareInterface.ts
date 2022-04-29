//@noImplicitAny: true

interface Entry {
    // Should return error for implicit any on `new` and `foo`.
    new ();
    few() : any;
    foo();
}