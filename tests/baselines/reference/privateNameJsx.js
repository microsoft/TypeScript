//// [privateNameJsx.tsx]
class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}



//// [privateNameJsx.jsx]
var _Test_prop;
var Test = /** @class */ (function () {
    function Test() {
        _Test_prop.set(this, function () { return <div />; });
    }
    Test.prototype.render = function () {
        return <this. />;
    };
    return Test;
}());
_Test_prop = new WeakMap();
