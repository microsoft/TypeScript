//@filename: file.tsx
//@jsx: preserve
//@noImplicitAny: true
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { props: {} }
	interface IntrinsicElements { 
		div: any;
		h2: any;
		h1: any;
	}
}

class Button {
	props: {}
    render() {
        return (<div>My Button</div>)
    }
}

// OK
let k1 = <div> <h2> Hello </h2> <h1> world </h1></div>;
let k2 = <div> <h2> Hello </h2> {(user: any) => <h2>{user.name}</h2>}</div>;
let k3 = <div> {1} {"That is a number"} </div>;
let k4 = <Button> <h2> Hello </h2> </Button>;