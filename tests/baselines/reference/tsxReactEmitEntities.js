//// [tsxReactEmitEntities.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

<div>Dot goes here: &middot; </div>;


//// [tsxReactEmitEntities.js]
React.createElement("div", null, "Dot goes here: · ");
