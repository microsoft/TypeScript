// When textRange contain multiple lines and ends on a beginning of a line, don't comment/uncomment the last line.

//@Filename: file.tsx
//// [|const a = 0;
//// const b = 1;
//// |]const c = 2;
//// 
//// const d = <div>
////     [|<div>
////         SomeText
//// |]    </div>
//// </div>;
////
//// [|//const e = 0;
//// //const f = 1;
//// |]//const g = 2;
//// 
//// const h = <div>
//// [|{/*<div>*/}
//// {/*    SomeText*/}
//// |]{/*</div>*/}
//// </div>;


verify.toggleLineComment(
    `//const a = 0;
//const b = 1;
const c = 2;

const d = <div>
    {/*<div>*/}
    {/*    SomeText*/}
    </div>
</div>;

const e = 0;
const f = 1;
//const g = 2;

const h = <div>
<div>
    SomeText
{/*</div>*/}
</div>;`);