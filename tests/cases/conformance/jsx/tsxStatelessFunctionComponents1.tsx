//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { el: any; }
	interface IntrinsicElements { div: any; }
}


function Greet(x: {name: string}) {
	return <div>Hello, {x}</div>;
}
function Meet({name = 'world'}) {
	return <div>Hello, {x}</div>;
}

// OK
let x = <Greet name='world' />;
// Error
let y = <Greet naaame='world' />;
