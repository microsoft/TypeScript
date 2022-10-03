//// [tests/cases/conformance/jsx/tsxAttributeResolution14.tsx] ////

//// [react.d.ts]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
        div: any;
	}
    interface ElementAttributesProperty { prop: any }
}

//// [file.tsx]
interface IProps {
  primaryText: string,
  [propName: string]: string | number
}

function VerticalNavMenuItem(prop: IProps) {
  return <div>props.primaryText</div>
}

function VerticalNav() {
  return (
    <div>
      <VerticalNavMenuItem primaryText={2} />  // error
      <VerticalNavMenuItem justRandomProp={2} primaryText={"hello"} />  // ok
      <VerticalNavMenuItem justRandomProp1={true} primaryText={"hello"} />  // error
    </div>
  )
} 

//// [file.jsx]
function VerticalNavMenuItem(prop) {
    return <div>props.primaryText</div>;
}
function VerticalNav() {
    return (<div>
      <VerticalNavMenuItem primaryText={2}/> // error
      // error
      <VerticalNavMenuItem justRandomProp={2} primaryText={"hello"}/> // ok
      // ok
      <VerticalNavMenuItem justRandomProp1={true} primaryText={"hello"}/> // error
      // error
    </div>);
}
