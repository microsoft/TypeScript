package compiler

import (
	"context"
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

func (t *projectReferenceParseTask) parse(ctx context.Context, projectReferenceParser *projectReferenceParser) {
	loader := projectReferenceParser.loader
	if tr := loader.tracing; tr != nil {
		defer tr.Push(tracing.PhaseParse, "parseJsonSourceFileConfigFileContent", map[string]any{"path": t.configName.AsString()}, false)()
	}
	t.resolved = loader.host.GetResolvedProjectReference(t.configName, loader.toPath(t.configName.AsPath()))
	if t.resolved == nil || ctx.Err() != nil {
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

func (p *projectReferenceParser) parse(ctx context.Context, tasks []*projectReferenceParseTask) {
	p.start(ctx, tasks)
	p.wg.RunAndWait()
	if ctx.Err() != nil {
		return
	}
	p.initMapper(ctx, tasks)
}

func (p *projectReferenceParser) start(ctx context.Context, tasks []*projectReferenceParseTask) {
	for i, task := range tasks {
		if ctx.Err() != nil {
			return
		}
		path := p.loader.toPath(task.configName.AsPath())
		if loadedTask, loaded := p.tasksByFileName.LoadOrStore(path, task); loaded {
			// dedup tasks to ensure correct file order, regardless of which task would be started first
			tasks[i] = loadedTask
		} else {
			p.wg.Queue(func() {
				if ctx.Err() != nil {
					return
				}
				task.parse(ctx, p)
				p.start(ctx, task.subTasks)
			})
		}
	}
}

func (p *projectReferenceParser) initMapper(ctx context.Context, tasks []*projectReferenceParseTask) {
	totalReferences := p.tasksByFileName.Size() + 1
	p.loader.projectReferences.configToProjectReference = make(map[tspath.PathKey]*tsoptions.ParsedCommandLine, totalReferences)
	p.loader.projectReferences.referencesInConfigFile = make(map[tspath.PathKey][]tspath.PathKey, totalReferences)
	p.loader.projectReferences.sourceToProjectReference = make(map[tspath.PathKey]*tsoptions.SourceOutputAndProjectReference)
	p.loader.projectReferences.outputDtsToProjectReference = make(map[tspath.PathKey]*tsoptions.SourceOutputAndProjectReference)
	p.loader.projectReferences.referencesInConfigFile[p.loader.projectReferences.rootConfigPath()] = p.initMapperWorker(ctx, tasks, &collections.Set[*projectReferenceParseTask]{})
	p.loader.projectReferences.host = p.loader.projectReferences.resolutionHost(p.loader.projectReferences.host)
}

func (p *projectReferenceParser) initMapperWorker(ctx context.Context, tasks []*projectReferenceParseTask, seen *collections.Set[*projectReferenceParseTask]) []tspath.PathKey {
	if len(tasks) == 0 {
		return nil
	}
	results := make([]tspath.PathKey, 0, len(tasks))
	for _, task := range tasks {
		if ctx.Err() != nil {
			return results
		}
		path := p.loader.toPath(task.configName.AsPath())
		results = append(results, path)
		// ensure we only walk each task once
		if !seen.AddIfAbsent(task) {
			continue
		}
		p.loader.projectReferences.configToProjectReference[path] = task.resolved
		if task.resolved != nil && p.loader.projectReferences.config.ConfigFile != task.resolved.ConfigFile {
			// Map current task's files first, before recursing into subtasks.
			// This matches TypeScript's behavior where child project references
			// overwrite parent entries when a file belongs to multiple projects.
			maps.Copy(p.loader.projectReferences.sourceToProjectReference, task.resolved.SourceToProjectReference())
			maps.Copy(p.loader.projectReferences.outputDtsToProjectReference, task.resolved.OutputDtsToProjectReference())
			if p.loader.projectReferences.useSourceOfProjectReference {
				declDir := task.resolved.CompilerOptions().DeclarationDir
				if declDir == "" {
					declDir = task.resolved.CompilerOptions().OutDir
				}
				if declDir != "" {
					p.loader.projectReferences.dtsDirectories.Add(p.loader.toPath(declDir.AsPath()))
				}
			}
		}
		referencesInConfig := p.initMapperWorker(ctx, task.subTasks, seen)
		p.loader.projectReferences.referencesInConfigFile[path] = referencesInConfig
	}
	return results
}
