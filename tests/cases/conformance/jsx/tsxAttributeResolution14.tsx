//@jsx: preserve
//@module: commonjs

//@filename: react.d.ts
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
        div: any;
	}
    interface ElementAttributesProperty { prop: any }
}

//@filename: file.tsx

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