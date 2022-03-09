// When indentation is different between lines it should get the left most indentation
// and use that for all lines.
// When uncommeting, doesn't matter what indentation the line has.

//@Filename: file.tsx
//// const a = <div>
////     [|<div>
////         SomeText
////     </div>|]
//// </div>;
////
//// const b = <div>
////     {/*[|<div>*/}
////     {/*    SomeText*/}
////     {/*</div>|]*/}
//// </div>;


verify.toggleLineComment(
    `const a = <div>
    {/*<div>*/}
    {/*    SomeText*/}
    {/*</div>*/}
</div>;

const b = <div>
    <div>
        SomeText
    </div>
</div>;`);