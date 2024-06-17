/// <reference path="fourslash.ts" />

//// import { Both } from "module-specifiers-unsorted";
//// import { aa, CaseInsensitively, sorted } from "aardvark";

verify.organizeImports(
`import { aa, CaseInsensitively, sorted } from "aardvark";
import { Both } from "module-specifiers-unsorted";
`,
    ts.OrganizeImportsMode.SortAndCombine,
    {
        organizeImportsIgnoreCase: "auto",
    }
);
