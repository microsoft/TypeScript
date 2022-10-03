//// [tests/cases/conformance/jsx/tsxAttributeResolution12.tsx] ////

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

declare module TestMod {
	interface TestClass extends ComponentClass<{reqd: any}> {
	}
	var Test: TestClass;
}

// Errors correctly
const T = TestMod.Test;
var t1 = <T />;

// Should error
var t2 = <TestMod.Test />;



//// [file.jsx]
// Errors correctly
var T = TestMod.Test;
var t1 = <T />;
// Should error
var t2 = <TestMod.Test />;
