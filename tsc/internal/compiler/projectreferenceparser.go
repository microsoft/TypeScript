package compiler

import (
	"maps"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tracing"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type projectReferenceParseTask struct {
	configName tspath.RootedFilePath
	resolved   *tsoptions.ParsedCommandLine
	subTasks   []*projectReferenceParseTask
}

func (t *projectReferenceParseTask) parse(projectReferenceParser *projectReferenceParser) {
	loader := projectReferenceParser.loader
	if tr := loader.opts.Tracing; tr != nil {
		defer tr.Push(tracing.PhaseParse, "parseJsonSourceFileConfigFileContent", map[string]any{"path": t.configName.AsString()}, false)()
	}
	t.resolved = loader.opts.Host.GetResolvedProjectReference(t.configName, loader.caseSensitivity.PathKey(tspath.RootedPath(t.configName)))
	if t.resolved == nil {
		return
	}
	t.resolved.ParseInputOutputNames()
	if subReferences := t.resolved.ResolvedProjectReferencePaths(); len(subReferences) > 0 {
		t.subTasks = createProjectReferenceParseTasks(subReferences)
	}
}

func createProjectReferenceParseTasks(projectReferences []tspath.RootedFilePath) []*projectReferenceParseTask {
	return core.Map(projectReferences, func(configName tspath.RootedFilePath) *projectReferenceParseTask {
		return &projectReferenceParseTask{
			configName: configName,
		}
	})
}

type projectReferenceParser struct {
	loader          *fileLoader
	wg              core.WorkGroup
	tasksByFileName collections.SyncMap[tspath.PathKey, *projectReferenceParseTask]
}

func (p *projectReferenceParser) parse(tasks []*projectReferenceParseTask) {
	p.loader.projectReferenceFileMapper.loader = p.loader
	p.start(tasks)
	p.wg.RunAndWait()
	p.initMapper(tasks)
}

func (p *projectReferenceParser) start(tasks []*projectReferenceParseTask) {
	for i, task := range tasks {
		path := p.loader.caseSensitivity.PathKey(tspath.RootedPath(task.configName))
		if loadedTask, loaded := p.tasksByFileName.LoadOrStore(path, task); loaded {
			// dedup tasks to ensure correct file order, regardless of which task would be started first
			tasks[i] = loadedTask
		} else {
			p.wg.Queue(func() {
				task.parse(p)
				p.start(task.subTasks)
			})
		}
	}
}

func (p *projectReferenceParser) initMapper(tasks []*projectReferenceParseTask) {
	totalReferences := p.tasksByFileName.Size() + 1
	p.loader.projectReferenceFileMapper.configToProjectReference = make(map[tspath.PathKey]*tsoptions.ParsedCommandLine, totalReferences)
	p.loader.projectReferenceFileMapper.referencesInConfigFile = make(map[tspath.PathKey][]tspath.PathKey, totalReferences)
	p.loader.projectReferenceFileMapper.sourceToProjectReference = make(map[tspath.PathKey]*tsoptions.SourceOutputAndProjectReference)
	p.loader.projectReferenceFileMapper.outputDtsToProjectReference = make(map[tspath.PathKey]*tsoptions.SourceOutputAndProjectReference)
	p.loader.projectReferenceFileMapper.referencesInConfigFile[p.loader.projectReferenceFileMapper.rootConfigPathKey()] = p.initMapperWorker(tasks, &collections.Set[*projectReferenceParseTask]{})
	if p.loader.projectReferenceFileMapper.opts.canUseProjectReferenceSource() && len(p.loader.projectReferenceFileMapper.outputDtsToProjectReference) != 0 {
		p.loader.projectReferenceFileMapper.host = newProjectReferenceDtsFakingHost(p.loader)
	}
}

func (p *projectReferenceParser) initMapperWorker(tasks []*projectReferenceParseTask, seen *collections.Set[*projectReferenceParseTask]) []tspath.PathKey {
	if len(tasks) == 0 {
		return nil
	}
	results := make([]tspath.PathKey, 0, len(tasks))
	for _, task := range tasks {
		path := p.loader.caseSensitivity.PathKey(tspath.RootedPath(task.configName))
		results = append(results, path)
		// ensure we only walk each task once
		if !seen.AddIfAbsent(task) {
			continue
		}
		p.loader.projectReferenceFileMapper.configToProjectReference[path] = task.resolved
		if task.resolved != nil && p.loader.projectReferenceFileMapper.opts.Config.ConfigFile != task.resolved.ConfigFile {
			// Map current task's files first, before recursing into subtasks.
			// This matches TypeScript's behavior where child project references
			// overwrite parent entries when a file belongs to multiple projects.
			maps.Copy(p.loader.projectReferenceFileMapper.sourceToProjectReference, task.resolved.SourceToProjectReference())
			maps.Copy(p.loader.projectReferenceFileMapper.outputDtsToProjectReference, task.resolved.OutputDtsToProjectReference())
			if p.loader.projectReferenceFileMapper.opts.canUseProjectReferenceSource() {
				declDir := task.resolved.CompilerOptions().DeclarationDir
				if declDir == "" {
					declDir = task.resolved.CompilerOptions().OutDir
				}
				if declDir != "" {
					p.loader.dtsDirectories.Add(p.loader.caseSensitivity.PathKey(declDir.AsPath()))
				}
			}
		}
		referencesInConfig := p.initMapperWorker(task.subTasks, seen)
		p.loader.projectReferenceFileMapper.referencesInConfigFile[path] = referencesInConfig
	}
	return results
}
