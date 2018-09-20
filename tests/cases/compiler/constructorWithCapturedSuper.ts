let oneA: A;

class A {
    constructor() {
        return oneA;
    }
}

class B extends A {
    constructor(x: number) {
        super();
        if (x === 1) {
            return;
        }
        while (x < 2) {
            return;
        }
        try {
            return
        }
        catch (e) {
            return;
        }
        finally {
            return;
        }
    }
}

class C extends A {
    constructor(x: number) {
        super();
        for (let i = 0; i < 10; ++i) {
            () => i + x;
            if (x === 1) {
                return;
            } 
        }
    }
}

class D extends A {
    constructor(x: number) {
        super();
        () => {
            return;
        }
        function foo() {
            return;
        }
    }
}