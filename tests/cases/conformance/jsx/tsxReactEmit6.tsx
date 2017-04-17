//@jsx: react
//@module: commonjs

//@filename: file.tsx
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//@filename: react-consumer.tsx
namespace M {
	export var React: any;
}

namespace M {
	// Should emit M.React.createElement
	//  and M.React.__spread
	var foo: any;
	var spread1 = <div x='' {...foo} y='' />;

	// Quotes
	var x = <div>This "quote" thing</div>;
}

