package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllReferencesOfConstructor(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
export class C {
    /*0*/constructor(n: number);
    /*1*/constructor();
    /*2*/constructor(n?: number){}
    static f() {
        this.f();
        new this();
    }
}
new C();
const D = C;
new D();
// @Filename: b.ts
import { C } from "./a";
new C();
// @Filename: c.ts
import { C } from "./a";
class D extends C {
    constructor() {
        super();
        super.method();
    }
    method() { super(); }
}
class E implements C {
    constructor() { super(); }
}
// @Filename: d.ts
import * as a from "./a";
new a.C();
class d extends a.C { constructor() { super(); }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2")
}
