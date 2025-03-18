//// [tests/cases/compiler/privateNameJsx.tsx] ////

//// [privateNameJsx.tsx]
class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}



//// [privateNameJsx.jsx]
class Test {
    #prop = () => <div />;
    render() {
        return <this. />;
    }
}
