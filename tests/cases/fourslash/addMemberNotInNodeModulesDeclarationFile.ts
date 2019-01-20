/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/declarations.d.ts
//// interface Response {}

// @Filename: foo.ts
//// import '/node_modules/foo/declarations.d.ts'
//// declare const resp: Response
//// resp.test()

goTo.file('foo.ts')

verify.not.codeFixAvailable()
