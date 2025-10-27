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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComponent = void 0;
class MyComponent {
    render() {
    }
    props;
}
exports.MyComponent = MyComponent;
<MyComponent foo="bar"/>; // ok  
<MyComponent foo={0}/>; // should be an error
