// @target: esnext
// @useDefineForClassFields: false

// Auto-accessors do not use Set semantics themselves, so do not need to be transformed if there are no other
// initializers that need to be transformed:
class C1 {
    accessor x = 1;
}

// If there are other field initializers to transform, we must transform auto-accessors so that we can preserve
// initialization order:
class C2 {
    x = 1;
    accessor y = 2;
    z = 3;
}

// Private field initializers also do not use Set semantics, so they do not force an auto-accessor transformation:
class C3 {
    #x = 1;
    accessor y = 2;
}

// However, we still need to hoist private field initializers to the constructor if we need to preserve initialization
// order:
class C4 {
    x = 1;
    #y = 2;
    z = 3;
}

class C5 {
    #x = 1;
    accessor y = 2;
    z = 3;
}

// Static accessors aren't affected:
class C6 {
    static accessor x = 1;
}

// Static accessors aren't affected:
class C7 {
    static x = 1;
    static accessor y = 2;
    static z = 3;
}
