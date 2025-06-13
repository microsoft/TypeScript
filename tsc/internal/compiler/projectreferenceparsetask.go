package compiler

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tsoptions"
)

type projectReferenceParseTask struct {
	configName string
	resolved   *tsoptions.ParsedCommandLine
	subTasks   []*projectReferenceParseTask
}

func (t *projectReferenceParseTask) FileName() string {
	return t.configName
}

func (t *projectReferenceParseTask) start(loader *fileLoader) {
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

func getSubTasksOfProjectReferenceParseTask(t *projectReferenceParseTask) []*projectReferenceParseTask {
	return t.subTasks
}

func createProjectReferenceParseTasks(projectReferences []string) []*projectReferenceParseTask {
	return core.Map(projectReferences, func(configName string) *projectReferenceParseTask {
		return &projectReferenceParseTask{
			configName: configName,
		}
	})
}
