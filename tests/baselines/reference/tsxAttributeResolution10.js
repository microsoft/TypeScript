//// [tests/cases/conformance/jsx/tsxAttributeResolution10.tsx] ////

//// [react.d.ts]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
	}
	interface ElementAttributesProperty {
		props;
	}
}

//// [file.tsx]
export class MyComponent {  
  render() {
  }

  props: {
  	[s: string]: boolean;
  }
}

// Should be an error
<MyComponent bar='world' />;

// Should be OK
<MyComponent bar={true} />;

// Should be ok
<MyComponent data-bar='hello' />;


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
    // Should be an error
    <MyComponent bar='world'/>;
    // Should be OK
    <MyComponent bar={true}/>;
    // Should be ok
    <MyComponent data-bar='hello'/>;
});
