package tsoptions

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type resolveContentMapperHost struct {
	fs vfs.FS
}

func TestGetContentMapperForFileNameUsesLongestExtension(t *testing.T) {
	t.Parallel()
	zMapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "z", Extensions: []string{".z"}}}
	yzMapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Package: "yz", Extensions: []string{".y.z"}}}
	commandLine := &ParsedCommandLine{ParsedConfig: &ParsedOptions{ContentMappers: []*contentmapper.Mapper{zMapper, yzMapper}}}

	assert.Equal(t, commandLine.GetContentMapperForFileName("/src/Component.y.z"), yzMapper)
	assert.Equal(t, commandLine.GetContentMapperForFileName("/src/Component.z"), zMapper)
}

func TestGetContentMapperForFileNameUsesHostCaseSensitivity(t *testing.T) {
	t.Parallel()
	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}}
	insensitive := &ParsedCommandLine{
		ParsedConfig:        &ParsedOptions{ContentMappers: []*contentmapper.Mapper{mapper}},
		comparePathsOptions: tspath.ComparePathsOptions{UseCaseSensitiveFileNames: false},
	}
	sensitive := &ParsedCommandLine{
		ParsedConfig:        &ParsedOptions{ContentMappers: []*contentmapper.Mapper{mapper}},
		comparePathsOptions: tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true},
	}

	assert.Equal(t, insensitive.GetContentMapperForFileName("/src/Component.VUE"), mapper)
	assert.Assert(t, sensitive.GetContentMapperForFileName("/src/Component.VUE") == nil)
}

func TestGetOutputFileNamesExcludesMapperOwnedOutputs(t *testing.T) {
	t.Parallel()
	mapper := &contentmapper.Mapper{Definition: contentmapper.Definition{Extensions: []string{".vue"}}}
	commandLine := NewParsedCommandLine(
		&core.CompilerOptions{
			OutDir:         "/dist",
			Declaration:    core.TSTrue,
			DeclarationMap: core.TSTrue,
			SourceMap:      core.TSTrue,
		},
		[]string{"/src/Component.vue"},
		nil,
		tspath.ComparePathsOptions{CurrentDirectory: "/", UseCaseSensitiveFileNames: true},
	)
	commandLine.ParsedConfig.ContentMappers = []*contentmapper.Mapper{mapper}

	assert.DeepEqual(t, slices.Collect(commandLine.GetOutputFileNames()), []string{"/dist/Component.d.vue.ts"})
}

func (h resolveContentMapperHost) FS() vfs.FS                  { return h.fs }
func (h resolveContentMapperHost) GetCurrentDirectory() string { return "/home/project" }

func TestResolveContentMapperManifest(t *testing.T) {
	t.Parallel()

	host := resolveContentMapperHost{fs: vfstest.FromMap(map[string]string{
		"/home/project/node_modules/vue-ts-mapper/package.json": `{
			"name": "vue-ts-mapper",
			"version": "1.2.3",
			"typescript": { "contentMapper": { "exec": ["node", "./dist/mapper.js"], "compilerOptions": ["target", "jsx"] } }
		}`,
		"/home/node_modules/@scope/noversion/package.json": `{
			"name": "@scope/noversion",
			"typescript": { "contentMapper": { "exec": ["run"] } }
		}`,
		"/home/project/node_modules/no-name/package.json": `{
			"version": "1.0.0"
		}`,
		"/home/project/node_modules/no-manifest/package.json": `{
			"name": "no-manifest"
		}`,
		"/home/project/node_modules/no-exec/package.json": `{
			"name": "no-exec",
			"typescript": { "contentMapper": {} }
		}`,
		"/home/project/node_modules/bad-exec/package.json": `{
			"name": "bad-exec",
			"typescript": { "contentMapper": { "exec": "node ./mapper.js" } }
		}`,
	}, true /*useCaseSensitiveFileNames*/)}

	// Name, version, and the verbatim exec argv are preserved.
	manifest, packageDirectory, diagnostic := resolveContentMapperManifest(host, "/home/project/tsconfig.json", "vue-ts-mapper")
	assert.Assert(t, diagnostic == nil)
	assert.Equal(t, manifest.Name, "vue-ts-mapper")
	assert.Equal(t, manifest.Version, "1.2.3")
	assert.Equal(t, packageDirectory, "/home/project/node_modules/vue-ts-mapper")
	assert.DeepEqual(t, manifest.Exec, []string{"node", "./dist/mapper.js"})
	assert.DeepEqual(t, manifest.CompilerOptions, []string{"target", "jsx"})

	// Resolution walks up node_modules; a package with no version resolves to a name and empty version.
	manifest, _, diagnostic = resolveContentMapperManifest(host, "/home/project/src/tsconfig.json", "@scope/noversion")
	assert.Assert(t, diagnostic == nil)
	assert.Equal(t, manifest.Name, "@scope/noversion")
	assert.Equal(t, manifest.Version, "")

	// A package that is not installed reports a resolution diagnostic.
	_, _, diagnostic = resolveContentMapperManifest(host, "/home/project/tsconfig.json", "missing-mapper")
	assert.Assert(t, diagnostic != nil)
	assert.Equal(t, diagnostic.Code(), diagnostics.The_content_mapper_package_0_could_not_be_resolved.Code())

	// A package whose package.json has no name reports a diagnostic.
	_, packageDirectory, diagnostic = resolveContentMapperManifest(host, "/home/project/tsconfig.json", "no-name")
	assert.Assert(t, diagnostic != nil)
	assert.Equal(t, packageDirectory, "/home/project/node_modules/no-name")
	assert.Equal(t, diagnostic.Code(), diagnostics.The_package_json_of_the_content_mapper_package_0_does_not_specify_a_name.Code())

	// A package that does not declare a "typescript.contentMapper" object reports a diagnostic.
	_, _, diagnostic = resolveContentMapperManifest(host, "/home/project/tsconfig.json", "no-manifest")
	assert.Assert(t, diagnostic != nil)
	assert.Equal(t, diagnostic.Code(), diagnostics.The_package_json_of_the_content_mapper_package_0_does_not_declare_a_typescript_contentMapper_object.Code())

	// A "typescript.contentMapper" with no "exec", or an "exec" of the wrong type, reports a diagnostic.
	for _, pkg := range []string{"no-exec", "bad-exec"} {
		_, _, diagnostic = resolveContentMapperManifest(host, "/home/project/tsconfig.json", pkg)
		assert.Assert(t, diagnostic != nil, "expected a diagnostic for %s", pkg)
		assert.Equal(t, diagnostic.Code(), diagnostics.The_typescript_contentMapper_exec_of_the_content_mapper_package_0_must_be_a_non_empty_array_of_strings.Code())
	}
}
