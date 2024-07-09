/// <reference path='fourslash.ts' />

// @jsx: preserve
// @filename: a.tsx
////declare var React: any;
////class Foo extends React.Component<{}, {}> {
////    render() {
////        return (
////            <div>
////                <a href=/*a*/"string"/*b*/></a>;
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
    private readonly newProperty = "string";

    render() {
        return (
            <div>
                <a href={this./*RENAME*/newProperty}></a>;
            </div>
        );
    }
}`
});
