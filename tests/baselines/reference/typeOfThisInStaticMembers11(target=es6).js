//// [typeOfThisInStaticMembers11.ts]
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



//// [typeOfThisInStaticMembers11.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
let C = class C {
};
C.a = 1;
C.b = (void 0).a + 1;
C = __decorate([
    foo
], C);
const classComputedName = "classComputedName";
const D = (_b = class extends C {
        static foo() {
            return this.c + 1;
        }
        static get fa() {
            return this.c + 1;
        }
        static set fa(v) {
            this.c = v + 1;
        }
    },
    _a = classComputedName,
    _b.c = 2,
    _b.d = _b.c + 1,
    _b.e = C.a + _b.c + 1,
    _b.f = () => _b.c + 1,
    _b.ff = function () { this.c + 1; },
    _b[_a] = 1,
    _b);
function ret() {
    var _b, _c;
    return _c = class extends C {
            static foo() {
                return this.c + 1;
            }
            static get fa() {
                return this.c + 1;
            }
            static set fa(v) {
                this.c = v + 1;
            }
        },
        _b = classComputedName,
        _c.c = 2,
        _c.d = _c.c + 1,
        _c.e = C.a + _c.c + 1,
        _c.f = () => _c.c + 1,
        _c.ff = function () { this.c + 1; },
        _c[_b] = 1,
        _c;
}
