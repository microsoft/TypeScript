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

// Repro from #45006
const x: string | number = Math.random() < 0.5 ? "str" : 123;
if (typeof x === "string") {
  let obj = {
    get prop() { return x.toUpperCase() },
    method() { return x.toUpperCase() }
  }
}