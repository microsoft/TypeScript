/// <reference path='fourslash.ts' />

/////**
//// * @param start The start
//// * @param end The end
//// * More text
//// */
////declare function foo(start: number, end?: number);
////
////fo/*1*/

const tags: ReadonlyArray<FourSlashInterface.JSDocTagInfo> = [
    { name: "param", text: "start The start" },
    { name: "param", text: "end The end\nMore text" },
];
verify.noSignatureHelp("1");
edit.insert("o");
verify.noSignatureHelp();
edit.insert("(");
verify.signatureHelp({ parameterDocComment: "The start", tags });
edit.insert("10,");
const help2: FourSlashInterface.VerifySignatureHelpOptions = { parameterDocComment: "The end\nMore text", tags };
verify.signatureHelp(help2);
edit.insert("  ");
verify.signatureHelp(help2);
edit.insert(",  ");
edit.backspace(3);
verify.signatureHelp(help2);
edit.insert("12");
verify.signatureHelp(help2);
edit.insert(")");
verify.noSignatureHelp();
