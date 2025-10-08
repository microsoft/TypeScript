//@jsx: preserve

//@filename: react.d.ts
declare namespace JSX {
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

//@filename: file.tsx

declare class Component<P, S>  {
	constructor(props?: P, context?: any);
	setState(f: (prevState: S, props: P) => S, callback?: () => any): void;
	setState(state: S, callback?: () => any): void;
	forceUpdate(callBack?: () => any): void;
	render(): JSX.Element;
	props: P;
	state: S;
	context: {};
}


interface ComponentClass<P> {
	new (props?: P, context?: any): Component<P, any>;
}

declare namespace TestMod {
	interface TestClass extends ComponentClass<{reqd: any}> {
	}
	var Test: TestClass;
}

// Errors correctly
const T = TestMod.Test;
var t1 = <T />;

// Should error
var t2 = <TestMod.Test />;

