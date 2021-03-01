/// <reference path='fourslash.ts' />

// @jsx: react-jsxdev

// @Filename: node_modules/react/index.d.ts
////export declare var React: any;

// @Filename: node_modules/react/package.json
////{
////  "name": "react",
////  "types": "./index.d.ts"
////}

// @Filename: foo.tsx
//// export default function Foo(){
////     return <></>;
//// }

// @Filename: bar.tsx
//// export default function Bar(){
////     return <Foo></Foo>;
//// }

// @Filename: package.json
////{
////  "dependencies": {
////    "react": "*"
////  }
////}

goTo.file('bar.tsx')

verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import Foo from "./foo";

export default function Bar(){
    return <Foo></Foo>;
}`,
});

