// @target: esnext, es6, es5
// @useDefineForClassFields: false
// @experimentalDecorators: true

declare const foo: any;

@foo
class C {
    static a = 1;
    static b = this.a + 1;
}

const classComputedName = "classComputedName"

const D = class extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1 }
    static [classComputedName] = 1;
    static foo() {
        return this.c + 1;
    }
    static get fa() {
        return this.c + 1;
    }
    static set fa(v: number) {
        this.c = v + 1;
    }
}

function ret() {
    return class extends C {
        static c = 2;
        static d = this.c + 1;
        static e = super.a + this.c + 1;
        static f = () => this.c + 1;
        static ff = function () { this.c + 1 }
        static [classComputedName] = 1;
        static foo() {
            return this.c + 1;
        }
        static get fa() {
            return this.c + 1;
        }
        static set fa(v: number) {
            this.c = v + 1;
        }
    }
}

