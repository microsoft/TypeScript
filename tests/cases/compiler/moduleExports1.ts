<<<<<<< HEAD
//@module: amd
export module TypeScript.Strasse.Street {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
//@module: amd
export namespace TypeScript.Strasse.Street {
=======
//@module: commonjs
export namespace TypeScript.Strasse.Street {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
	export class Rue {
		public address:string;
	}	
}

var rue = new TypeScript.Strasse.Street.Rue();

rue.address = "1 Main Street";

void 0;

if (!module.exports) module.exports = "";