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
