/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true

//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
//// interface ClickableProps {
////     children?: string;
////     className?: string;
//// }
//// interface ButtonProps extends ClickableProps {
////     onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
//// }
//// interface LinkProps extends ClickableProps {
////     goTo: string;
//// }
//// declare function MainButton(buttonProps: ButtonProps): JSX.Element;
//// declare function MainButton(linkProps: LinkProps): JSX.Element;
//// declare function MainButton(props: ButtonProps | LinkProps): JSX.Element;
//// let opt = <MainButton /*1*/ />;
//// let opt = <MainButton children="chidlren" /*2*/ />;
//// let opt = <MainButton onClick={()=>{}} /*3*/ />;
//// let opt = <MainButton onClick={()=>{}} ignore-prop /*4*/ />;
//// let opt = <MainButton goTo="goTo" /*5*/ />;
//// let opt = <MainButton wrong /*6*/ />;

verify.completions(
    {
        marker: ["1", "6"],
        exact: [
          "goTo",
          "onClick",
          { name: "children", kind: "property", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
          { name: "className", kind: "property", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
        ]
    },
    {
      marker: "2",
      exact: [
        "goTo",
        "onClick",
        { name: "className", kind: "property", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
      ]
    },
    {
      marker: ["3", "4", "5"],
      exact: [
        { name: "children", kind: "property", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
        { name: "className", kind: "property", kindModifiers: "optional", sortText: completion.SortText.OptionalMember },
      ]
    },
);
