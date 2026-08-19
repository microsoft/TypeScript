package lsp

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestContentMapperLoggerRequiresTrace(t *testing.T) {
	t.Parallel()
	var output strings.Builder
	server := &Server{stderr: &output}
	server.logger = newLogger(server)
	logger := server.contentMapperLogger()
	logger("hidden")
	assert.Equal(t, output.String(), "")
	server.logger.SetVerbosity(lsproto.LogVerbosityTrace)
	logger("visible")
	assert.Assert(t, strings.Contains(output.String(), "visible"))
}

func TestParseContentMapperContributions(t *testing.T) {
	t.Parallel()
	version := "2.3.4"
	cwd := "/workspace/mapper"
	compilerOptions := []string{"strict"}
	options := map[string]any{"mode": "embedded"}
	contributions, err := parseContentMapperContributions([]*lsproto.ContentMapperContribution{
		{
			ContributorId: "publisher.extension",
			Extensions:    []string{".vue"},
			InferredProjectContribution: &lsproto.InferredProjectContentMapperContribution{
				Options: &options,
				Manifest: &lsproto.ContentMapperManifest{
					Name:            "Vue mapper",
					Version:         &version,
					Exec:            []string{"node", "mapper.js"},
					Cwd:             &cwd,
					CompilerOptions: &compilerOptions,
				},
			},
		},
		{
			ContributorId: "publisher.extension",
			Extensions:    []string{".svelte"},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(contributions.Mappers), 1)
	assert.DeepEqual(t, contributions.Extensions, []string{".vue"})
	mapper := contributions.Mappers[0]
	assert.Equal(t, mapper.Identity(), "publisher.extension[0] (Vue mapper@2.3.4)")
	assert.Equal(t, mapper.PackageDirectory, cwd)
	assert.Equal(t, string(mapper.Definition.Options), `{"mode":"embedded"}`)
}

func TestParseContentMapperContributionsRejectsConflictingInlineMappers(t *testing.T) {
	t.Parallel()
	inferredProjectContribution := func(name string) *lsproto.InferredProjectContentMapperContribution {
		return &lsproto.InferredProjectContentMapperContribution{Manifest: &lsproto.ContentMapperManifest{Name: name, Exec: []string{name}}}
	}
	_, err := parseContentMapperContributions([]*lsproto.ContentMapperContribution{
		{ContributorId: "first", Extensions: []string{".vue"}, InferredProjectContribution: inferredProjectContribution("first")},
		{ContributorId: "second", Extensions: []string{".vue"}, InferredProjectContribution: inferredProjectContribution("second")},
	})
	assert.ErrorContains(t, err, `both claim extension ".vue"`)
}

func TestParseContentMapperContributionsDefaultsOptionsToObject(t *testing.T) {
	t.Parallel()
	contributions, err := parseContentMapperContributions([]*lsproto.ContentMapperContribution{{
		ContributorId: "publisher.extension",
		Extensions:    []string{".vue"},
		InferredProjectContribution: &lsproto.InferredProjectContentMapperContribution{
			Manifest: &lsproto.ContentMapperManifest{Name: "mapper", Exec: []string{"mapper"}},
		},
	}})
	assert.NilError(t, err)
	assert.Equal(t, string(contributions.Mappers[0].Definition.Options), `{}`)
}
