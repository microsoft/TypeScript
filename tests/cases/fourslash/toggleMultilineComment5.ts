// Jsx uses block comments for each line commented.

// Common JSX comment scenarios

//@Filename: file.tsx
//// const a = <div tabIndex="0">[|</div>;|]
//// const b = <div>This is [|valid HTML &amp;|] JSX at the same time.</div>;
//// const c = <MyContainer>
////     [|<MyFirstComponent />
////     <MySecondComponent />|]
//// </MyContainer>;
//// const d = <MyContainer>
////     <MyFirstComp[|onent />
////     <MySecondComponent />|]
//// </MyContainer>;
//// const e = <MyComponent>[|{'foo'}|]</MyComponent>;
//// const f = <div>Some text</div[|>;|]
//// const g = <div>Some text<[|/div>;|]

verify.toggleMultilineComment(
    `const a = <div tabIndex="0">{/*</div>;*/}
const b = <div>This is {/*valid HTML &amp;*/} JSX at the same time.</div>;
const c = <MyContainer>
    {/*<MyFirstComponent />
    <MySecondComponent />*/}
</MyContainer>;
const d = <MyContainer>
    <MyFirstComp{/*onent />
    <MySecondComponent />*/}
</MyContainer>;
const e = <MyComponent>{/*{'foo'}*/}</MyComponent>;
const f = <div>Some text</div{/*>;*/}
const g = <div>Some text<{/*/div>;*/}`
);