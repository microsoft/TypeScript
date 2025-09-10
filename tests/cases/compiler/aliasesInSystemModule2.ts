// @module: system
// @isolatedModules: true

import {alias} from "foo";
import cls = alias.Class;
export import cls2 = alias.Class;

let x = new alias.Class();
let y = new cls();
let z = new cls2();

namespace M {
  export import cls = alias.Class;
  let x = new alias.Class();
  let y = new cls(); 
  let z = new cls2();
}