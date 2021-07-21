//// [jsdocAbstract3.js]
class Foo {
    /** @abstract */
    m1() {}

    /** @abstract */
    static m2() {}

    /** @abstract */
    p1;

    /** @abstract */
    get p2() {}

    /** @abstract */
    set p2(value) {}
}


//// [jsdocAbstract3.js]
class Foo {
    /** @abstract */
    m1() { }
    /** @abstract */
    static m2() { }
    /** @abstract */
    p1;
    /** @abstract */
    get p2() { }
    /** @abstract */
    set p2(value) { }
}


//// [jsdocAbstract3.d.ts]
declare class Foo {
    /** @abstract */
    abstract static m2(): void;
    /** @abstract */
    abstract m1(): void;
    /** @abstract */
    abstract p1: any;
    /** @abstract */
    abstract set p2(arg: void);
    /** @abstract */
    abstract get p2(): void;
}


//// [DtsFileErrors]


out/jsdocAbstract3.d.ts(3,5): error TS1244: Abstract methods can only appear within an abstract class.
out/jsdocAbstract3.d.ts(5,5): error TS1244: Abstract methods can only appear within an abstract class.
out/jsdocAbstract3.d.ts(7,5): error TS1244: Abstract methods can only appear within an abstract class.
out/jsdocAbstract3.d.ts(9,5): error TS1244: Abstract methods can only appear within an abstract class.
out/jsdocAbstract3.d.ts(11,5): error TS1244: Abstract methods can only appear within an abstract class.


==== out/jsdocAbstract3.d.ts (5 errors) ====
    declare class Foo {
        /** @abstract */
        abstract static m2(): void;
        ~~~~~~~~
!!! error TS1244: Abstract methods can only appear within an abstract class.
        /** @abstract */
        abstract m1(): void;
        ~~~~~~~~
!!! error TS1244: Abstract methods can only appear within an abstract class.
        /** @abstract */
        abstract p1: any;
        ~~~~~~~~
!!! error TS1244: Abstract methods can only appear within an abstract class.
        /** @abstract */
        abstract set p2(arg: void);
        ~~~~~~~~
!!! error TS1244: Abstract methods can only appear within an abstract class.
        /** @abstract */
        abstract get p2(): void;
        ~~~~~~~~
!!! error TS1244: Abstract methods can only appear within an abstract class.
    }
    