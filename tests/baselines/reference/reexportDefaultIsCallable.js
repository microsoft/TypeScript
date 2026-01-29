//// [tests/cases/compiler/reexportDefaultIsCallable.ts] ////

//// [schema.d.ts]
export default class Schema {}
//// [reexporter.d.ts]
export { default } from "./schema";
//// [usage.ts]
import Base from "./reexporter";
export default class Mine extends Base {}


//// [usage.js]
import Base from "./reexporter";
export default class Mine extends Base {
}
