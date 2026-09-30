package compiler

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type projectReferenceFileMapper struct {
	config                      *tsoptions.ParsedCommandLine
	useSourceOfProjectReference bool
	dtsDirectories              collections.Set[tspath.Path]

	configToProjectReference    map[tspath.Path]*tsoptions.ParsedCommandLine // All the resolved references needed
	referencesInConfigFile      map[tspath.Path][]tspath.Path                // Map of config file to its references
	sourceToProjectReference    map[tspath.Path]*tsoptions.SourceOutputAndProjectReference
	outputDtsToProjectReference map[tspath.Path]*tsoptions.SourceOutputAndProjectReference

	// Store all the realpath from dts in node_modules to source file from project reference needed during parsing so it can be used later
	realpathDtsToSource collections.SyncMap[tspath.Path, *tsoptions.SourceOutputAndProjectReference]
}

type projectReferenceFileMapperBuilder struct {
	*projectReferenceFileMapper
	host module.ResolutionHost
}

func (mapper *projectReferenceFileMapper) resolutionHost(host module.ResolutionHost) module.ResolutionHost {
	if mapper.useSourceOfProjectReference && len(mapper.outputDtsToProjectReference) != 0 {
		return newProjectReferenceDtsFakingHost(host, mapper)
	}
	return host
}

func (mapper *projectReferenceFileMapper) rootConfigPath() tspath.Path {
	if mapper.config.ConfigFile == nil {
		return ""
	}
	return mapper.config.ConfigFile.SourceFile.Path()
}

func (mapper *projectReferenceFileMapper) getParseFileRedirect(file ast.HasFileName) string {
	if mapper.useSourceOfProjectReference {
		// Map to source file from project reference
		source := mapper.getProjectReferenceFromOutputDts(file.Path())
		if source == nil {
			source, _ = mapper.realpathDtsToSource.Load(file.Path())
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
	refs, ok := mapper.referencesInConfigFile[mapper.rootConfigPath()]
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
	return mapper.useSourceOfProjectReference && mapper.getProjectReferenceFromSource(path) != nil
}

func (mapper *projectReferenceFileMapper) getCompilerOptionsForFile(file ast.HasFileName) *core.CompilerOptions {
	redirect := mapper.getRedirectParsedCommandLineForResolution(file)
	return module.GetCompilerOptionsWithRedirect(mapper.config.CompilerOptions(), redirect)
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

	realpathDtsToSource, _ := mapper.realpathDtsToSource.Load(path)
	if realpathDtsToSource != nil {
		return realpathDtsToSource.Resolved, realpathDtsToSource.Source
	}
	return nil, file.FileName()
}

func (mapper *projectReferenceFileMapper) getResolvedReferenceFor(path tspath.Path) (*tsoptions.ParsedCommandLine, bool) {
	config, ok := mapper.configToProjectReference[path]
	return config, ok
}

func (mapper *projectReferenceFileMapper) rangeResolvedProjectReference(
	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
) bool {
	if len(mapper.config.ProjectReferences()) == 0 {
		return false
	}
	seenRef := collections.NewSetWithSizeHint[tspath.Path](len(mapper.referencesInConfigFile))
	rootConfigPath := mapper.rootConfigPath()
	seenRef.Add(rootConfigPath)
	refs := mapper.referencesInConfigFile[rootConfigPath]
	return mapper.rangeResolvedReferenceWorker(refs, f, mapper.config, seenRef)
}

func (mapper *projectReferenceFileMapper) rangeResolvedReferenceWorker(
	references []tspath.Path,
	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
	parent *tsoptions.ParsedCommandLine,
	seenRef *collections.Set[tspath.Path],
) bool {
	for index, path := range references {
		if !seenRef.AddIfAbsent(path) {
			continue
		}
		config, _ := mapper.configToProjectReference[path]
		if !f(path, config, parent, index) {
			return false
		}
		if !mapper.rangeResolvedReferenceWorker(mapper.referencesInConfigFile[path], f, config, seenRef) {
			return false
		}
	}
	return true
}

func (mapper *projectReferenceFileMapper) rangeResolvedProjectReferenceInChildConfig(
	childConfig *tsoptions.ParsedCommandLine,
	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
) bool {
	if childConfig == nil || childConfig.ConfigFile == nil {
		return false
	}
	seenRef := collections.NewSetWithSizeHint[tspath.Path](len(mapper.referencesInConfigFile))
	seenRef.Add(childConfig.ConfigFile.SourceFile.Path())
	refs := mapper.referencesInConfigFile[childConfig.ConfigFile.SourceFile.Path()]
	return mapper.rangeResolvedReferenceWorker(refs, f, mapper.config, seenRef)
}

func (builder *projectReferenceFileMapperBuilder) getParseFileRedirect(file ast.HasFileName) string {
	if builder.useSourceOfProjectReference && builder.getProjectReferenceFromOutputDts(file.Path()) == nil {
		builder.resolveSymlink(file)
	}
	return builder.projectReferenceFileMapper.getParseFileRedirect(file)
}

func (builder *projectReferenceFileMapperBuilder) getRedirectForResolution(file ast.HasFileName) (*tsoptions.ParsedCommandLine, string) {
	if builder.getProjectReferenceFromSource(file.Path()) == nil && builder.getProjectReferenceFromOutputDts(file.Path()) == nil {
		builder.resolveSymlink(file)
	}
	return builder.projectReferenceFileMapper.getRedirectForResolution(file)
}

func (builder *projectReferenceFileMapperBuilder) getCompilerOptionsForFile(file ast.HasFileName) *core.CompilerOptions {
	redirect, _ := builder.getRedirectForResolution(file)
	return module.GetCompilerOptionsWithRedirect(builder.config.CompilerOptions(), redirect)
}

func (builder *projectReferenceFileMapperBuilder) getRedirectParsedCommandLineForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
	redirect, _ := builder.getRedirectForResolution(file)
	return redirect
}

func (builder *projectReferenceFileMapperBuilder) resolveSymlink(file ast.HasFileName) {
	// If preserveSymlinks is true, module resolution wont jump the symlink
	// but the resolved real path may be the .d.ts from project reference
	// Note:: Currently we try the real path only if the
	// file is from node_modules to avoid having to run real path on all file paths
	path := file.Path()
	_, ok := builder.realpathDtsToSource.Load(path)
	if ok {
		return
	}
	if len(builder.config.ResolvedProjectReferencePaths()) != 0 && builder.config.CompilerOptions().PreserveSymlinks == core.TSTrue {
		fileName := file.FileName()
		if !strings.Contains(fileName, "/node_modules/") {
			builder.realpathDtsToSource.Store(path, nil)
		} else {
			realDeclarationPath := tspath.ToPath(builder.host.FS().Realpath(fileName), builder.host.GetCurrentDirectory(), builder.host.FS().UseCaseSensitiveFileNames())
			if realDeclarationPath == path {
				builder.realpathDtsToSource.Store(path, nil)
			} else {
				builder.realpathDtsToSource.Store(path, builder.getProjectReferenceFromOutputDts(realDeclarationPath))
			}
		}
	}
}
