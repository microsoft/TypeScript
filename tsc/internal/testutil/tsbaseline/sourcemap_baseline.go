package tsbaseline

import (
	"encoding/base64"
	"encoding/json"
	"net/url"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func DoSourcemapBaseline(
	t *testing.T,
	baselinePath string,
	header string,
	options *core.CompilerOptions,
	result *harnessutil.CompilationResult,
	harnessSettings *harnessutil.HarnessOptions,
	opts baseline.Options,
) {
	declMaps := options.GetAreDeclarationMapsEnabled()
	if options.InlineSourceMap.IsTrue() {
		if result.Maps.Size() > 0 && !declMaps {
			t.Fatal("No sourcemap files should be generated if inlineSourceMaps was set.")
		}
		return
	} else if options.SourceMap.IsTrue() || declMaps {
		expectedMapCount := 0
		if options.SourceMap.IsTrue() {
			expectedMapCount += result.GetNumberOfJSFiles( /*includeJSON*/ false)
		}
		if declMaps {
			expectedMapCount += result.GetNumberOfJSFiles( /*includeJSON*/ true)
		}
		if result.Maps.Size() != expectedMapCount {
			t.Fatal("Number of sourcemap files should be same as js files.")
		}

		var sourceMapCode string
		if options.NoEmitOnError.IsTrue() && len(result.Diagnostics) != 0 || result.Maps.Size() == 0 {
			sourceMapCode = baseline.NoContent
		} else {
			var sourceMapCodeBuilder strings.Builder
			for sourceMap := range result.Maps.Values() {
				if sourceMapCodeBuilder.Len() > 0 {
					sourceMapCodeBuilder.WriteString("\r\n")
				}
				sourceMapCodeBuilder.WriteString(fileOutput(sourceMap, harnessSettings))
				if !options.InlineSourceMap.IsTrue() {
					sourceMapCodeBuilder.WriteString(createSourceMapPreviewLink(sourceMap, result))
				}
			}
			sourceMapCode = sourceMapCodeBuilder.String()
		}

		if tspath.FileExtensionIsOneOf(baselinePath, []string{tspath.ExtensionTs, tspath.ExtensionTsx}) {
			baselinePath = tspath.ChangeExtension(baselinePath, tspath.ExtensionJs+".map")
		}

		baseline.Run(t, baselinePath, sourceMapCode, opts)
	}
}

func createSourceMapPreviewLink(sourceMap *harnessutil.TestFile, result *harnessutil.CompilationResult) string {
	var sourcemapJSON sourcemap.RawSourceMap
	if err := json.Unmarshal([]byte(sourceMap.Content), &sourcemapJSON); err != nil {
		panic(err)
	}

	outputJSFile := core.Find(result.Outputs(), func(td *harnessutil.TestFile) bool {
		return strings.HasSuffix(td.UnitName, sourcemapJSON.File)
	})

	// !!! Strada uses a fallible approach to associating inputs and outputs derived from a source map output. The
	// !!! commented logic below should be used after the Strada migration is complete:

	////inputsAndOutputs := result.GetInputsAndOutputsForFile(sourceMap.UnitName)
	////outputJSFile := inputsAndOutputs.Js

	if outputJSFile == nil {
		return ""
	}

	var sourceTDs []*harnessutil.TestFile
	////if len(sourcemapJSON.Sources) == len(inputsAndOutputs.Inputs) {
	////	sourceTDs = inputsAndOutputs.Inputs
	////} else {
	sourceTDs = core.Map(sourcemapJSON.Sources, func(s string) *harnessutil.TestFile {
		return core.Find(result.Inputs(), func(td *harnessutil.TestFile) bool {
			return strings.HasSuffix(td.UnitName, s)
		})
	})
	if slices.Contains(sourceTDs, nil) {
		return ""
	}
	////}

	var hash strings.Builder
	hash.WriteString("\n//// https://sokra.github.io/source-map-visualization#base64,")
	hash.WriteString(base64EncodeChunk(outputJSFile.Content))
	hash.WriteString(",")
	hash.WriteString(base64EncodeChunk(sourceMap.Content))
	for _, td := range sourceTDs {
		hash.WriteString(",")
		hash.WriteString(base64EncodeChunk(td.Content))
	}
	hash.WriteRune('\n')
	return hash.String()
}

func base64EncodeChunk(s string) string {
	s = url.QueryEscape(s)
	s, err := url.QueryUnescape(s)
	if err != nil {
		panic(err)
	}
	return base64.StdEncoding.EncodeToString([]byte(s))
}
