// If at least one line is not commented then comment all lines again.
// TODO: Not sure about this one. The default behavior for line comment is to add en extra
// layer of comments (see toggleLineComment4 test). For jsx this doesn't work right as it's actually
// multiline comment. Figure out what to do.

//@Filename: file.tsx
//// const a = <div>
////     {/*[|<div>*/}
////         SomeText
////     {/*</div>|]*/}
//// </div>;

verify.toggleLineComment(
    `const a = <div>
    {/*<div>*/}
    {/*    SomeText*/}
    {/*</div>*/}
</div>;`);