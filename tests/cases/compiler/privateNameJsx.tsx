// @target: es2015
// @jsx: preserve

class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}

