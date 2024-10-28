package compiler

import (
	"testing"
)

func BenchmarkParse(b *testing.B) {
	for _, f := range benchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := f.Path()
			sourceText := f.ReadFile(b)

			for i := 0; i < b.N; i++ {
				ParseSourceFile(fileName, sourceText, ScriptTargetESNext)
			}
		})
	}
}
