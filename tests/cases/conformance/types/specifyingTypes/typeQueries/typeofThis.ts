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
        let x: typeof this.no = 1;
        let self: typeof this = this;
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
