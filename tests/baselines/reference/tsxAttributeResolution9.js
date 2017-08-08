//// [tests/cases/conformance/jsx/tsxAttributeResolution9.tsx] ////

//// [react.d.ts]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
	}
	interface ElementAttributesProperty {
		props;
	}
}

interface Props {  
  foo: string;
}

//// [file.tsx]
export class MyComponent {  
  render() {
  }

  props: { foo: string; }
}

<MyComponent foo="bar" />; // ok  
<MyComponent foo={0} />; // should be an error


//// [file.jsx]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MyComponent = (function () {
        function MyComponent() {
        }
        MyComponent.prototype.render = function () {
        };
        __names(MyComponent.prototype, ["render"]);
        return MyComponent;
    }());
    exports.MyComponent = MyComponent;
    <MyComponent foo="bar"/>; // ok  
    <MyComponent foo={0}/>; // should be an error
});
