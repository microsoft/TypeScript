/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////"use strict";
////export class A { }

// @Filename: /b.ts
////"use strict";
////export class B extends A { }

// @Filename: /c.ts
/////*---------------------------------------------------------------------------------------------
//// *  Copyright (c) Microsoft Corporation. All rights reserved.
//// *  Licensed under the MIT License. See License.txt in the project root for license information.
//// *--------------------------------------------------------------------------------------------*/
////"use strict";
////export class B extends A { }

goTo.file("/b.ts");
verify.codeFix({
    description: ignoreInterpolations(ts.Diagnostics.Add_import_from_0),
    newFileContent:
`"use strict";

import { A } from "./a";

export class B extends A { }`,
});

goTo.file("/c.ts");
verify.codeFix({
    description: ignoreInterpolations(ts.Diagnostics.Add_import_from_0),
    newFileContent:
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import { A } from "./a";

export class B extends A { }`,
});