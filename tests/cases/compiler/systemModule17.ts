// @module: system

// @filename: f1.ts

export class A {}
export interface I {}

// @filename: f2.ts

var x = 1;
interface I { }

namespace N {
	export var x = 1;
	export interface I { }	
}

import IX = N.x;
import II = N.I;
import { A, A as EA, I as EI } from "f1";

export {x};
export {x as x1};

export {I};
export {I as I1};

export {A};
export {A as A1};

export {EA};
export {EA as EA1};

export {EI };
export {EI as EI1};

export {IX};
export {IX as IX1};

export {II};
export {II as II1};