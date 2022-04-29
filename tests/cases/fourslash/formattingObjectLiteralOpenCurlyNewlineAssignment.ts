/// <reference path='fourslash.ts' />

////
//// var obj = {};
//// obj =
//// {
////     prop: 3
//// };
////  
//// var obj2 = obj ||
//// {
////     prop: 0
//// }
////

format.document();
verify.currentFileContentIs(
`
var obj = {};
obj =
{
    prop: 3
};

var obj2 = obj ||
{
    prop: 0
}
`
);

format.setOption("indentMultiLineObjectLiteralBeginningOnBlankLine", true);
format.document();
verify.currentFileContentIs(
`
var obj = {};
obj =
    {
        prop: 3
    };

var obj2 = obj ||
    {
        prop: 0
    }
`
);