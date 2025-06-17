package compiler

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
)

type projectReferenceParseTask struct {
	loaded     bool
	configName string
	resolved   *tsoptions.ParsedCommandLine
	subTasks   []*projectReferenceParseTask
}

func (t *projectReferenceParseTask) FileName() string {
	return t.configName
}

func (t *projectReferenceParseTask) load(loader *fileLoader) {
	t.loaded = true

	t.resolved = loader.opts.Host.GetResolvedProjectReference(t.configName, loader.toPath(t.configName))
	if t.resolved == nil {
		return
	}
	if t.resolved.SourceToOutput() == nil {
		loader.projectReferenceParseTasks.wg.Queue(func() {
			t.resolved.ParseInputOutputNames()
		})
	}
	subReferences := t.resolved.ResolvedProjectReferencePaths()
	if len(subReferences) == 0 {
		return
	}
	t.subTasks = createProjectReferenceParseTasks(subReferences)
}

func (t *projectReferenceParseTask) getSubTasks() []*projectReferenceParseTask {
	return t.subTasks
}

func (t *projectReferenceParseTask) shouldIncreaseDepth() bool {
	return false
}

func (t *projectReferenceParseTask) shouldElideOnDepth() bool {
	return false
}

func (t *projectReferenceParseTask) isLoaded() bool {
	return t.loaded
}

func createProjectReferenceParseTasks(projectReferences []string) []*projectReferenceParseTask {
	return core.Map(projectReferences, func(configName string) *projectReferenceParseTask {
		return &projectReferenceParseTask{
			configName: configName,
		}
	})
}
