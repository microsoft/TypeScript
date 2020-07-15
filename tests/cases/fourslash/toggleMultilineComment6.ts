// Jsx uses multiline comments for each line commented.

// Selection is outside of a multiline comments inserts multiline comments instead of removing.
// There's some variations between jsx and js comments depending on the position.

//@Filename: file.tsx
//// const var1 = <div>Tex{/*t1</div>;
//// const var2 = <div>Text2[|</div>;
//// const var3 = <div>Tex*/}t3</div>;|]
////
//// [|const var4 = <div>Tex{/*t4</div>;
//// const var5 = <div|]>Text5</div>;
//// const var6 = <div>Tex*/}t6</div>;
////
//// [|const var7 = <div>Tex{/*t7</div>;
//// const var8 = <div>Text8</div>;
//// const var9 = <div>Tex*/}t9</div>;|]
////
//// const var10 = <div>
////     {/*<div>T[|ext</div>*/}
////     <div>Text</div>
////     {/*<div>Text|]</div>*/}
//// </div>;

verify.toggleMultilineComment(
    `const var1 = <div>Tex{/*t1</div>;
const var2 = <div>Text2*/}{/*</div>;
const var3 = <div>Tex*/}{/*t3</div>;*/}

/*const var4 = <div>Tex{*//*t4</div>;
const var5 = <div*//*>Text5</div>;
const var6 = <div>Tex*/}t6</div>;

/*const var7 = <div>Tex{*//*t7</div>;
const var8 = <div>Text8</div>;
const var9 = <div>Tex*//*}t9</div>;*/

const var10 = <div>
    {/*<div>T*/}{/*ext</div>*/}{/*
    <div>Text</div>
    */}{/*<div>Text*/}{/*</div>*/}
</div>;`
);