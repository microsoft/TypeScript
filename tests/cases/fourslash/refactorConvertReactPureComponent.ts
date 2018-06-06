/// <reference path='fourslash.ts' />

// @jsx: "react"

//// import * as React from "react"
//// /*start*/class Ele extends React.Component<P> {
////     render() {
////         return <>
////             {this.props.children}
////             <h1 className={this.props.className} />
////         </> 
////     }
//// }/*end*/

goTo.select("start", "end");
edit.applyRefactor({
    refactorName: "Convert React pure component",
    actionName: "Covert React.Component to SFC",
    actionDescription: "Covert React.Component to SFC",
    newContent:
        `import * as React from "react"
const Ele: React.SFC<P> = (props) => {
    return <>
        {props.children}
        <h1 className={props.className} />
    </> 
}
`,
});
