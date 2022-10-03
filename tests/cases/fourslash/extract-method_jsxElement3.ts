/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: a.tsx
////declare var React: any;
////class Foo extends React.Component<{}, {}> {
////    render() {
////        return (
////            <div>
////                /*a*/<span></span>/*b*/
////            </div>
////        );
////    }
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to method in class 'Foo'",
    newContent:
`declare var React: any;
class Foo extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                {this./*RENAME*/newMethod()}
            </div>
        );
    }

    private newMethod() {
        return <span></span>;
    }
}`
});
