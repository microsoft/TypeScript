package contentmappertest

import "fmt"

const PackageName = "mapper"

// PackageJSON returns a package manifest selecting the requested mapper.
func PackageJSON(mapper string) string {
	compilerOptions := ""
	dynamicConfig := ""
	if mapper == TransformingMapper {
		compilerOptions = `, "compilerOptions": ["target", "jsx"]`
	}
	if mapper == DynamicVerbatimMapper {
		dynamicConfig = `, "dynamicConfig": true`
	}
	return fmt.Sprintf(`{
	"name": %q,
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": [%q]%s%s } }
}`, PackageName, mapper, compilerOptions, dynamicConfig)
}
