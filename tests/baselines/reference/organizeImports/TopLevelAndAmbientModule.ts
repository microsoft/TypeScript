// ==ORIGINAL==

import D from "lib";

declare module "mod" {
    import { F1 } from "lib";
    import * as NS from "lib";
    import { F2 } from "lib";

    function F(f1: {} = F1, f2: {} = F2) {}
}

import E from "lib";
import "lib";

D();

// ==ORGANIZED==

import "lib";
import D from "lib";

declare module "mod" {
    import { F1, F2 } from "lib";

    function F(f1: {} = F1, f2: {} = F2) {}
}


D();
