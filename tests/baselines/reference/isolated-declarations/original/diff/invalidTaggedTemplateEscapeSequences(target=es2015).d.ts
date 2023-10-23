// [[Reason: ]] ////

//// [tests/cases/conformance/es2018/invalidTaggedTemplateEscapeSequences.ts] ////

===================================================================
--- DTE	DTE output
+++ TSC	TSC output
@@ -4,9 +4,9 @@
 declare function tag(str: any, ...args: any[]): any;
 declare const a: invalid;
 declare const b: invalid;
 declare const x: invalid;
-declare const y = `\u{hello} ${100} \xtraordinary ${200} wonderful ${300} \uworld`;
+declare const y = "\\u{hello} 100 \\xtraordinary 200 wonderful 300 \\uworld";
 declare const z: invalid;
 declare const a1: invalid;
 declare const a2: invalid;
 declare const a3: invalid;
