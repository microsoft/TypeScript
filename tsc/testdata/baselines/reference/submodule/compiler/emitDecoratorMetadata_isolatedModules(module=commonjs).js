//// [tests/cases/compiler/emitDecoratorMetadata_isolatedModules.ts] ////

//// [type1.ts]
interface T1 {}
export type { T1 }

//// [type2.ts]
export interface T2 {}

//// [class3.ts]
export class C3 {}

//// [index.ts]
import { T1 } from "./type1";
import * as t1 from "./type1";
import type { T2 } from "./type2";
import { C3 } from "./class3";
declare var EventListener: any;

class HelloWorld {
  @EventListener('1')
  handleEvent1(event: T1) {} // Error
  
  @EventListener('2')
  handleEvent2(event: T2) {} // Ok

  @EventListener('1')
  p1!: T1; // Error

  @EventListener('1')
  p1_ns!: t1.T1; // Ok

  @EventListener('2')
  p2!: T2; // Ok

  @EventListener('3')
  handleEvent3(event: C3): T1 { return undefined! } // Ok, Error
}


//// [type1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [type2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [class3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C3 = void 0;
class C3 {
}
exports.C3 = C3;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    @EventListener('1')
    handleEvent1(event) { } // Error
    @EventListener('2')
    handleEvent2(event) { } // Ok
    @EventListener('1')
    p1; // Error
    @EventListener('1')
    p1_ns; // Ok
    @EventListener('2')
    p2; // Ok
    @EventListener('3')
    handleEvent3(event) { return undefined; } // Ok, Error
}
