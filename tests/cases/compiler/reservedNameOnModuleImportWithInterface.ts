declare namespace test {
    interface mi_string { }
    namespace mi_string { }

    // Should error; imports both a type and a module, which means it conflicts with the 'string' type.
    import string = mi_string;
}
