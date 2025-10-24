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
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MyComponent = void 0;
    class MyComponent {
        render() {
        }
    }
    exports.MyComponent = MyComponent;
    // Should be an error
    <MyComponent bar='world'/>;
    // Should be OK
    <MyComponent bar={true}/>;
    // Should be ok
    <MyComponent data-bar='hello'/>;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MyComponent = void 0;
    var MyComponent = /** @class */ (function () {
        function MyComponent() {
        }
        MyComponent.prototype.render = function () {
        };
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
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComponent = void 0;
var MyComponent = /** @class */ (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () {
    };
    return MyComponent;
}());
exports.MyComponent = MyComponent;
// Should be an error
<MyComponent bar='world'/>;
// Should be OK
<MyComponent bar={true}/>;
// Should be ok
<MyComponent data-bar='hello'/>;
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
