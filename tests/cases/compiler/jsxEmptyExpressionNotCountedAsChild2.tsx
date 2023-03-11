// @strict: true
// @noEmit: true
// @jsx: preserve

// repro from #38108

export {}

declare global {
    namespace JSX {
        type Element = any;
        interface ElementAttributesProperty {
            __properties__: {};
        }
        interface IntrinsicElements {
            [key: string]: string;
        }
        interface ElementChildrenAttribute {
            __children__: {};
        }
    }
}

interface MockComponentInterface {
	new (): {
        __properties__: { bar?: number } & { __children__: () => number };
	};
}

declare const MockComponent: MockComponentInterface;

<MockComponent>{}</MockComponent>; // error
