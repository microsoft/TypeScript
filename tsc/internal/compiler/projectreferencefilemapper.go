package compiler

import (
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
	dtsDirectories              collections.Set[tspath.PathKey]

	configToProjectReference    map[tspath.PathKey]*tsoptions.ParsedCommandLine // All the resolved references needed
	referencesInConfigFile      map[tspath.PathKey][]tspath.PathKey             // Map of config file to its references
	sourceToProjectReference    map[tspath.PathKey]*tsoptions.SourceOutputAndProjectReference
	outputDtsToProjectReference map[tspath.PathKey]*tsoptions.SourceOutputAndProjectReference

	// Store all the realpath from dts in node_modules to source file from project reference needed during parsing so it can be used later
	realpathDtsToSource collections.SyncMap[tspath.PathKey, *tsoptions.SourceOutputAndProjectReference]
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

func (mapper *projectReferenceFileMapper) rootConfigPath() tspath.PathKey {
	if mapper.config.ConfigFile == nil {
		return ""
	}
	return mapper.config.ConfigFile.SourceFile.PathKey()
}

func (mapper *projectReferenceFileMapper) getParseFileRedirect(file ast.HasFileName) (tspath.RootedFilePath, tspath.PathKey) {
	if mapper.useSourceOfProjectReference {
		// Map to source file from project reference
		source := mapper.getProjectReferenceFromOutputDts(file.PathKey())
		if source == nil {
			source, _ = mapper.realpathDtsToSource.Load(file.PathKey())
		}
		if source != nil {
			return source.Source, source.SourcePath
		}
	} else {
		// Map to dts file from project reference
		output := mapper.getProjectReferenceFromSource(file.PathKey())
		if output != nil && output.OutputDts != "" {
			return output.OutputDts, output.OutputDtsPath
		}
	}
	return "", ""
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

func (mapper *projectReferenceFileMapper) getProjectReferenceFromSource(path tspath.PathKey) *tsoptions.SourceOutputAndProjectReference {
	return mapper.sourceToProjectReference[path]
}

func (mapper *projectReferenceFileMapper) getProjectReferenceFromOutputDts(path tspath.PathKey) *tsoptions.SourceOutputAndProjectReference {
	return mapper.outputDtsToProjectReference[path]
}

func (mapper *projectReferenceFileMapper) isSourceFromProjectReference(path tspath.PathKey) bool {
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

func (mapper *projectReferenceFileMapper) getRedirectForResolution(file ast.HasFileName) (*tsoptions.ParsedCommandLine, tspath.RootedFilePath) {
	path := file.PathKey()
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

func (mapper *projectReferenceFileMapper) getResolvedReferenceFor(path tspath.PathKey) (*tsoptions.ParsedCommandLine, bool) {
	config, ok := mapper.configToProjectReference[path]
	return config, ok
}

func (mapper *projectReferenceFileMapper) rangeResolvedProjectReference(
	f func(path tspath.PathKey, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
) bool {
	if len(mapper.config.ProjectReferences()) == 0 {
		return false
	}
	seenRef := collections.NewSetWithSizeHint[tspath.PathKey](len(mapper.referencesInConfigFile))
	rootConfigPath := mapper.rootConfigPath()
	seenRef.Add(rootConfigPath)
	refs := mapper.referencesInConfigFile[rootConfigPath]
	return mapper.rangeResolvedReferenceWorker(refs, f, mapper.config, seenRef)
}

func (mapper *projectReferenceFileMapper) rangeResolvedReferenceWorker(
	references []tspath.PathKey,
	f func(path tspath.PathKey, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
	parent *tsoptions.ParsedCommandLine,
	seenRef *collections.Set[tspath.PathKey],
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
	f func(path tspath.PathKey, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
) bool {
	if childConfig == nil || childConfig.ConfigFile == nil {
		return false
	}
	seenRef := collections.NewSetWithSizeHint[tspath.PathKey](len(mapper.referencesInConfigFile))
	seenRef.Add(childConfig.ConfigFile.SourceFile.PathKey())
	refs := mapper.referencesInConfigFile[childConfig.ConfigFile.SourceFile.PathKey()]
	return mapper.rangeResolvedReferenceWorker(refs, f, mapper.config, seenRef)
}

func (builder *projectReferenceFileMapperBuilder) getParseFileRedirect(file ast.HasFileName) (tspath.RootedFilePath, tspath.PathKey) {
	if builder.useSourceOfProjectReference && builder.getProjectReferenceFromOutputDts(file.PathKey()) == nil {
		builder.resolveSymlink(file)
	}
	return builder.projectReferenceFileMapper.getParseFileRedirect(file)
}

func (builder *projectReferenceFileMapperBuilder) getRedirectForResolution(file ast.HasFileName) (*tsoptions.ParsedCommandLine, tspath.RootedFilePath) {
	if builder.getProjectReferenceFromSource(file.PathKey()) == nil && builder.getProjectReferenceFromOutputDts(file.PathKey()) == nil {
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
	path := file.PathKey()
	_, ok := builder.realpathDtsToSource.Load(path)
	if ok {
		return
	}
	if len(builder.config.ResolvedProjectReferencePaths()) != 0 && builder.config.CompilerOptions().PreserveSymlinks == core.TSTrue {
		fileName := file.FileName()
		if !fileName.ContainsLowercaseDirectorySequence("/node_modules/") {
			builder.realpathDtsToSource.Store(path, nil)
		} else {
			realDeclarationPath := builder.host.FS().CaseSensitivity().PathKey(builder.host.FS().Realpath(tspath.RootedPath(fileName)))
			if realDeclarationPath == path {
				builder.realpathDtsToSource.Store(path, nil)
			} else {
				builder.realpathDtsToSource.Store(path, builder.getProjectReferenceFromOutputDts(realDeclarationPath))
			}
		}
	}
}
