/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export class A { }

// @Filename: /b.ts
/////*---------------------------------------------------------------------------------------------
//// *  Copyright (c) Microsoft Corporation. All rights reserved.
//// *  Licensed under the MIT License. See License.txt in the project root for license information.
//// *--------------------------------------------------------------------------------------------*/
////
////export class B extends A { }

// @Filename: /c.ts
/////*---------------------------------------------------------------------------------------------
//// *  Copyright (c) Microsoft Corporation. All rights reserved.
//// *  Licensed under the MIT License. See License.txt in the project root for license information.
//// *--------------------------------------------------------------------------------------------*/
////
//// /// <reference types="node" />
//// /// <reference path="./a.ts" />
//// /// <amd-dependency path="./b.ts" />
////export class C extends A { }

// @Filename: /d.ts
/////*---------------------------------------------------------------------------------------------
//// *  Copyright (c) Microsoft Corporation. All rights reserved.
//// *  Licensed under the MIT License. See License.txt in the project root for license information.
//// *--------------------------------------------------------------------------------------------*/
////
//// /// <reference types="node" />
//// /// <reference path="./a.ts" />
//// /// <amd-dependency path="./b.ts" />
//// /**
////  * This is a comment intended to be attached to this interface
////  */
////export class D extends A { }

goTo.file("/b.ts");
verify.codeFix({
    description: ignoreInterpolations(ts.Diagnostics.Add_import_from_0),
    newFileContent:
        `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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

 /// <reference types="node" />
 /// <reference path="./a.ts" />
 /// <amd-dependency path="./b.ts" />

import { A } from "./a";

export class C extends A { }`,
});

goTo.file("/d.ts");
verify.codeFix({
    description: ignoreInterpolations(ts.Diagnostics.Add_import_from_0),
    newFileContent:
        `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 /// <reference types="node" />
 /// <reference path="./a.ts" />
 /// <amd-dependency path="./b.ts" />

import { A } from "./a";

 /**
  * This is a comment intended to be attached to this interface
  */
export class D extends A { }`,
});