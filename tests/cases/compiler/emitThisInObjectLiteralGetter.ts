// @target: es5
const example = {
    get foo() {
        return item => this.bar(item);
    }
};
