/// <reference path='fourslash.ts'/>

//// interface Entries {
////   /**
////    * Plugins info...
////    */
////   plugins?: Record<string, Record<string, unknown>>;
////   /**
////    * Output info...
////    */
////   output?: string;
////   /**
////    * Format info...
////    */
////   format?: string;
//// }
////
//// interface Input extends Entries {
////   /**
////    * Input info...
////    */
////   input: string;
//// }
////
//// interface Types extends Entries {
////   /**
////    * Types info...
////    */
////   types: string;
//// }
////
//// type EntriesOptions = Input | Types;
////
//// const options: EntriesOptions[] = [
////   {
////     input: "./src/index.ts",
////     /*1*/output: "./dist/index.mjs",
////   },
////   {
////     types: "./src/types.ts",
////     format: "esm",
////   },
//// ];

verify.quickInfoAt("1", "(property) Entries.output?: string", "Output info...");
