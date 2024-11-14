package printer

import (
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"gotest.tools/v3/assert"
)

func TestSanityCheckParsePrintRoundtrip(t *testing.T) {
	t.Parallel()
	samples := []string{
		// "6",
		// 		"interface A {}",
		// 		"class A {}",
		// 		"@dec export class D {}",
		// 		`export class A {
		// 	#private
		// 	declare prop d: number;
		// 	method() {}
		// 	static {
		// 		console.log("static init")
		// 	}
		// 	get f1() {
		// 		return this.d;
		// 	}
		// }`,
		// 		`namespace Foo {
		// 	export function bar(x?: string[]) {
		// 		return null as any as (A extends B ? true : never)
		// 	}
		// }`,
	}

	for i, sample := range samples {
		t.Run(fmt.Sprintf("printer sanity check %d", i), func(t *testing.T) {
			t.Parallel()
			file := compiler.ParseSourceFile("file.ts", sample, core.ScriptTargetLatest)
			emitted := PrintNode(&file.Node)
			assert.Equal(t, emitted, sample)
		})
	}
}
