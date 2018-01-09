// @declaration: true
// @filename: module.ts
import * as i from "./index";
class Foo {}
// @filename: index.ts
import {} from "./module";
export interface Bar {
    x: string
}