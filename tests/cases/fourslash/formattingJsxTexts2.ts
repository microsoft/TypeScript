/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// const a = (
////     <div>
////   foo
////           </div>
//// );
//// 
//// const b = (
////     <div>
////   {     foo  }
////           </div>
//// );
//// 
//// const c = (
////     <div>
////     foo
////   {     foobar  }
////   bar
////           </div>
//// );
//// 
//// const d = 
////     <div>
////   foo
////           </div>;
//// 
//// const e = 
////     <div>
////   {     foo  }
////           </div>
//// 
//// const f = 
////     <div>
////     foo
////   {     foobar  }
////   bar
////           </div>

format.document();

verify.currentFileContentIs(
`const a = (
    <div>
        foo
    </div>
);

const b = (
    <div>
        {foo}
    </div>
);

const c = (
    <div>
        foo
        {foobar}
        bar
    </div>
);

const d =
    <div>
        foo
    </div>;

const e =
    <div>
        {foo}
    </div>

const f =
    <div>
        foo
        {foobar}
        bar
    </div>`);