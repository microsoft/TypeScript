package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties5(t *testing.T) {
	t.Parallel()
	for i, test := range []struct {
		content  string
		result   string
		filename string
	}{
		{
			content: `enum E { a, b }
type T = { a: E.b };
const a: T = {};`,
			result: `enum E { a, b }
type T = { a: E.b };
const a: T = {
    a: E.b
};`,
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import { E as B } from "./a";
const a: { a: B } = {};`,
			result: `import { E as B } from "./a";
const a: { a: B } = {
    a: B.a
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import { E as B } from "./a";
const a: { a: B.b } = {};`,
			result: `import { E as B } from "./a";
const a: { a: B.b } = {
    a: B.b
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import * as B from "./a";
const a: { a: B.E } = {};`,
			result: `import * as B from "./a";
const a: { a: B.E } = {
    a: B.E.a
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import { E as B } from "./a";
const a: Record<B, string> = {};`,
			result: `import { E as B } from "./a";
const a: Record<B, string> = {
    [B.a]: "",
    [B.b]: ""
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export class C {}
// @Filename: /b.ts
import { C as B } from "./a";
const a: { a: B } = {};`,
			result: `import { C as B } from "./a";
const a: { a: B } = {
    a: new B
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export class C {}
// @Filename: /b.ts
import * as B from "./a";
const a: { a: B.C } = {};`,
			result: `import * as B from "./a";
const a: { a: B.C } = {
    a: new B.C
};`,
			filename: "/b.ts",
		},
		{
			content: `// @lib: es2015
// @Filename: /a.ts
export const a = Symbol();
// @Filename: /b.ts
import { a as b } from "./a";
const a: { [b]: number } = {};`,
			result: `import { a as b } from "./a";
const a: { [b]: number } = {
    [b]: 0
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
// @Filename: /b.ts
import type { E } from "./a";
const a: { a: E } = {};`,
			result: `import { E } from "./a";
const a: { a: E } = {
    a: E.a
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export class C {}
// @Filename: /b.ts
import { type C as B } from "./a";
const a: { a: B } = {};`,
			result: `import { C as B } from "./a";
const a: { a: B } = {
    a: new B
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
export class C {}
// @Filename: /b.ts
import type * as B from "./a";
const a: { a: B.E; b: B.C } = {};`,
			result: `import * as B from "./a";
const a: { a: B.E; b: B.C } = {
    a: B.E.a,
    b: new B.C
};`,
			filename: "/b.ts",
		},
		{
			content: `// @lib: es2015
// @Filename: /a.ts
export const a = Symbol();
export type T = { [a]: number };
// @Filename: /b.ts
import type { T } from "./a";
const b: T = {};`,
			result: `import { a, type T } from "./a";
const b: T = {
    [a]: 0
};`,
			filename: "/b.ts",
		},
		{
			content: `// @lib: es2015
// @Filename: /a.ts
export const a = Symbol();
// @Filename: /b.ts
import type { a as b } from "./a";
const a: { [b]: number } = {};`,
			result: `import { a as b } from "./a";
const a: { [b]: number } = {
    [b]: 0
};`,
			filename: "/b.ts",
		},
		{
			content: `// @module: esnext
// @moduleResolution: bundler
// @verbatimModuleSyntax: true
// @Filename: /a.ts
export enum E { a, b }
export class C {}
export interface T { a: number }
// @Filename: /b.ts
import type { C, E as B, T } from "./a";
const a: { a: B; b: C; c?: T } = {};`,
			result: `import { C, E as B, type T } from "./a";
const a: { a: B; b: C; c?: T } = {
    a: B.a,
    b: new C
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export default class C {}
// @Filename: /b.ts
import type B from "./a";
const a: { a: B } = {};`,
			result: `import B from "./a";
const a: { a: B } = {
    a: new B
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export enum E { a, b }
export class C {}
export type T = { a: E; b: C };
// @Filename: /b.ts
import type { T } from "./a";
const a: T = {};`,
			result: `import { C, E, type T } from "./a";
const a: T = {
    a: E.a,
    b: new C
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export class C {}
export enum E { a, b }
// @Filename: /b.ts
import { type /* a */ C as B, type /* b */ E } from "./a";
const a: { a: B; b: E } = {};`,
			result: `import { /* a */ C as B, /* b */ E } from "./a";
const a: { a: B; b: E } = {
    a: new B,
    b: E.a
};`,
			filename: "/b.ts",
		},
		{
			content: `// @verbatimModuleSyntax: true
// @Filename: /a.ts
export class C {}
export enum E { a, b }
export interface T { a: number }
// @Filename: /b.ts
import type {
    C, // a
    E, // b
    T
} from "./a";
const a: { a: C; b: E; c?: T } = {};`,
			result: `import {
    C, // a
    E, // b
    type T
} from "./a";
const a: { a: C; b: E; c?: T } = {
    a: new C,
    b: E.a
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export class C {}
export enum E { a, b }
export type T = { a: C; b: E };
// @Filename: /b.ts
import type { C as B, T } from "./a";
const a: T = {};`,
			result: `import { C as B, E, type T } from "./a";
const a: T = {
    a: new B,
    b: E.a
};`,
			filename: "/b.ts",
		},
		{
			content: `// @Filename: /a.ts
export interface A { a: number }
export class C {}
export enum E { a, b }
export type T = { a: C; b: E; c?: A };
// @Filename: /b.ts
import type { A, C, T } from "./a";
const a: T = {};`,
			result: `import { type A, C, type T, E } from "./a";
const a: T = {
    a: new C,
    b: E.a
};`,
			filename: "/b.ts",
		},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			if test.filename != "" {
				f.GoToFile(t, test.filename)
			}
			f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
				Description:    diagnostics.Add_missing_properties.Localize(locale.Default),
				NewFileContent: test.result,
				ApplyChanges:   true,
			})
			f.VerifyNoErrors(t)
		})
	}
}
