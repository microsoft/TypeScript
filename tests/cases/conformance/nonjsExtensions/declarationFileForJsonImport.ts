// @allowArbitraryExtensions: true
// @resolveJsonModule: true,false
// @filename: main.ts
import data from "./data.json";
let x: string = data;
// @filename: data.json
{}
// @filename: data.d.json.ts
declare var val: string;
export default val;