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
var MyComponent = /** @class */ (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () {
    };
    return MyComponent;
}());
// Should be an OK
var x = <MyComponent bar='world'/>;
