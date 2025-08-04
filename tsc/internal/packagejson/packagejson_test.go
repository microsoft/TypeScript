package packagejson_test

import (
	"path/filepath"
	"testing"

	"github.com/go-json-experiment/json"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/filefixture"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
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
				for b.Loop() {
					var p packagejson.Fields
					if err := json.Unmarshal(content, &p); err != nil {
						b.Fatal(err)
					}
				}
			})
		})

		b.Run("UnmarshalJSONV2", func(b *testing.B) {
			b.Run(f.Name(), func(b *testing.B) {
				for b.Loop() {
					var p packagejson.Fields
					if err := json.Unmarshal(content, &p); err != nil {
						b.Fatal(err)
					}
				}
			})
		})

		b.Run("ParseJSONText", func(b *testing.B) {
			b.Run(f.Name(), func(b *testing.B) {
				fileName := "/" + f.Name()
				for b.Loop() {
					parser.ParseSourceFile(ast.SourceFileParseOptions{
						FileName: fileName,
						Path:     tspath.Path(fileName),
					}, string(content), core.ScriptKindJSON)
				}
			})
		})
	}
}

func TestParse(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		content string
		want    packagejson.Fields
	}{
		{
			name: "duplicate names",
			content: `{
				"name": "test-package",
				"name": "test-package",
				"version": "1.0.0"
			}`,
			want: packagejson.Fields{
				HeaderFields: packagejson.HeaderFields{
					Name:    packagejson.ExpectedOf("test-package"),
					Version: packagejson.ExpectedOf("1.0.0"),
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got, err := packagejson.Parse([]byte(tt.content))
			assert.NilError(t, err)
			assert.DeepEqual(t, got, tt.want, cmpopts.IgnoreUnexported(
				packagejson.Fields{},
				packagejson.HeaderFields{},
				packagejson.Expected[string]{},
				packagejson.Expected[map[string]string]{},
				packagejson.ExportsOrImports{},
			))
		})
	}
}
