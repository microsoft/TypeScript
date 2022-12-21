/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: a.tsx
////declare var React: any;
////class Foo extends React.Component<{}, {}> {
////    render() {
////        return (
////            <div>
////                /*a*/<br />/*b*/
////            </div>
////        );
////    }
////}

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to readonly field in class 'Foo'",
    newContent:
`declare var React: any;
class Foo extends React.Component<{}, {}> {
    private readonly newProperty = <br />;

    render() {
        return (
            <div>
                {this./*RENAME*/newProperty}
            </div>
        );
    }
}`
});
