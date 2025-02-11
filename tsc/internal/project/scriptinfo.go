package project

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type ScriptInfo struct {
	fileName   string
	path       tspath.Path
	realpath   tspath.Path
	isDynamic  bool
	scriptKind core.ScriptKind
	text       string
	version    int
	lineMap    []core.TextPos

	isOpen                bool
	pendingReloadFromDisk bool
	matchesDiskText       bool
	deferredDelete        bool

	containingProjects []*Project
}

func newScriptInfo(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo {
	isDynamic := isDynamicFileName(fileName)
	realpath := core.IfElse(isDynamic, path, "")
	return &ScriptInfo{
		fileName:   fileName,
		path:       path,
		realpath:   realpath,
		isDynamic:  isDynamic,
		scriptKind: scriptKind,
	}
}

func (s *ScriptInfo) FileName() string {
	return s.fileName
}

func (s *ScriptInfo) Path() tspath.Path {
	return s.path
}

func (s *ScriptInfo) LineMap() []core.TextPos {
	if s.lineMap == nil {
		s.lineMap = core.ComputeLineStarts(s.text)
	}
	return s.lineMap
}

func (s *ScriptInfo) Text() string {
	return s.text
}

func (s *ScriptInfo) open(newText string) {
	s.isOpen = true
	s.pendingReloadFromDisk = false
	if newText != s.text {
		s.setText(newText)
		s.matchesDiskText = false
		s.markContainingProjectsAsDirty()
	}
}

func (s *ScriptInfo) setTextFromDisk(newText string) {
	if newText != s.text {
		s.setText(newText)
		s.matchesDiskText = true
	}
}

func (s *ScriptInfo) close(fileExists bool) {
	s.isOpen = false
	if fileExists && !s.pendingReloadFromDisk && !s.matchesDiskText {
		s.pendingReloadFromDisk = true
		s.markContainingProjectsAsDirty()
	}
}

func (s *ScriptInfo) setText(newText string) {
	s.text = newText
	s.version++
	s.lineMap = nil
}

func (s *ScriptInfo) markContainingProjectsAsDirty() {
	for _, project := range s.containingProjects {
		project.markFileAsDirty(s.path)
	}
}

// attachToProject attaches the script info to the project if it's not already attached
// and returns true if the script info was newly attached.
func (s *ScriptInfo) attachToProject(project *Project) bool {
	if !s.isAttached(project) {
		s.containingProjects = append(s.containingProjects, project)
		if project.compilerOptions.PreserveSymlinks != core.TSTrue {
			s.ensureRealpath(project.FS())
		}
		project.onFileAddedOrRemoved(s.isSymlink())
		return true
	}
	return false
}

func (s *ScriptInfo) isAttached(project *Project) bool {
	return slices.Contains(s.containingProjects, project)
}

func (s *ScriptInfo) isSymlink() bool {
	// !!!
	return false
}

func (s *ScriptInfo) isOrphan() bool {
	if s.deferredDelete {
		return true
	}
	for _, project := range s.containingProjects {
		if !project.isOrphan() {
			return false
		}
	}
	return true
}

func (s *ScriptInfo) editContent(change ls.TextChange) {
	s.setText(change.ApplyTo(s.text))
	s.markContainingProjectsAsDirty()
}

func (s *ScriptInfo) ensureRealpath(fs vfs.FS) {
	if s.realpath == "" {
		if len(s.containingProjects) == 0 {
			panic("scriptInfo must be attached to a project before calling ensureRealpath")
		}
		realpath := fs.Realpath(string(s.path))
		project := s.containingProjects[0]
		s.realpath = project.toPath(realpath)
		if s.realpath != s.path {
			project.projectService.recordSymlink(s)
		}
	}
}

func (s *ScriptInfo) getRealpathIfDifferent() (tspath.Path, bool) {
	if s.realpath != "" && s.realpath != s.path {
		return s.realpath, true
	}
	return "", false
}

func (s *ScriptInfo) detachAllProjects() {
	for _, project := range s.containingProjects {
		// !!!
		// if (isConfiguredProject(p)) {
		// 	p.getCachedDirectoryStructureHost().addOrDeleteFile(this.fileName, this.path, FileWatcherEventKind.Deleted);
		// }
		isRoot := project.isRoot(s)
		project.removeFile(s, false /*fileExists*/, false /*detachFromProject*/)
		project.onFileAddedOrRemoved(s.isSymlink())
		if isRoot && project.kind != KindInferred {
			project.addMissingRootFile(s.fileName, s.path)
		}
	}
	s.containingProjects = nil
}

func (s *ScriptInfo) detachFromProject(project *Project) {
	if index := slices.Index(s.containingProjects, project); index != -1 {
		s.containingProjects[index].onFileAddedOrRemoved(s.isSymlink())
		s.containingProjects = slices.Delete(s.containingProjects, index, index+1)
	}
}

func (s *ScriptInfo) delayReloadNonMixedContentFile() {
	if s.isDynamic {
		panic("cannot reload dynamic file")
	}
	s.pendingReloadFromDisk = true
	s.markContainingProjectsAsDirty()
}

func (s *ScriptInfo) getDefaultProject() *Project {
	switch len(s.containingProjects) {
	case 0:
		panic("scriptInfo must be attached to a project before calling getDefaultProject")
	case 1:
		project := s.containingProjects[0]
		if project.deferredClose || project.kind == KindAutoImportProvider || project.kind == KindAuxiliary {
			panic("scriptInfo must be attached to a non-background project before calling getDefaultProject")
		}
		return project
	default:
		// If this file belongs to multiple projects, below is the order in which default project is used
		// - first external project
		// - for open script info, its default configured project during opening is default if info is part of it
		// - first configured project of which script info is not a source of project reference redirect
		// - first configured project
		// - first inferred project
		var firstConfiguredProject *Project
		var firstInferredProject *Project
		var firstNonSourceOfProjectReferenceRedirect *Project
		var defaultConfiguredProject *Project

		for index, project := range s.containingProjects {
			if project.kind == KindConfigured {
				if project.deferredClose {
					continue
				}
				// !!! if !project.isSourceOfProjectReferenceRedirect(s.fileName) {
				if defaultConfiguredProject == nil && index != len(s.containingProjects)-1 {
					defaultConfiguredProject = project.projectService.findDefaultConfiguredProject(s)
				}
				if defaultConfiguredProject == project {
					return project
				}
				if firstNonSourceOfProjectReferenceRedirect == nil {
					firstNonSourceOfProjectReferenceRedirect = project
				}
				// }
				if firstConfiguredProject == nil {
					firstConfiguredProject = project
				}
			} else if firstInferredProject == nil && project.kind == KindInferred {
				firstInferredProject = project
			}
		}
		if defaultConfiguredProject != nil {
			return defaultConfiguredProject
		}
		if firstNonSourceOfProjectReferenceRedirect != nil {
			return firstNonSourceOfProjectReferenceRedirect
		}
		if firstConfiguredProject != nil {
			return firstConfiguredProject
		}
		if firstInferredProject != nil {
			return firstInferredProject
		}
		panic("no project found")
	}
}
