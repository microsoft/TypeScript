// @noImplicitThis: true

class Test {
    data = {};
    constructor() {
        var copy: typeof this.data = {};
    }
}

class Test1 {
    data = { foo: '' };
    ['this'] = '';
    constructor() {
        var copy: typeof this.data = { foo: '' };

        var self: typeof this = this;
        self.data;

        var str: typeof this.this = '';
    }
}


function Test2() {
    let x: typeof this.no = 1;
}

function Test3(this: { no: number }) {
    let x: typeof this.no = 1;
}

function Test4(this: { no: number } | undefined) {
    let x: typeof this.no = 1;
}

class Test5 {
    no = 1;

    f = () => {
        // should not capture this.
        let x: typeof this.no = 1;
    }
}

namespace Test6 {
    export let f = () => {
        let x: typeof this.no = 1;
    }
}

module Test7 {
    export let f = () => {
        let x: typeof this.no = 1;
    }
}

const Test8 = () => {
    let x: typeof this.no = 1;
}

class Test9 {
    no = 0;
    this = 0;

    f() {
        if (this instanceof Test9D1) {
            const d1: typeof this = this;
            d1.f1();
        }

        if (this instanceof Test9D2) {
            const d2: typeof this = this;
            d2.f2();
        }
    }

    g() {
        if (this.no === 1) {
            const no: typeof this.no = this.no;
        }

        if (this.this === 1) {
            const no: typeof this.this = this.this;
        }
    }
}

class Test9D1 {
    f1() {}
}

class Test9D2 {
    f2() {}
}