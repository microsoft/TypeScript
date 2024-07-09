/// <reference path="fourslash.ts" />

// @Filename: ./declarations.d.ts
//// interface Response {}

// @Filename: foo.ts
//// import './declarations.d.ts'
//// declare const resp: Response
//// resp.test()

goTo.file('foo.ts')

verify.codeFixAvailable([
    { description: "Declare method 'test'" },
    { description: "Declare property 'test'" },
    { description: "Add index signature for property 'test'" }
])
