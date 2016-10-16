//@filename: v1/index.d.ts
export as namespace Alpha;
export var x: string;

//@filename: v2/index.d.ts
export as namespace Alpha;
export var y: number;

//@filename: consumer.ts
import * as v1 from './v1';
import * as v2 from './v2';

//@filename: global.ts
// Should be OK, first in wins
const p: string = Alpha.x;