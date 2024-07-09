/// <reference path='fourslash.ts' />

////type K1 = number | string;
////type T1 = {
////    [K1]: number;
////}
////type K2 = number | string;
////type T2 = {
////    [K2]: number;
////}

verify.codeFixAll({
    fixAllDescription: ts.Diagnostics.Convert_all_type_literals_to_mapped_type.message,
    fixId: 'convertLiteralTypeToMappedType',
    newFileContent:
`type K1 = number | string;
type T1 = {
    [K in K1]: number;
}
type K2 = number | string;
type T2 = {
    [K in K2]: number;
}`
});
