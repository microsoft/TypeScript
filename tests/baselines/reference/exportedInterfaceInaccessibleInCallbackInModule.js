//// [exportedInterfaceInaccessibleInCallbackInModule.ts]
export interface ProgressCallback {
	(progress:any):any;
}	

// --- Generic promise
export declare class TPromise<V> {
	
	constructor(init:(complete: (value:V)=>void, error:(err:any)=>void, progress:ProgressCallback)=>void, oncancel?: any);
	
    // removing this method fixes the error squiggle.....
	public then<U>(success?: (value:V)=>TPromise<U>, error?: (err:any)=>TPromise<U>, progress?:ProgressCallback): TPromise<U>;
}

//// [exportedInterfaceInaccessibleInCallbackInModule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
