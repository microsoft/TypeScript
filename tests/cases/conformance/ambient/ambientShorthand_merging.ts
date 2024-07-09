// @Filename: declarations1.d.ts
declare module "foo";

// @Filename: declarations2.d.ts
declare module "foo" {
    export const bar: number;
}

// @Filename: user.ts
///<reference path="declarations1.d.ts" />
///<reference path="declarations1.d.ts" />
import foo, {bar} from "foo";
