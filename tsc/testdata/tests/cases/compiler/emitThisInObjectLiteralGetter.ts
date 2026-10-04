// @strict: false
// @target: es5, es2015
const example = {
    get foo() {
        return item => this.bar(item);
    }
};
