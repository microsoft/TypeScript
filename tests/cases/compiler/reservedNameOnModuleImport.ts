declare namespace test {
    namespace mstring { }

    // Should be fine; this does not clobber any declared values.
    export import string = mstring;
}
