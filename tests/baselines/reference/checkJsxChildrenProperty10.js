//// [file.tsx]
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { props: {} }
	interface IntrinsicElements { 
		div: any;
		h2: any;
		h1: any;
	}
}

class Button {
	props: {}
    render() {
        return (<div>My Button</div>)
    }
}

// OK
let k1 = <div> <h2> Hello </h2> <h1> world </h1></div>;
let k2 = <div> <h2> Hello </h2> {(user: any) => <h2>{user.name}</h2>}</div>;
let k3 = <div> {1} {"That is a number"} </div>;
let k4 = <Button> <h2> Hello </h2> </Button>;

//// [file.jsx]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Button = (function () {
    function Button() {
    }
    Button.prototype.render = function () {
        return (<div>My Button</div>);
    };
    __names(Button.prototype, ["render"]);
    return Button;
}());
// OK
var k1 = <div> <h2> Hello </h2> <h1> world </h1></div>;
var k2 = <div> <h2> Hello </h2> {function (user) { return <h2>{user.name}</h2>; }}</div>;
var k3 = <div> {1} {"That is a number"} </div>;
var k4 = <Button> <h2> Hello </h2> </Button>;
