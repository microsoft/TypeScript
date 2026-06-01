// @noImplicitAny: true

// Repro from #62552: static fields in class expressions passed to generic functions
// should not incorrectly report TS7022 (implicitly has type 'any' because it does
// not have a type annotation and is referenced directly or indirectly in its own initializer)

function id<T>(x: T): T {
    return x;
}

// Should not error (was incorrectly reporting TS7022 on 'foo')
const Foo = id(class {
    static readonly foo = id(42);
});

// Confirm the inferred type is correct
const Foo2 = id(class {
    static count = 0;
    static name2 = "test";
});

// Variants with multiple static fields
const Foo3 = id(class {
    static a = 1;
    static b = "hello";
    static c = true;
});

// No error without generic wrapper
const Ok = class {
    static readonly foo = id(42);
};

// Static field referencing another static field of the same class (real circularity, should still error)
// (This is a true self-reference, not the false positive from #62552)
