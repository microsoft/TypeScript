// @target: es2015
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        #myField = "hello";
        #method() {}
        get #accessor() { return 42; }
        set #accessor(val) { }
    });
}
