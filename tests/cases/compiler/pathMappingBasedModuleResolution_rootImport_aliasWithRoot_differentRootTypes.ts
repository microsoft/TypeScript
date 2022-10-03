// @noImplicitReferences: true
// @traceResolution: true
// @allowJs: true

// @filename: /root/src/foo.ts
export function foo() {}

// @filename: /root/src/bar.js
export function bar() {}

// @filename: /root/a.ts
import { foo as foo1 } from "/foo";
import { bar as bar1 } from "/bar";
import { foo as foo2 } from "c:/foo";
import { bar as bar2 } from "c:/bar";
import { foo as foo3 } from "c:\\foo";
import { bar as bar3 } from "c:\\bar";
import { foo as foo4 } from "//server/foo";
import { bar as bar4 } from "//server/bar";
import { foo as foo5 } from "\\\\server\\foo";
import { bar as bar5 } from "\\\\server\\bar";
import { foo as foo6 } from "file:///foo";
import { bar as bar6 } from "file:///bar";
import { foo as foo7 } from "file://c:/foo";
import { bar as bar7 } from "file://c:/bar";
import { foo as foo8 } from "file://server/foo";
import { bar as bar8 } from "file://server/bar";
import { foo as foo9 } from "http://server/foo";
import { bar as bar9 } from "http://server/bar";

// @filename: /root/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "/*": ["./src/*"],
            "c:/*": ["./src/*"],
            "c:\\*": ["./src/*"],
            "//server/*": ["./src/*"],
            "\\\\server\\*": ["./src/*"],
            "file:///*": ["./src/*"],
            "file://c:/*": ["./src/*"],
            "file://server/*": ["./src/*"],
            "http://server/*": ["./src/*"]
        },
        "allowJs": true,
        "outDir": "bin"
    }
}
