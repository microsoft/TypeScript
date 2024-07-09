//@jsx: preserve
//@module: amd

//@filename: react.d.ts
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

//@filename: file.tsx
export class MyComponent {  
  render() {
  }

  props: { foo: string; }
}

<MyComponent foo="bar" />; // ok  
<MyComponent foo={0} />; // should be an error
