package contentmapper

import (
	"slices"
	"strconv"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// SourceFiles is the canonical output and its unnamed supplemental compiler inputs.
type SourceFiles struct {
	Canonical    *ast.SourceFile
	Supplemental []*ast.SourceFile
}

// TransformAndParse runs the given content mapper's transform for a content-mapped source file and
// parses the resulting TypeScript, preserving the original file name and retaining the untransformed text
// on the source file. The mapper is supplied by the caller (which also owns the failure accounting) so it
// is neither re-resolved nor substituted here. It returns an error if the transform fails or the mapper
// produces invalid position mappings (a *spanmap.MappingError); the caller decides how to report the failure
// and what placeholder file to substitute. It is the shared implementation behind
// CompilerHost.GetContentMappedSourceFile.
func TransformAndParse(
	parseOptions ast.SourceFileParseOptions,
	content string,
	mapper *Mapper,
	project Project,
) (SourceFiles, error) {
	transformIdentity, err := project.Identity(mapper)
	if err != nil {
		return SourceFiles{}, NewTransformError(TransformErrorKindProject, err)
	}
	result, err := project.Transform(mapper, Request{
		FileName: parseOptions.FileName,
		Content:  content,
	})
	if err != nil {
		return SourceFiles{}, err
	}
	return ParseResult(parseOptions, content, mapper, transformIdentity, result)
}

// ParseResult validates and parses one mapper result and all its supplemental outputs.
func ParseResult(parseOptions ast.SourceFileParseOptions, content string, mapper *Mapper, transformIdentity string, result Result) (SourceFiles, error) {
	if result.Mappings == nil {
		return SourceFiles{}, NewTransformError(TransformErrorKindMappings, nil)
	}
	if problem := result.Mappings.Validate(result.Text, content); problem != nil {
		return SourceFiles{}, problem
	}
	virtualExtension := result.VirtualExtension
	if !IsSupportedVirtualExtension(virtualExtension) {
		return SourceFiles{}, NewTransformError(TransformErrorKindResponse, nil)
	}
	baseParseOptions := parseOptions
	virtualFileName := baseParseOptions.FileName.AppendSuffix(virtualExtension)
	parseOptions = baseParseOptions
	if isModuleVirtualExtension(virtualExtension) {
		parseOptions.ExternalModuleIndicatorOptions.Force = true
	}
	sourceFile := parser.ParseSourceFile(parseOptions, result.Text, core.GetScriptKindFromFileName(virtualFileName))
	if len(result.Diagnostics) > 0 {
		// The runner produces diagnostics without a source file (it doesn't have one yet); associate
		// them with the file now so they are reported against it.
		for _, diagnostic := range result.Diagnostics {
			diagnostic.SetFile(sourceFile)
		}
		sourceFile.SetDiagnostics(append(sourceFile.Diagnostics(), result.Diagnostics...))
	}
	files := SourceFiles{Canonical: sourceFile, Supplemental: make([]*ast.SourceFile, 0, len(result.Supplemental))}
	for i, supplemental := range result.Supplemental {
		if supplemental.Mappings == nil {
			return SourceFiles{}, NewTransformError(TransformErrorKindMappings, nil)
		}
		if problem := supplemental.Mappings.Validate(supplemental.Text, content); problem != nil {
			return SourceFiles{}, problem
		}
		supplementalOptions := baseParseOptions
		if !IsSupportedVirtualExtension(supplemental.VirtualExtension) {
			return SourceFiles{}, NewTransformError(TransformErrorKindResponse, nil)
		}
		suffix := "." + strconv.Itoa(i) + supplemental.VirtualExtension
		supplementalOptions.FileName = supplementalOptions.FileName.AppendSuffix(suffix)
		supplementalOptions.PathKey = parseOptions.PathKey.AppendCanonicalSuffix(suffix)
		if isModuleVirtualExtension(supplemental.VirtualExtension) {
			supplementalOptions.ExternalModuleIndicatorOptions.Force = true
		}

		file := parser.ParseSourceFile(supplementalOptions, supplemental.Text, core.GetScriptKindFromFileName(supplementalOptions.FileName))

		files.Supplemental = append(files.Supplemental, file)
	}
	mapperIdentity := mapper.Identity()
	sourceFile.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
		ContentMapper:           mapperIdentity,
		TransformIdentity:       transformIdentity,
		ParseOptions:            baseParseOptions,
		VirtualFileName:         virtualFileName,
		OriginalText:            content,
		SpanMap:                 result.Mappings,
		DiagnosticDirectives:    result.DiagnosticDirectives,
		SupplementalSourceFiles: files.Supplemental,
	})
	for i, file := range files.Supplemental {
		supplemental := result.Supplemental[i]
		file.SetContentMapperInfo(ast.ContentMapperSourceFileInfo{
			ContentMapper:        mapperIdentity,
			TransformIdentity:    transformIdentity,
			ParseOptions:         baseParseOptions,
			VirtualFileName:      file.FileName(),
			OriginalText:         content,
			SpanMap:              supplemental.Mappings,
			DiagnosticDirectives: supplemental.DiagnosticDirectives,
			CanonicalSourceFile:  sourceFile,
		})
	}
	return files, nil
}

func isModuleVirtualExtension(extension string) bool {
	return slices.Contains([]string{tspath.ExtensionMts, tspath.ExtensionCts, tspath.ExtensionMjs, tspath.ExtensionCjs}, extension)
}

// CheckSupplementalFileNameCollisions rejects compiler-assigned virtual filenames that name physical files.
func CheckSupplementalFileNameCollisions(files SourceFiles, fileExists func(tspath.RootedFilePath) bool) error {
	for _, file := range files.Supplemental {
		if fileExists(file.FileName()) {
			return &SupplementalFileCollisionError{FileName: file.FileName()}
		}
	}
	return nil
}
