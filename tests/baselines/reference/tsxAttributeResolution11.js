//// [tests/cases/conformance/jsx/tsxAttributeResolution11.tsx] ////

//// [react.d.ts]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
	}
	interface ElementAttributesProperty {
		props;
	}
	interface IntrinsicAttributes {
		ref?: string;
	}
}

//// [file.tsx]
class MyComponent {  
  render() {
  }

  props: {
	  ref?: string;
  }
}

// Should be an OK
var x = <MyComponent bar='world' />;



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
var MyComponent = (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () {
    };
    __names(MyComponent.prototype, ["render"]);
    return MyComponent;
}());
// Should be an OK
var x = <MyComponent bar='world'/>;
