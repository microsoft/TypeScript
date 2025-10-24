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
    <MyComponent foo="bar"/>; // ok  
    <MyComponent foo={0}/>; // should be an error
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
    <MyComponent foo="bar"/>; // ok  
    <MyComponent foo={0}/>; // should be an error
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
<MyComponent foo="bar"/>; // ok  
<MyComponent foo={0}/>; // should be an error
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
