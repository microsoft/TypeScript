package compiler_test

import (
	"context"
	"errors"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type fakeContentMapperHost struct {
	transform func(fileName string, content string) (contentmapper.Result, error)
}

func (r fakeContentMapperHost) Refresh() error                                 { return nil }
func (r fakeContentMapperHost) Identities() ([]string, error)                  { return nil, nil }
func (r fakeContentMapperHost) Identity(*contentmapper.Mapper) (string, error) { return "test", nil }
func (r fakeContentMapperHost) WatchedFiles() ([]string, error)                { return nil, nil }
func (r fakeContentMapperHost) Diagnostics() []contentmapper.OptionDiagnostic {
	return nil
}
func (r fakeContentMapperHost) Close() error { return nil }

func (r fakeContentMapperHost) Transform(mapper *contentmapper.Mapper, request contentmapper.Request) (contentmapper.Result, error) {
	return r.transform(request.FileName, request.Content)
}

func newContentMapperProgram(t *testing.T, contentMapperProject contentmapper.Project, files map[string]string, rootFiles []string) *compiler.Program {
	return newContentMapperProgramWithOptions(t, contentMapperProject, files, rootFiles, &core.CompilerOptions{
		SkipLibCheck:     core.TSTrue,
		Module:           core.ModuleKindESNext,
		ModuleResolution: core.ModuleResolutionKindBundler,
	})
}

func newContentMapperProgramWithOptions(t *testing.T, contentMapperProject contentmapper.Project, files map[string]string, rootFiles []string, options *core.CompilerOptions) *compiler.Program {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}
	fs := vfstest.FromMap[any](nil, false /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)
	for name, content := range files {
		_ = fs.WriteFile(name, content)
	}

	config := &tsoptions.ParsedCommandLine{
		ParsedConfig: &tsoptions.ParsedOptions{
			FileNames:       rootFiles,
			CompilerOptions: options,
			ContentMappers:  []*contentmapper.Mapper{{Package: "vue", Extensions: []string{".vue"}, Name: "vue-mapper", Version: "1.0.0"}},
		},
	}
	return compiler.NewProgram(compiler.ProgramOptions{
		Config: config,
		Host:   compiler.NewCompilerHost("/src", fs, bundled.LibPath(), nil, nil, contentMapperProject),
		// Load files on the calling goroutine for deterministic diagnostics ordering.
		SingleThreaded: core.TSTrue,
	})
}

func TestContentMapperVirtualExtensionSetsImpliedNodeFormat(t *testing.T) {
	t.Parallel()
	program := newContentMapperProgramWithOptions(
		t,
		fakeContentMapperHost{transform: func(fileName string, content string) (contentmapper.Result, error) {
			return contentmapper.Result{Text: "export {};", VirtualExtension: ".mts", Mappings: spanmap.New(nil)}, nil
		}},
		map[string]string{"/src/Component.vue": "<template />"},
		[]string{"/src/Component.vue"},
		&core.CompilerOptions{
			SkipLibCheck:     core.TSTrue,
			Module:           core.ModuleKindNodeNext,
			ModuleResolution: core.ModuleResolutionKindNodeNext,
		},
	)

	file := program.GetSourceFile("/src/Component.vue")
	assert.Assert(t, file != nil)
	assert.Equal(t, program.GetSourceFileMetaData(file.Path()).ImpliedNodeFormat, core.ResolutionModeESM)
}

func collectContentMapperDiagnostics(program *compiler.Program) []*ast.Diagnostic {
	ctx := context.Background()
	return slices.Concat(
		program.GetSyntacticDiagnostics(ctx, nil),
		program.GetSemanticDiagnostics(ctx, nil),
		program.GetProgramDiagnostics(),
	)
}

func TestContentMapperInvalidMappings(t *testing.T) {
	t.Parallel()

	const transformed = "export const x = 1;\n"
	const original = "<template>x</template>\n"
	mappings := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom},
		{VirtualStart: 5, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom},
	})
	files := map[string]string{
		"/src/app.ts":        `import "./Component.vue";`,
		"/src/Component.vue": original,
	}
	contentMapperHost := fakeContentMapperHost{
		transform: func(fileName string, content string) (contentmapper.Result, error) {
			return contentmapper.Result{Text: transformed, VirtualExtension: ".ts", Mappings: mappings}, nil
		},
	}
	program := newContentMapperProgram(t, contentMapperHost, files, []string{"/src/app.ts"})
	programDiagnostics := collectContentMapperDiagnostics(program)
	found := slices.ContainsFunc(programDiagnostics, func(diagnostic *ast.Diagnostic) bool {
		return diagnostic.Code() == diagnostics.The_content_mapper_0_produced_overlapping_or_out_of_order_position_mappings_near_virtual_offset_1.Code()
	})
	assert.Assert(t, found, "expected an invalid mapping diagnostic, got: %v", programDiagnostics)
}

