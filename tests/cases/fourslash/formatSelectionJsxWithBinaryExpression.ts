/// <reference path="fourslash.ts" />

//@Filename: file.tsx
//// function TestWidget() {
////     const test = true;
////     return (
////         <div>
////             {test &&
////                 <div>
////  /*1*/                <div>some text</div>/*2*/
////                     <div>some text</div>
////                     <div>some text</div>
////                 </div>
////             }
////             <div>some text</div>
////         </div>
////     );
//// }

format.selection("1", "2");
verify.currentFileContentIs(
    `function TestWidget() {
    const test = true;
    return (
        <div>
            {test &&
                <div>
                    <div>some text</div>
                    <div>some text</div>
                    <div>some text</div>
                </div>
            }
            <div>some text</div>
        </div>
    );
}`)
