package incremental_test

import (
	"errors"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func configWithMappers(mappers ...*contentmapper.Mapper) *tsoptions.ParsedCommandLine {
	config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{}, nil, nil, "/", tspath.CaseSensitive)
	config.ParsedConfig.ContentMappers = mappers
	return config
}

func TestStaticContentMapperTransformIdentity(t *testing.T) {
	t.Parallel()

	assert.Equal(t, (&contentmapper.Mapper{Manifest: contentmapper.Manifest{Name: "vue", Version: "2.0.0"}}).Identity(), "vue@2.0.0")
	assert.Equal(t, (&contentmapper.Mapper{Definition: contentmapper.Definition{Package: "anon"}}).Identity(), "")

	jsxMapper := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "jsx"},
		Manifest:   contentmapper.Manifest{Name: "jsx", Version: "1.0.0", CompilerOptions: []string{"jsx"}},
	}
	jsxPreserveIdentity := jsxMapper.TransformIdentity(&core.CompilerOptions{Jsx: core.JsxEmitPreserve})
	jsxReactIdentity := jsxMapper.TransformIdentity(&core.CompilerOptions{Jsx: core.JsxEmitReact})
	assert.Assert(t, jsxPreserveIdentity != jsxReactIdentity)

	optionsA := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "vue", Options: []byte(`{"mode":"a"}`)},
		Manifest:   contentmapper.Manifest{Name: "vue", Version: "1.0.0"},
	}
	optionsB := &contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "vue", Options: []byte(`{"mode":"b"}`)},
		Manifest:   contentmapper.Manifest{Name: "vue", Version: "1.0.0"},
	}
	assert.Assert(t, optionsA.TransformIdentity(&core.CompilerOptions{}) != optionsB.TransformIdentity(&core.CompilerOptions{}))
}

type fakeBuildInfoReader struct {
	buildInfo *incremental.BuildInfo
}

func (r fakeBuildInfoReader) ReadBuildInfo(*tsoptions.ParsedCommandLine) *incremental.BuildInfo {
	return r.buildInfo
}

type fakeContentMapperProject struct {
	identities []string
	err        error
}

func (p fakeContentMapperProject) Refresh() error                                 { return nil }
func (p fakeContentMapperProject) Identities() ([]string, error)                  { return p.identities, p.err }
func (p fakeContentMapperProject) Identity(*contentmapper.Mapper) (string, error) { return "", nil }
func (p fakeContentMapperProject) WatchedFiles() ([]tspath.RootedFilePath, error) { return nil, nil }

func (p fakeContentMapperProject) Diagnostics() []contentmapper.OptionDiagnostic {
	return nil
}

func (p fakeContentMapperProject) Transform(*contentmapper.Mapper, contentmapper.Request) (contentmapper.Result, error) {
	return contentmapper.Result{}, nil
}

func (p fakeContentMapperProject) Close() error { return nil }

func TestDynamicContentMapperIdentities(t *testing.T) {
	t.Parallel()
	config := configWithMappers(&contentmapper.Mapper{
		Definition: contentmapper.Definition{Package: "dynamic"},
		Manifest:   contentmapper.Manifest{Name: "dynamic", Version: "1.0.0", DynamicConfig: true},
	})
	project := fakeContentMapperProject{identities: []string{"dynamic@1.0.0:opaque"}}
	identities, err := incremental.ContentMapperIdentities(project)
	assert.NilError(t, err)
	assert.DeepEqual(t, identities, project.identities)

	buildInfo := &incremental.BuildInfo{
		Version:                 core.Version(),
		FileNames:               []incremental.BuildInfoPath{"/src/a.ts"},
		ContentMapperIdentities: []string{"dynamic@1.0.0:old"},
	}
	host := compiler.NewCompilerHost(vfstest.FromMap[any](nil, tspath.CaseSensitive), "", nil, nil, project)
	program := incremental.ReadBuildInfoProgram(config, fakeBuildInfoReader{buildInfo}, host)
	assert.Assert(t, program == nil, "expected opaque mapper identity changes to discard the old program")
}

func TestContentMapperIdentityError(t *testing.T) {
	t.Parallel()
	want := errors.New("identity failed")
	identities, err := incremental.ContentMapperIdentities(fakeContentMapperProject{err: want})
	assert.Assert(t, identities == nil)
	assert.ErrorIs(t, err, want)
}

func TestReadBuildInfoProgramContentMapperIdentityMismatch(t *testing.T) {
	t.Parallel()

	// An otherwise-valid, incremental build info whose recorded mapper identity differs from the current
	// project cannot be reused: the old program is discarded (nil) so the project is rebuilt.
	buildInfo := &incremental.BuildInfo{
		Version:                 core.Version(),
		FileNames:               []incremental.BuildInfoPath{"/src/a.ts"},
		ContentMapperIdentities: []string{"vue@1.0.0"},
	}
	config := configWithMappers(&contentmapper.Mapper{Definition: contentmapper.Definition{Package: "vue", Extensions: []string{".vue"}}, Manifest: contentmapper.Manifest{Name: "vue", Version: "2.0.0"}})
	project := fakeContentMapperProject{identities: []string{"vue@2.0.0:current"}}
	host := compiler.NewCompilerHost(vfstest.FromMap[any](nil, tspath.CaseSensitive), "", nil, nil, project)

	program := incremental.ReadBuildInfoProgram(config, fakeBuildInfoReader{buildInfo}, host)
	assert.Assert(t, program == nil, "expected the old program to be discarded when the mapper identity changed")
}
