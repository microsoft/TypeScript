//// [privateNameInObjectLiteral-3.ts]
const obj = {
    get #foo() {
        return ""
    }
};


//// [privateNameInObjectLiteral-3.js]
var obj = {
    get () {
        return "";
    }
};
