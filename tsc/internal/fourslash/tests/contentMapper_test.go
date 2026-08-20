package fourslash_test

import (
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func newContentMapperFourslash(t *testing.T, content, mapper string, extensions ...string) (*fourslash.FourslashTest, func()) {
	t.Helper()
	quotedExtensions := make([]string, len(extensions))
	for i, extension := range extensions {
		quotedExtensions[i] = strconv.Quote(extension)
	}
	content = `// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"target": "es2020",
		"module": "esnext",
		"moduleResolution": "bundler",
		"strict": true
	},
	"contentMappers": [
		{ "package": "mapper", "extensions": [` + strings.Join(quotedExtensions, ", ") + `] }
	]
}

// @Filename: /node_modules/mapper/package.json
` + contentmappertest.PackageJSON(mapper) + `

` + content
	return fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		ContentMapperSpawner: contentmappertest.NewSpawner(),
		RunExternalCode:      true,
	})
}
