// @Filename: declarations.d.ts
declare module "jquery"
// Semicolon is optional
declare module "fs";

// @Filename: user.ts
///<reference path="declarations.d.ts"/>
import foo, {bar} from "jquery";
import * as baz from "fs";
foo(bar, baz);
