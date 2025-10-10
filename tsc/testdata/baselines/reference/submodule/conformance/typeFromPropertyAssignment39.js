//// [tests/cases/conformance/salsa/typeFromPropertyAssignment39.ts] ////

//// [a.js]
const foo = {};
foo["baz"] = {};
foo["baz"]["blah"] = 3;




//// [a.d.ts]
declare const foo: {
    baz: {
        blah: number;
    };
};
declare namespace foo {
    var baz: {
        blah: number;
    };
}
declare namespace foo {
    var blah: number;
}


//// [DtsFileErrors]


a.d.ts(1,15): error TS2451: Cannot redeclare block-scoped variable 'foo'.
a.d.ts(6,19): error TS2451: Cannot redeclare block-scoped variable 'foo'.
a.d.ts(11,19): error TS2451: Cannot redeclare block-scoped variable 'foo'.


==== a.d.ts (3 errors) ====
    declare const foo: {
                  ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'foo'.
        baz: {
            blah: number;
        };
    };
    declare namespace foo {
                      ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'foo'.
        var baz: {
            blah: number;
        };
    }
    declare namespace foo {
                      ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'foo'.
        var blah: number;
    }
    