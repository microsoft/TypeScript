// @strict: true

// Test 1: Original issue - this === subclass instance should work
class AA {
    do1() {
        const b = dd.getB();
        if (this === b) {  // Should not error
            console.log("this === b");
        }
    }
}

class BB extends AA {
    getB(): BB { return this; }
}

let dd = new BB();
dd.do1();

// Test 2: this === unrelated class should still error
class CC {
    value: number = 42;
}

class DD {
    test() {
        const c = new CC();
        if (this === c) {  // Should still error - no relationship
            console.log("unrelated");
        }
    }
}

// Test 3: Multiple inheritance levels
class EE extends BB {
    getE(): EE { return this; }
}

class FF extends EE {
    testMultiLevel() {
        const e = new EE();
        if (this === e) {  // Should not error - FF extends EE
            console.log("multi-level inheritance");
        }
    }
}

// Test 4: Interface implementation
interface ITest {
    getValue(): number;
}

class GG implements ITest {
    getValue() { return 42; }
    
    testInterface() {
        const impl: ITest = new GG();
        if (this === impl) {  // Should not error
            console.log("interface implementation");
        }
    }
}