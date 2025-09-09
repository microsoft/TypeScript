package compiler

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type projectReferenceParseTask struct {
	configName string
	resolved   *tsoptions.ParsedCommandLine
	subTasks   []*projectReferenceParseTask
}

func (t *projectReferenceParseTask) parse(projectReferenceParser *projectReferenceParser) {
	t.resolved = projectReferenceParser.loader.opts.Host.GetResolvedProjectReference(t.configName, projectReferenceParser.loader.toPath(t.configName))
	if t.resolved == nil {
		return
	}
	t.resolved.ParseInputOutputNames()
	if subReferences := t.resolved.ResolvedProjectReferencePaths(); len(subReferences) > 0 {
		t.subTasks = createProjectReferenceParseTasks(subReferences)
	}
}

func createProjectReferenceParseTasks(projectReferences []string) []*projectReferenceParseTask {
	return core.Map(projectReferences, func(configName string) *projectReferenceParseTask {
		return &projectReferenceParseTask{
			configName: configName,
		}
	})
}

type projectReferenceParser struct {
	loader          *fileLoader
	wg              core.WorkGroup
	tasksByFileName collections.SyncMap[tspath.Path, *projectReferenceParseTask]
}

func (p *projectReferenceParser) parse(tasks []*projectReferenceParseTask) {
	p.loader.projectReferenceFileMapper.loader = p.loader
	p.start(tasks)
	p.wg.RunAndWait()
	p.initMapper(tasks)
}

func (p *projectReferenceParser) start(tasks []*projectReferenceParseTask) {
	for i, task := range tasks {
		path := p.loader.toPath(task.configName)
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
	p.loader.projectReferenceFileMapper.configToProjectReference = make(map[tspath.Path]*tsoptions.ParsedCommandLine, totalReferences)
	p.loader.projectReferenceFileMapper.referencesInConfigFile = make(map[tspath.Path][]tspath.Path, totalReferences)
	p.loader.projectReferenceFileMapper.sourceToProjectReference = make(map[tspath.Path]*tsoptions.SourceOutputAndProjectReference)
	p.loader.projectReferenceFileMapper.outputDtsToProjectReference = make(map[tspath.Path]*tsoptions.SourceOutputAndProjectReference)
	p.loader.projectReferenceFileMapper.referencesInConfigFile[p.loader.opts.Config.ConfigFile.SourceFile.Path()] = p.initMapperWorker(tasks, &collections.Set[*projectReferenceParseTask]{})
	if p.loader.projectReferenceFileMapper.opts.canUseProjectReferenceSource() && len(p.loader.projectReferenceFileMapper.outputDtsToProjectReference) != 0 {
		p.loader.projectReferenceFileMapper.host = newProjectReferenceDtsFakingHost(p.loader)
	}
}

func (p *projectReferenceParser) initMapperWorker(tasks []*projectReferenceParseTask, seen *collections.Set[*projectReferenceParseTask]) []tspath.Path {
	if len(tasks) == 0 {
		return nil
	}
	results := make([]tspath.Path, 0, len(tasks))
	for _, task := range tasks {
		path := p.loader.toPath(task.configName)
		results = append(results, path)
		// ensure we only walk each task once
		if !seen.AddIfAbsent(task) {
			continue
		}
		var referencesInConfig []tspath.Path
		referencesInConfig = p.initMapperWorker(task.subTasks, seen)
		p.loader.projectReferenceFileMapper.configToProjectReference[path] = task.resolved
		p.loader.projectReferenceFileMapper.referencesInConfigFile[path] = referencesInConfig
		if task.resolved == nil || p.loader.projectReferenceFileMapper.opts.Config.ConfigFile == task.resolved.ConfigFile {
			continue
		}
		for key, value := range task.resolved.SourceToProjectReference() {
			p.loader.projectReferenceFileMapper.sourceToProjectReference[key] = value
		}
		for key, value := range task.resolved.OutputDtsToProjectReference() {
			p.loader.projectReferenceFileMapper.outputDtsToProjectReference[key] = value
		}
		if p.loader.projectReferenceFileMapper.opts.canUseProjectReferenceSource() {
			declDir := task.resolved.CompilerOptions().DeclarationDir
			if declDir == "" {
				declDir = task.resolved.CompilerOptions().OutDir
			}
			if declDir != "" {
				p.loader.dtsDirectories.Add(p.loader.toPath(declDir))
			}
		}
	}
	return results
}
