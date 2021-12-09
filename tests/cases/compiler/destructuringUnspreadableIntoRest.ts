class A {
    constructor(public normal: string) {}

    get getter(): number {
        return 1;
    }

    set setter(_v: number) {}

    method() {
        const {           ...rest1 } = this;
        const {           ...rest2 } = this as A;
        const { normal: _1, ...rest3 } = this;
        const { normal: _2, ...rest4 } = this as A;

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
    const {           ...rest1 } = x;
    const {           ...rest2 } = x as A;
    const { normal: _1, ...rest3 } = x;
    const { normal: _2, ...rest4 } = x as A;

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
