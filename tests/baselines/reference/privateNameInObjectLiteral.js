//// [privateNameInObjectLiteral.ts]
const obj = {
    #foo: "#foo",
    #bar: () => true,
    #baz() {
        return true;
    }
};


//// [privateNameInObjectLiteral.js]
var obj = {
    #foo: "#foo",
    #bar: function () { return true; },
    #baz: function () {
        return true;
    }
};
