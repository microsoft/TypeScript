/// <reference path="fourslash.ts" />

//// import { Both } from "module-specifiers-unsorted";
//// import { case, Insensitively, sorted } from "aardvark";

verify.organizeImports(
`import { case, Insensitively, sorted } from "aardvark";
import { Both } from "module-specifiers-unsorted";
`,
    ts.OrganizeImportsMode.SortAndCombine,
    {
        organizeImportsIgnoreCase: "auto",
    }
);
