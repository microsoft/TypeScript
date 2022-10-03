// @module: system
// @isolatedModules: true

// @filename: file1.ts

import * as moduleB from "./file2"

declare function use(v: any): void;

use(moduleB.value);
use(moduleB.moduleC);
use(moduleB.moduleCStar);

// @filename: file2.ts

import * as moduleCStar from "./file3"
import {value2} from "./file4"
import moduleC from "./file3"
import {value} from "./file3"

export {
    moduleCStar,
    moduleC,
    value
}

// @filename: file3.ts

export var value = "youpi";
export default value;

// @filename: file4.ts

export var value2 = "v";