package packagejson_test

import (
	"encoding/json"
	"path/filepath"
	"testing"

	json2 "github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/filefixture"
)

var packageJsonFixtures = []filefixture.Fixture{
	filefixture.FromFile("package.json", filepath.Join(repo.RootPath, "package.json")),
	filefixture.FromFile("date-fns.json", filepath.Join(repo.TestDataPath, "fixtures", "packagejson", "date-fns.json")),
}

func BenchmarkPackageJSON(b *testing.B) {
	for _, f := range packageJsonFixtures {
		f.SkipIfNotExist(b)
		content := []byte(f.ReadFile(b))
		b.Run("UnmarshalJSON", func(b *testing.B) {
			b.Run(f.Name(), func(b *testing.B) {

				for i := 0; i < b.N; i++ {
					var p packagejson.Fields
					if err := json.Unmarshal(content, &p); err != nil {
						b.Fatal(err)
					}
				}
			})
		})

		b.Run("UnmarshalJSONV2", func(b *testing.B) {
			b.Run(f.Name(), func(b *testing.B) {
				for i := 0; i < b.N; i++ {
					var p packagejson.Fields
					if err := json2.Unmarshal(content, &p); err != nil {
						b.Fatal(err)
					}
				}
			})
		})

		b.Run("ParseJSONText", func(b *testing.B) {
			b.Run(f.Name(), func(b *testing.B) {
				for i := 0; i < b.N; i++ {
					compiler.ParseJSONText(f.Name(), string(content))
				}
			})
		})
	}
}
