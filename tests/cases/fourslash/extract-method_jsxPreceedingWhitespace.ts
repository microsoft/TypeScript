/// <reference path='fourslash.ts' />

// Repro https://github.com/Microsoft/TypeScript/issues/42829

// @jsx: preserve
// @filename: a.tsx
////export default function ComponentThatExhibitsIssue() {
////    return <div>
////  /*a*/    <div className="some-nested-data">
////        hello from my nested component
////      </div>
////  
////        /*b*/
////    </div>

goTo.file("a.tsx");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in module scope",
    newContent:
`export default function ComponentThatExhibitsIssue() {
    return <div>
      {newFunction()}
  
        
    </div>

function /*RENAME*/newFunction() {
        return <div className="some-nested-data">
            hello from my nested component
        </div>;
    }
`
});
