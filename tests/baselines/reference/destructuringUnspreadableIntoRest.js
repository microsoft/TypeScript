//// [tests/cases/compiler/destructuringUnspreadableIntoRest.ts] ////

//// [destructuringUnspreadableIntoRest.ts]
class A {
    constructor(
        public publicProp: string,
        private privateProp: string,
        protected protectedProp: string,
    ) {}

    get getter(): number {
        return 1;
    }

    set setter(_v: number) {}

    method() {
        const {                 ...rest1 } = this;
        const {                 ...rest2 } = this as A;
        const { publicProp: _1, ...rest3 } = this;
        const { publicProp: _2, ...rest4 } = this as A;

        rest1.publicProp;
        rest2.publicProp;
        rest3.publicProp;
        rest4.publicProp;

        rest1.privateProp;
        rest2.privateProp;
        rest3.privateProp;
        rest4.privateProp;

        rest1.protectedProp;
        rest2.protectedProp;
        rest3.protectedProp;
        rest4.protectedProp;

        rest1.getter;
        rest2.getter;
        rest3.getter;
        rest4.getter;

        rest1.setter;
        rest2.setter;
        rest3.setter;
        rest4.setter;

        rest1.method;
        rest2.method;
        rest3.method;
        rest4.method;
    }
}

function destructure<T extends A>(x: T) {
    const {                 ...rest1 } = x;
    const {                 ...rest2 } = x as A;
    const { publicProp: _1, ...rest3 } = x;
    const { publicProp: _2, ...rest4 } = x as A;

    rest1.publicProp;
    rest2.publicProp;
    rest3.publicProp;
    rest4.publicProp;

    rest1.privateProp;
    rest2.privateProp;
    rest3.privateProp;
    rest4.privateProp;

    rest1.protectedProp;
    rest2.protectedProp;
    rest3.protectedProp;
    rest4.protectedProp;

    rest1.getter;
    rest2.getter;
    rest3.getter;
    rest4.getter;

    rest1.setter;
    rest2.setter;
    rest3.setter;
    rest4.setter;

    rest1.method;
    rest2.method;
    rest3.method;
    rest4.method;
}


//// [destructuringUnspreadableIntoRest.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
class A {
    constructor(publicProp, privateProp, protectedProp) {
        this.publicProp = publicProp;
        this.privateProp = privateProp;
        this.protectedProp = protectedProp;
    }
    get getter() {
        return 1;
    }
    set setter(_v) { }
    method() {
        const rest1 = __rest(this, []);
        const rest2 = __rest(this, []);
        const _a = this, { publicProp: _1 } = _a, rest3 = __rest(_a, ["publicProp"]);
        const _b = this, { publicProp: _2 } = _b, rest4 = __rest(_b, ["publicProp"]);
        rest1.publicProp;
        rest2.publicProp;
        rest3.publicProp;
        rest4.publicProp;
        rest1.privateProp;
        rest2.privateProp;
        rest3.privateProp;
        rest4.privateProp;
        rest1.protectedProp;
        rest2.protectedProp;
        rest3.protectedProp;
        rest4.protectedProp;
        rest1.getter;
        rest2.getter;
        rest3.getter;
        rest4.getter;
        rest1.setter;
        rest2.setter;
        rest3.setter;
        rest4.setter;
        rest1.method;
        rest2.method;
        rest3.method;
        rest4.method;
    }
}
function destructure(x) {
    const rest1 = __rest(x, []);
    const rest2 = __rest(x, []);
    const { publicProp: _1 } = x, rest3 = __rest(x, ["publicProp"]);
    const _a = x, { publicProp: _2 } = _a, rest4 = __rest(_a, ["publicProp"]);
    rest1.publicProp;
    rest2.publicProp;
    rest3.publicProp;
    rest4.publicProp;
    rest1.privateProp;
    rest2.privateProp;
    rest3.privateProp;
    rest4.privateProp;
    rest1.protectedProp;
    rest2.protectedProp;
    rest3.protectedProp;
    rest4.protectedProp;
    rest1.getter;
    rest2.getter;
    rest3.getter;
    rest4.getter;
    rest1.setter;
    rest2.setter;
    rest3.setter;
    rest4.setter;
    rest1.method;
    rest2.method;
    rest3.method;
    rest4.method;
}
