//// [tests/cases/compiler/privateNameJsx.tsx] ////

//// [privateNameJsx.tsx]
class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}



//// [privateNameJsx.jsx]
var _Test_prop;
class Test {
    constructor() {
        _Test_prop.set(this, () => <div />);
    }
    render() {
        return <this. />;
    }
}
_Test_prop = new WeakMap();
