/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// fileName: code.ts
////export const extensions = {
////    /**
////     */
////    fn: <T>(actualValue: T, expectedValue: T) => {
////       return actualValue === expectedValue
////    },
////    fn2: function<T>(actualValue: T, expectedValue: T)  {
////       return actualValue === expectedValue
////    }
////}

verify.codeFixAll({
    fixId: "fixMissingTypeAnnotationOnExports",
    fixAllDescription: ts.Diagnostics.Add_all_missing_type_annotations.message,
    newFileContent:
`export const extensions = {
    /**
     */
    fn: <T>(actualValue: T, expectedValue: T): boolean => {
       return actualValue === expectedValue
    },
    fn2: function<T>(actualValue: T, expectedValue: T): boolean  {
       return actualValue === expectedValue
    }
}`
})
