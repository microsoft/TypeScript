//// [unusedPrivateStaticMembers.ts]
class Test1 {
    private static m1() {}
    public static test() {
        Test1.m1();
    }
}

class Test2 {
    private static p1 = 0
    public static test() {
        Test2.p1;
    }
}

class Test3 {
    private static p1 = 0;
    private static m1() {}
}

class Test4 {
    private static m1(n: number): number {
        return (n === 0) ? 1 : (n * Test4.m1(n - 1));
    }

    private static m2(n: number): number {
        return (n === 0) ? 1 : (n * Test4["m2"](n - 1));
    }
}

class Test5 {
    private static m1() {}
    public static test() {
        Test5["m1"]();
    }
}

class Test6 {
    private static p1 = 0;
    public static test() {
        Test6["p1"];
    }
}


//// [unusedPrivateStaticMembers.js]
class Test1 {
    static m1() { }
    static test() {
        Test1.m1();
    }
}
class Test2 {
    static test() {
        Test2.p1;
    }
}
Test2.p1 = 0;
class Test3 {
    static m1() { }
}
Test3.p1 = 0;
class Test4 {
    static m1(n) {
        return (n === 0) ? 1 : (n * Test4.m1(n - 1));
    }
    static m2(n) {
        return (n === 0) ? 1 : (n * Test4["m2"](n - 1));
    }
}
class Test5 {
    static m1() { }
    static test() {
        Test5["m1"]();
    }
}
class Test6 {
    static test() {
        Test6["p1"];
    }
}
Test6.p1 = 0;
