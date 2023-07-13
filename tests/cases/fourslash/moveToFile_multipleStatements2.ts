/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { } from './somefile';
////const a = 12;

//@Filename: /a.ts
//// [|export type ProblemKind =
////   | "NoResolution"
////   | "UntypedResolution"
////   | "FalseESM"
////   | "FalseCJS"
////   | "CJSResolvesToESM"
////   | "Wildcard"
////   | "UnexpectedESMSyntax"
////   | "UnexpectedCJSSyntax"
////   | "FallbackCondition"
////   | "CJSOnlyExportsDefault"
////   | "FalseExportDefault";

//// export interface Problem {
////   kind: ProblemKind;
////   entrypoint: string;
//// }

//// export interface ProblemSummary {
////   kind: ProblemKind;
////   title: string;
////   messages: {
////     messageText: string;
////     messageHtml: string;
////   }[];
//// }|]

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`import { } from './somefile';
const a = 12;
export type ProblemKind = "NoResolution" |
    "UntypedResolution" |
    "FalseESM" |
    "FalseCJS" |
    "CJSResolvesToESM" |
    "Wildcard" |
    "UnexpectedESMSyntax" |
    "UnexpectedCJSSyntax" |
    "FallbackCondition" |
    "CJSOnlyExportsDefault" |
    "FalseExportDefault";
export interface Problem {
    kind: ProblemKind;
    entrypoint: string;
}
export interface ProblemSummary {
    kind: ProblemKind;
    title: string;
    messages: {
        messageText: string;
        messageHtml: string;
    }[];
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});