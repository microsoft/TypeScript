///<reference path="fourslash.ts" />

//// type AliasExample = {
////     /** Something generic */
////     [p: string]: string;
////     /** Something else */
////     [key: `any${string}`]: string;
//// }
//// function aliasExample(e: AliasExample) {
////     console.log(e./*alias*/anything);
//// }

verify.quickInfoAt("alias", "(index) AliasExample[string | `any${string}`]: string", "Something generic\nSomething else");