func TestContentMapperSourceFileState(t *testing.T) {
	t.Parallel()

	t.Run("successful synthesized empty file", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgram(t, fakeContentMapperHost{
			transform: func(fileName string, content string) (contentmapper.Result, error) {
				return contentmapper.Result{Text: "export {};", VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
			},
		}, map[string]string{"/src/empty.vue": ""}, []string{"/src/empty.vue"})
		file := program.GetSourceFile("/src/empty.vue")
		assert.Assert(t, file != nil)
		assert.Equal(t, file.OriginalText(), "")
		assert.Equal(t, file.ContentMapper(), "vue-mapper@1.0.0")
		assert.Assert(t, !file.IsContentMapperFailureStub())
	})

	t.Run("failed transform", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgram(t, fakeContentMapperHost{
			transform: func(fileName string, content string) (contentmapper.Result, error) {
				return contentmapper.Result{}, errors.New("failed")
			},
		}, map[string]string{"/src/fail.vue": "original"}, []string{"/src/fail.vue"})
		file := program.GetSourceFile("/src/fail.vue")
		assert.Assert(t, file != nil)
		assert.Equal(t, file.OriginalText(), "original")
		assert.Equal(t, file.ContentMapper(), "vue-mapper@1.0.0")
		assert.Assert(t, file.IsContentMapperFailureStub())
	})

	t.Run("project error is localized", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgram(t, fakeContentMapperHost{
			transform: func(fileName string, content string) (contentmapper.Result, error) {
				return contentmapper.Result{}, contentmapper.NewTransformError(
					contentmapper.TransformErrorKindProject,
					&contentmapper.ProjectError{Kind: contentmapper.ProjectErrorKindMalformedResponse},
				)
			},
		}, map[string]string{"/src/fail.vue": "original"}, []string{"/src/fail.vue"})
		programDiagnostics := collectContentMapperDiagnostics(program)
		found := slices.ContainsFunc(programDiagnostics, func(diagnostic *ast.Diagnostic) bool {
			return slices.ContainsFunc(diagnostic.MessageChain(), func(message *ast.Diagnostic) bool {
				return message.Code() == diagnostics.The_content_mapper_returned_a_project_response_that_could_not_be_decoded.Code()
			})
		})
		assert.Assert(t, found, "expected a localized project response diagnostic, got: %v", programDiagnostics)
	})
}

func TestContentMapperProjectErrorDiagnostics(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		kind    contentmapper.ProjectErrorKind
		code    int32
		message string
	}{
		{
			kind:    contentmapper.ProjectErrorKindMissingConfigIdentity,
			code:    diagnostics.The_content_mapper_did_not_return_configIdentity_which_is_required_when_the_content_mapper_has_dynamicConfig_Colon_true_in_its_package_json.Code(),
			message: `The content mapper did not return 'configIdentity', which is required when the content mapper has '"dynamicConfig": true' in its package.json.`,
		},
		{
			kind:    contentmapper.ProjectErrorKindUnexpectedConfigIdentity,
			code:    diagnostics.The_content_mapper_returned_configIdentity_which_is_only_allowed_when_it_declares_dynamicConfig_Colon_true_in_its_package_json.Code(),
			message: `The content mapper returned 'configIdentity', which is only allowed when it declares '"dynamicConfig": true' in its package.json.`,
		},
		{
			kind:    contentmapper.ProjectErrorKindUnexpectedWatchedFiles,
			code:    diagnostics.The_content_mapper_returned_watchedFiles_which_is_only_allowed_when_it_declares_dynamicConfig_Colon_true_in_its_package_json.Code(),
			message: `The content mapper returned 'watchedFiles', which is only allowed when it declares '"dynamicConfig": true' in its package.json.`,
		},
	} {
		t.Run(test.message, func(t *testing.T) {
			t.Parallel()
			message := compiler.ContentMapperProjectErrorDiagnostic(&contentmapper.ProjectError{Kind: test.kind})
			assert.Equal(t, message.Code(), test.code)
			assert.Equal(t, diagnostics.Localize(locale.Default, message, message.Key()), test.message)
		})
	}
}
