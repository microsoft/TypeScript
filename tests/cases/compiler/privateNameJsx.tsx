// @jsx: preserve

class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}

