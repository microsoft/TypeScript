//// [tests/cases/conformance/jsx/tsxReactEmit1.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

var p;
var selfClosed1 = <div />;
var selfClosed2 = <div x="1" />;
var selfClosed3 = <div x='1' />;
var selfClosed4 = <div x="1" y='0' />;
var selfClosed5 = <div x={0} y='0' />;
var selfClosed6 = <div x={"1"} y='0' />;
var selfClosed7 = <div x={p} y='p' b />;

var openClosed1 = <div></div>;
var openClosed2 = <div n='m'>foo</div>;
var openClosed3 = <div n='m'>{p}</div>;
var openClosed4 = <div n='m'>{p < p}</div>;
var openClosed5 = <div n='m' b>{p > p}</div>;

class SomeClass {
	f() {
		var rewrites1 = <div>{() => this}</div>;
		var rewrites2 = <div>{[p, ...p, p]}</div>;
		var rewrites3 = <div>{{p}}</div>;

		var rewrites4 = <div a={() => this}></div>;
		var rewrites5 = <div a={[p, ...p, p]}></div>;
		var rewrites6 = <div a={{p}}></div>;
	}
}

var whitespace1 = <div>      </div>;
var whitespace2 = <div>  {p}    </div>;
var whitespace3 = <div>  
      {p}    
      </div>;


//// [file.js]
var p;
var selfClosed1 = React.createElement("div", null);
var selfClosed2 = React.createElement("div", { x: "1" });
var selfClosed3 = React.createElement("div", { x: '1' });
var selfClosed4 = React.createElement("div", { x: "1", y: '0' });
var selfClosed5 = React.createElement("div", { x: 0, y: '0' });
var selfClosed6 = React.createElement("div", { x: "1", y: '0' });
var selfClosed7 = React.createElement("div", { x: p, y: 'p', b: true });
var openClosed1 = React.createElement("div", null);
var openClosed2 = React.createElement("div", { n: 'm' }, "foo");
var openClosed3 = React.createElement("div", { n: 'm' }, p);
var openClosed4 = React.createElement("div", { n: 'm' }, p < p);
var openClosed5 = React.createElement("div", { n: 'm', b: true }, p > p);
class SomeClass {
    f() {
        var rewrites1 = React.createElement("div", null, () => this);
        var rewrites2 = React.createElement("div", null, [p, ...p, p]);
        var rewrites3 = React.createElement("div", null, { p });
        var rewrites4 = React.createElement("div", { a: () => this });
        var rewrites5 = React.createElement("div", { a: [p, ...p, p] });
        var rewrites6 = React.createElement("div", { a: { p } });
    }
}
var whitespace1 = React.createElement("div", null, "      ");
var whitespace2 = React.createElement("div", null,
    "  ",
    p,
    "    ");
var whitespace3 = React.createElement("div", null, p);
