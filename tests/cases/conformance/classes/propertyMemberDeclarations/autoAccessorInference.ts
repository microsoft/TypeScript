// @target: esnext
// @strict: true
// @noEmit: true

class A {
    accessor value;
    constructor(n: number) {
        this.value = n
        if (n < 0) {
            this.value = null
        }
    }
}

declare var n: number;
class B {
    static accessor value;
    static {
        this.value = n;
        if (n < 0) {
            this.value = null;
        }
    }
}
