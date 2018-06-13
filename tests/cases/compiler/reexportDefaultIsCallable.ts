// @esModuleInterop: true
// @filename: schema.d.ts
export default class Schema {}
// @filename: reexporter.d.ts
export { default } from "./schema";
// @filename: usage.ts
import Base from "./reexporter";
export default class Mine extends Base {}
