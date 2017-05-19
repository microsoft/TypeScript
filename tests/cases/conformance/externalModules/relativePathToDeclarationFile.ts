// @ModuleResolution: classic
// @Filename: test/foo.d.ts
export declare module M2 {
	export var x: boolean;
}

// @Filename: test/other.d.ts
export declare module M2 {
	export var x: string;
}

// @Filename: test/sub/relMod.d.ts
declare class Test {
	constructor(x: number);
}
export = Test;

// @Filename: test/file1.ts
import foo = require('foo');
import other = require('./other');
import relMod = require('./sub/relMod');

if(foo.M2.x){
	var x = new relMod(other.M2.x.charCodeAt(0));
}
