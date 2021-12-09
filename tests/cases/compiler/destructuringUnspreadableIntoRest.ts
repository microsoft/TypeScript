//@target: ES6
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
