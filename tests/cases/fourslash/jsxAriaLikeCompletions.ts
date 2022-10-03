/// <reference path="fourslash.ts" />
//@Filename: file.tsx
////declare var React: any;
////declare module JSX {
////    interface Element { }
////    interface IntrinsicElements {
////        div: { "aria-whatever"?: string  }
////    }
////    interface ElementAttributesProperty { props: any }
////}
////const a = <div {...{}} /*1*/></div>;


verify.completions(
    {
        marker: "1",
        exact: [
            {name: "aria-whatever", sortText: completion.SortText.OptionalMember}
        ]
    }
);
