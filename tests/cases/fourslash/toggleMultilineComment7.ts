// Cases where the cursor is inside JSX like sintax but it's actually js.

//@Filename: file.tsx
//// const a = (
////     [|<div>
////         some text|]
////     </div>
//// );
//// const b = <MyComponent foo={1 [|+ 2 + 3 + 4|]} />;
//// const c = <MyComponent message={[|'hello world'|]} />;
//// const d = <MyTextBox autocomplete={tr[|ue|]} />;
//// const e = <MyCo[|mponent message={'hello world'} />;|]
//// const f = [
////     [|<li key="A">First item</li>,
////     <li key="B">Second item</li>,|]
////     <li key="C">Third item</li>,
//// ];

verify.toggleMultilineComment(
    `const a = (
    /*<div>
        some text*/
    </div>
);
const b = <MyComponent foo={1 /*+ 2 + 3 + 4*/} />;
const c = <MyComponent message={/*'hello world'*/} />;
const d = <MyTextBox autocomplete={tr/*ue*/} />;
const e = <MyCo/*mponent message={'hello world'} />;*/
const f = [
    /*<li key="A">First item</li>,
    <li key="B">Second item</li>,*/
    <li key="C">Third item</li>,
];`);