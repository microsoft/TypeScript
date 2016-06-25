// @Filename: declarations1.d.ts
declare module "foo";

// @Filename: declarations2.d.ts
declare module "foo";

// @Filename: user.ts
///<reference path="declarations1.d.ts" />
///<reference path="declarations1.d.ts" />
import foo from "foo";
