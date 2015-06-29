var p;
/*
var selfClosed1 = <div />;
var selfClosed2 = <div x="1" />;
var selfClosed3 = <div x='1' />;
var selfClosed4 = <div x="1" y='0' />;
var selfClosed5 = <div x={0} y='0' />;
var selfClosed6 = <div x={"1"} y='0' />;
var selfClosed7 = <div x={p} y='p' />;

var openClosed1 = <div></div>;
var openClosed2 = <div n='m'>foo</div>;
var openClosed3 = <div n='m'>{p}</div>;
var openClosed4 = <div n='m'>{p < p}</div>;
var openClosed5 = <div n='m'>{p > p}</div>;
*/
var SomeClass = (function () {
    function SomeClass() {
    }
    SomeClass.prototype.f = function () {
        var _this = this;
        var rewrites1 = <div>{function () { return _this; }}</div>;
        var rewrites4 = <div a={function () { return _this; }}></div>;
    };
    return SomeClass;
})();
/*
var q = () => this;
var rewrites2 = <div>{[p, ...p, p]}</div>;
var rewrites3 = <div>{{p}}</div>;

var rewrites5 = <div a={[p, ...p, p]}></div>;
var rewrites6 = <div a={{p}}></div>;
*/
