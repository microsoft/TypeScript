class C {
    static "foo" = 0;
    static 0 = 1;

    x = C['foo'];
    x2 = C['0'];
    x3 = C[0];
        
    static s = C['foo'];
    static s2 = C['0'];
    static s3 = C[0];
}