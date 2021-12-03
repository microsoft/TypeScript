/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// let y = { ONE: '' };
//// var x = <div {...y} /**/ />;

verify.completions({
  marker: "",
  exact: [
    { name: "TWO", kind: "JSX attribute", kindModifiers: "declare", sortText: completion.SortText.LocationPriority },
    { name: "ONE", kind: "JSX attribute", kindModifiers: "declare", sortText: completion.SortText.MemberDeclaredBySpreadAssignment },
  ]
});
