/// <reference path='fourslash.ts' />

//// 
//// var clear =
//// {
////     outerKey:
////     {
////         innerKey: 1,
////         innerKey2:
////             2
////     }
//// };
//// 

format.document();
verify.currentFileContentIs(
`
var clear =
{
    outerKey:
    {
        innerKey: 1,
        innerKey2:
            2
    }
};
`
);

format.setOption("indentMultiLineObjectLiteralBeginningOnBlankLine", true);
format.document();
verify.currentFileContentIs(
`
var clear =
    {
        outerKey:
            {
                innerKey: 1,
                innerKey2:
                    2
            }
    };
`
);
