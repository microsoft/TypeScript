//// [privateNameJsx.tsx]
class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}



//// [privateNameJsx.jsx]
var _prop;
var Test = /** @class */ (function () {
    function Test() {
        _prop.set(this, function () { return <div />; });
    }
    Test.prototype.render = function () {
        return <this. />;
    };
    return Test;
}());
_prop = new WeakMap();
