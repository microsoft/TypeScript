///<reference path="fourslash.ts" />

//// type AliasExample = {
////     /** Something generic */
////     [p: string]: string;
////     [key: `any${string}`]: string; //TODOFIX add JSDoc here
//// }
//// function aliasExample(e: AliasExample) {
////     console.log(e./*alias*/anything);
//// }

verify.quickInfoAt("alias", "(index) AliasExample[string | `any${string}`]: string", "Something generic");
