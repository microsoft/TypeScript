/// <reference path="fourslash.ts" />

// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /node_modules/foo/types.d.ts
//// interface Response {}

// @Filename: /node_modules/foo/package.json
//// { "types": "types.d.ts" }

// @Filename: /foo.ts
//// import { Response } from 'foo'
//// declare const resp: Response
//// resp.test()

goTo.file('/foo.ts')

verify.not.codeFixAvailable()
