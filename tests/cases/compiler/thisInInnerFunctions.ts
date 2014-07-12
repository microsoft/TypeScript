class Foo {
    x = "hello";
    bar() {
        function inner() {
            this.y = "hi"; // 'this' should be not type to 'Foo' either
            var f = () => this.y;  // 'this' should be not type to 'Foo' either
        }
    }
}

function test() {
    var x = () => {
        (() => this)();
        this;
    };
}
