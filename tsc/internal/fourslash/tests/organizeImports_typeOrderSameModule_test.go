package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports_importKindOrder(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /main.ts
import { foo } from './package';
import type { Foo } from './package';
import './package';
import Default from './package';
import * as ns from './package';

const x: Foo = foo;
console.log(x, Default, ns);
// @Filename: /package.d.ts
export type Foo = string;
export declare const foo: Foo;
export declare function fn(): void;
export default class Default {}
export as namespace Package;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import './package';
import type { Foo } from './package';
import * as ns from './package';
import Default, { foo } from './package';

const x: Foo = foo;
console.log(x, Default, ns);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}

func TestOrganizeImports_importKindOrderMultipleModules(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /main.ts
import { b } from './b';
import { a } from './a';
import type { TypeB } from './b';
import type { TypeA } from './a';
import './b';
import './a';

const x: TypeA = a;
const y: TypeB = b;
console.log(x, y);
// @Filename: /a.d.ts
export type TypeA = string;
export declare const a: TypeA;
// @Filename: /b.d.ts
export type TypeB = string;
export declare const b: TypeB;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import './a';
import type { TypeA } from './a';
import { a } from './a';
import './b';
import type { TypeB } from './b';
import { b } from './b';

const x: TypeA = a;
const y: TypeB = b;
console.log(x, y);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
