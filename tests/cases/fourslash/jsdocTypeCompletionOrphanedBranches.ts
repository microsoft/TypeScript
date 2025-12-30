/// <reference path="fourslash.ts" />

// Comprehensive tests for orphaned JSDoc handling branches
// Tests issue #62281 - all logical branches

// @allowJs: true
// @checkJs: true

// @filename: /types.ts
////export interface MyType { name: string; }
////export interface OtherType { id: number; }
////export namespace Nested {
////    export interface DeepType { value: string; }
////}

// @filename: /main.js
/////** @import * as t from "./types" */
/////** @import { MyType } from "./types" */
/////** @typedef {number} LocalNum */
/////** @typedef {{name: string}} LocalObj */
////
////// ============================================================
////// Branch 1: Valid qualified name after dot - MEMBER completions
////// ============================================================
////function branch1(/** @type {t./*b1*/} */) {}
////
////// ============================================================
////// Branch 2: Simple type reference (no dot) - GLOBAL type completions
////// ============================================================
////function branch2(/** @type {Local/*b2*/} */) {}
////
////// ============================================================
////// Branch 3: Primitive type - type completions
////// ============================================================
////function branch3(/** @type {str/*b3*/} */) {}
////
////// ============================================================
////// Branch 4: Object literal type - cursor at property name
////// (Known limitation: orphaned JSDoc gives type completions here)
////// ============================================================
////function branch4(/** @type {{/*b4*/name: string}} */) {}
////
////// ============================================================
////// Branch 5: Named import (not namespace) with dot
////// MyType is an interface, not a namespace - falls back to type completions
////// ============================================================
////function branch5(/** @type {MyType./*b5*/} */) {}
////
////// ============================================================
////// Branch 6: Position BEFORE the dot - type completions, not member
////// ============================================================
////function branch6(/** @type {t/*b6*/.} */) {}
////
////// ============================================================
////// Branch 7: Nested qualified name (a.b.)
////// Known limitation: only Identifier.X supported, not QualifiedName.X
////// ============================================================
////function branch7(/** @type {t.Nested./*b7*/} */) {}
////
////// ============================================================
////// Branch 8: Empty/whitespace JSDoc - NO completions
////// ============================================================
////function branch8(/**   /*b8*/   */) {}
////
////// ============================================================
////// Branch 9: Regular comment (not JSDoc) - NO completions
////// ============================================================
////function branch9(/* regular /*b9*/ comment */) {}
////
////// ============================================================
////// Branch 10: @param tag without type - NO completions
////// ============================================================
////function branch10(/** @param /*b10*/ */) {}
////
////// ============================================================
////// Branch 11: @import not at first statement - should still find it
////// ============================================================
////const dummy = 1;
/////** @import * as t2 from "./types" */
////function branch11(/** @type {t2./*b11*/} */) {}
////
////// ============================================================
////// Branch 12: Multiple orphaned params - each should work
////// ============================================================
////function branch12(/** @type {t./*b12a*/} */, /** @type {Local/*b12b*/} */) {}
////
////// ============================================================
////// Branch 13: Cursor right after opening brace - type completions
////// ============================================================
////function branch13(/** @type {/*b13*/} */) {}
////
////// ============================================================
////// Branch 14: Non-existent namespace - falls back to type completions
////// ============================================================
////function branch14(/** @type {nonexistent./*b14*/} */) {}

// Branch 1: Qualified name with namespace import - MEMBER completions
verify.completions({
    marker: "b1",
    exact: [
        { name: "MyType", kind: "interface", kindModifiers: "export" },
        { name: "Nested", kind: "module", kindModifiers: "export" },
        { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
});

// Branch 2: Simple type reference - should get matching types
verify.completions({
    marker: "b2",
    includes: [
        { name: "LocalNum", kind: "type" },
        { name: "LocalObj", kind: "type" },
    ],
});

// Branch 3: Primitive type prefix - should get type completions
verify.completions({
    marker: "b3",
    includes: [{ name: "string", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
});

// Branch 4: Object literal property name in orphaned JSDoc
// Known limitation: orphaned JSDoc provides type completions at property name positions
verify.completions({
    marker: "b4",
    includes: [{ name: "string", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
});

// Branch 5: Named import used with dot - type completions (not member)
// MyType is an interface, not a namespace, so no member completions
verify.completions({
    marker: "b5",
    includes: [{ name: "string", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
    excludes: ["name"],  // No member completions from MyType interface
});

// Branch 6: Position before dot - should get type completions, not member
verify.completions({
    marker: "b6",
    includes: [{ name: "t", kind: "alias" }],
    excludes: ["OtherType"],  // OtherType is only accessible via t., not directly
});

// Branch 7: Nested qualified name (a.b.) - KNOWN LIMITATION
// Our orphaned JSDoc handler only handles simple Identifier.X patterns
verify.completions({
    marker: "b7",
    includes: [{ name: "string", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
    excludes: ["DeepType"],  // Can't resolve nested qualified names
});

// Branch 8: Empty JSDoc - NO completions
verify.completions({
    marker: "b8",
    exact: undefined,
});

// Branch 9: Regular comment - NO completions
verify.completions({
    marker: "b9",
    exact: undefined,
});

// Branch 10: @param without type - NO completions
verify.completions({
    marker: "b10",
    exact: undefined,
});

// Branch 11: @import not first - should still find namespace
verify.completions({
    marker: "b11",
    exact: [
        { name: "MyType", kind: "interface", kindModifiers: "export" },
        { name: "Nested", kind: "module", kindModifiers: "export" },
        { name: "OtherType", kind: "interface", kindModifiers: "export" },
    ],
});

// Branch 12a: First param in multi-param - member completions
verify.completions({
    marker: "b12a",
    includes: [{ name: "MyType", kind: "interface", kindModifiers: "export" }],
});

// Branch 12b: Second param in multi-param - type completions
verify.completions({
    marker: "b12b",
    includes: [{ name: "LocalNum", kind: "type" }],
});

// Branch 13: Right after opening brace - type completions
verify.completions({
    marker: "b13",
    includes: [{ name: "string", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
});

// Branch 14: Non-existent namespace - falls back to type completions
verify.completions({
    marker: "b14",
    includes: [{ name: "string", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }],
});
