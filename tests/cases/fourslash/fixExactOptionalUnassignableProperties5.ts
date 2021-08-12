/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @Filename: fixExactOptionalUnassignableProperties5.ts
//// interface User {
////     name: string
////     email?: string
//// }
//// declare const user: User
//// user.email = undefined;
verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_undefined_to_optional_property_type.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_undefined_to_optional_property_type.message,
    index: 0,
    newFileContent:
`interface User {
    name: string
    email?: string | undefined
}
declare const user: User
user.email = undefined;`,
});

