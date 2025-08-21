package compiler

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type projectReferenceFileMapper struct {
	opts   ProgramOptions
	host   module.ResolutionHost
	loader *fileLoader // Only present during populating the mapper and parsing, released after that

	configToProjectReference    map[tspath.Path]*tsoptions.ParsedCommandLine // All the resolved references needed
	referencesInConfigFile      map[tspath.Path][]tspath.Path                // Map of config file to its references
	sourceToProjectReference    map[tspath.Path]*tsoptions.SourceOutputAndProjectReference
	outputDtsToProjectReference map[tspath.Path]*tsoptions.SourceOutputAndProjectReference

	// Store all the realpath from dts in node_modules to source file from project reference needed during parsing so it can be used later
	realpathDtsToSource collections.SyncMap[tspath.Path, *tsoptions.SourceOutputAndProjectReference]
}

func (mapper *projectReferenceFileMapper) getParseFileRedirect(file ast.HasFileName) string {
	if mapper.opts.canUseProjectReferenceSource() {
		// Map to source file from project reference
		source := mapper.getProjectReferenceFromOutputDts(file.Path())
		if source == nil {
			source = mapper.getSourceToDtsIfSymlink(file)
		}
		if source != nil {
			return source.Source
		}
	} else {
		// Map to dts file from project reference
		output := mapper.getProjectReferenceFromSource(file.Path())
		if output != nil && output.OutputDts != "" {
			return output.OutputDts
		}
	}
	return ""
}

func (mapper *projectReferenceFileMapper) getResolvedProjectReferences() []*tsoptions.ParsedCommandLine {
	refs, ok := mapper.referencesInConfigFile[mapper.opts.Config.ConfigFile.SourceFile.Path()]
	var result []*tsoptions.ParsedCommandLine
	if ok {
		result = make([]*tsoptions.ParsedCommandLine, 0, len(refs))
		for _, refPath := range refs {
			refConfig, _ := mapper.configToProjectReference[refPath]
			result = append(result, refConfig)
		}
	}
	return result
}

func (mapper *projectReferenceFileMapper) getProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return mapper.sourceToProjectReference[path]
}

func (mapper *projectReferenceFileMapper) getProjectReferenceFromOutputDts(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return mapper.outputDtsToProjectReference[path]
}

func (mapper *projectReferenceFileMapper) isSourceFromProjectReference(path tspath.Path) bool {
	return mapper.opts.canUseProjectReferenceSource() && mapper.getProjectReferenceFromSource(path) != nil
}

func (mapper *projectReferenceFileMapper) getCompilerOptionsForFile(file ast.HasFileName) *core.CompilerOptions {
	redirect := mapper.getRedirectParsedCommandLineForResolution(file)
	return module.GetCompilerOptionsWithRedirect(mapper.opts.Config.CompilerOptions(), redirect)
}

func (mapper *projectReferenceFileMapper) getRedirectParsedCommandLineForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
	redirect, _ := mapper.getRedirectForResolution(file)
	return redirect
}

func (mapper *projectReferenceFileMapper) getRedirectForResolution(file ast.HasFileName) (*tsoptions.ParsedCommandLine, string) {
	path := file.Path()
	// Check if outputdts of source file from project reference
	output := mapper.getProjectReferenceFromSource(path)
	if output != nil {
		return output.Resolved, output.Source
	}

	// Source file from project reference
	resultFromDts := mapper.getProjectReferenceFromOutputDts(path)
	if resultFromDts != nil {
		return resultFromDts.Resolved, resultFromDts.Source
	}

	realpathDtsToSource := mapper.getSourceToDtsIfSymlink(file)
	if realpathDtsToSource != nil {
		return realpathDtsToSource.Resolved, realpathDtsToSource.Source
	}
	return nil, file.FileName()
}

func (mapper *projectReferenceFileMapper) getResolvedReferenceFor(path tspath.Path) (*tsoptions.ParsedCommandLine, bool) {
	config, ok := mapper.configToProjectReference[path]
	return config, ok
}

func (mapper *projectReferenceFileMapper) forEachResolvedProjectReference(
	fn func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int),
) {
	if mapper.opts.Config.ConfigFile == nil {
		return
	}
	seenRef := collections.NewSetWithSizeHint[tspath.Path](len(mapper.referencesInConfigFile))
	seenRef.Add(mapper.opts.Config.ConfigFile.SourceFile.Path())
	refs := mapper.referencesInConfigFile[mapper.opts.Config.ConfigFile.SourceFile.Path()]
	mapper.forEachResolvedReferenceWorker(refs, fn, mapper.opts.Config, seenRef)
}

func (mapper *projectReferenceFileMapper) forEachResolvedReferenceWorker(
	references []tspath.Path,
	fn func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int),
	parent *tsoptions.ParsedCommandLine,
	seenRef *collections.Set[tspath.Path],
) {
	for index, path := range references {
		if !seenRef.AddIfAbsent(path) {
			continue
		}
		config, _ := mapper.configToProjectReference[path]
		fn(path, config, parent, index)
		mapper.forEachResolvedReferenceWorker(mapper.referencesInConfigFile[path], fn, config, seenRef)
	}
}

func (mapper *projectReferenceFileMapper) getSourceToDtsIfSymlink(file ast.HasFileName) *tsoptions.SourceOutputAndProjectReference {
	// If preserveSymlinks is true, module resolution wont jump the symlink
	// but the resolved real path may be the .d.ts from project reference
	// Note:: Currently we try the real path only if the
	// file is from node_modules to avoid having to run real path on all file paths
	path := file.Path()
	realpathDtsToSource, ok := mapper.realpathDtsToSource.Load(path)
	if ok {
		return realpathDtsToSource
	}
	if mapper.loader != nil && mapper.opts.Config.CompilerOptions().PreserveSymlinks == core.TSTrue {
		fileName := file.FileName()
		if !strings.Contains(fileName, "/node_modules/") {
			mapper.realpathDtsToSource.Store(path, nil)
		} else {
			realDeclarationPath := mapper.loader.toPath(mapper.host.FS().Realpath(fileName))
			if realDeclarationPath == path {
				mapper.realpathDtsToSource.Store(path, nil)
			} else {
				realpathDtsToSource := mapper.getProjectReferenceFromOutputDts(realDeclarationPath)
				if realpathDtsToSource != nil {
					mapper.realpathDtsToSource.Store(path, realpathDtsToSource)
					return realpathDtsToSource
				}
				mapper.realpathDtsToSource.Store(path, nil)
			}
		}
	}
	return nil
}
