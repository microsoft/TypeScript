//@strictNullChecks: true
//@target: ES5
class A {
   a(): string | null {
        if (Math.random() > 0.5) {
            return '';
        }

        // it does error here as expected
    }
}
class B {
    get a(): string | null {
        if (Math.random() > 0.5) {
            return '';
        }

        // it should error here because it returns undefined
    }
}
class C {
    get a() {
        if (Math.random() > 0.5) {
            return 0;
        }

        // it should error here because it returns undefined
    }

    set a(value: number) {
    }
}