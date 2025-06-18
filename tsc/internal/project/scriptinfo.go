package project

import (
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

var _ ls.Script = (*ScriptInfo)(nil)

type ScriptInfo struct {
	fileName   string
	path       tspath.Path
	realpath   tspath.Path
	isDynamic  bool
	scriptKind core.ScriptKind
	text       string
	version    int
	lineMap    *ls.LineMap

	pendingReloadFromDisk bool
	matchesDiskText       bool
	deferredDelete        bool

	containingProjectsMu sync.RWMutex
	containingProjects   []*Project

	fs vfs.FS
}

func NewScriptInfo(fileName string, path tspath.Path, scriptKind core.ScriptKind, fs vfs.FS) *ScriptInfo {
	isDynamic := isDynamicFileName(fileName)
	realpath := core.IfElse(isDynamic, path, "")
	return &ScriptInfo{
		fileName:   fileName,
		path:       path,
		realpath:   realpath,
		isDynamic:  isDynamic,
		scriptKind: scriptKind,
		fs:         fs,
	}
}

func (s *ScriptInfo) FileName() string {
	return s.fileName
}

func (s *ScriptInfo) Path() tspath.Path {
	return s.path
}

func (s *ScriptInfo) LineMap() *ls.LineMap {
	if s.lineMap == nil {
		s.lineMap = ls.ComputeLineStarts(s.Text())
	}
	return s.lineMap
}

func (s *ScriptInfo) Text() string {
	s.reloadIfNeeded()
	return s.text
}

func (s *ScriptInfo) Version() int {
	s.reloadIfNeeded()
	return s.version
}

func (s *ScriptInfo) ContainingProjects() []*Project {
	s.containingProjectsMu.RLock()
	defer s.containingProjectsMu.RUnlock()
	return slices.Clone(s.containingProjects)
}

func (s *ScriptInfo) reloadIfNeeded() {
	if s.pendingReloadFromDisk {
		if newText, ok := s.fs.ReadFile(s.fileName); ok {
			s.SetTextFromDisk(newText)
		}
	}
}

func (s *ScriptInfo) open(newText string) {
	s.pendingReloadFromDisk = false
	if newText != s.text {
		s.setText(newText)
		s.matchesDiskText = false
		s.markContainingProjectsAsDirty()
	}
}

func (s *ScriptInfo) SetTextFromDisk(newText string) {
	if newText != s.text {
		s.setText(newText)
		s.matchesDiskText = true
	}
}

func (s *ScriptInfo) close(fileExists bool) {
	if fileExists && !s.pendingReloadFromDisk && !s.matchesDiskText {
		s.pendingReloadFromDisk = true
		s.markContainingProjectsAsDirty()
	}

	s.containingProjectsMu.Lock()
	defer s.containingProjectsMu.Unlock()
	for _, project := range slices.Clone(s.containingProjects) {
		if project.kind == KindInferred && project.isRoot(s) {
			project.RemoveFile(s, fileExists)
			s.detachFromProjectLocked(project)
		}
	}
}

func (s *ScriptInfo) setText(newText string) {
	s.text = newText
	s.version++
	s.lineMap = nil
}

func (s *ScriptInfo) markContainingProjectsAsDirty() {
	s.containingProjectsMu.RLock()
	defer s.containingProjectsMu.RUnlock()
	for _, project := range s.containingProjects {
		project.MarkFileAsDirty(s.path)
	}
}

// attachToProject attaches the script info to the project if it's not already attached
// and returns true if the script info was newly attached.
func (s *ScriptInfo) attachToProject(project *Project) bool {
	if s.isAttached(project) {
		return false
	}
	s.containingProjectsMu.Lock()
	if s.isAttachedLocked(project) {
		s.containingProjectsMu.Unlock()
		return false
	}
	s.containingProjects = append(s.containingProjects, project)
	s.containingProjectsMu.Unlock()
	if project.compilerOptions.PreserveSymlinks != core.TSTrue {
		s.ensureRealpath(project)
	}
	project.onFileAddedOrRemoved()
	return true
}

func (s *ScriptInfo) isAttached(project *Project) bool {
	s.containingProjectsMu.RLock()
	defer s.containingProjectsMu.RUnlock()
	return s.isAttachedLocked(project)
}

func (s *ScriptInfo) isAttachedLocked(project *Project) bool {
	return slices.Contains(s.containingProjects, project)
}

func (s *ScriptInfo) isOrphan() bool {
	if s.deferredDelete {
		return true
	}
	s.containingProjectsMu.RLock()
	defer s.containingProjectsMu.RUnlock()
	for _, project := range s.containingProjects {
		if !project.isOrphan() {
			return false
		}
	}
	return true
}

func (s *ScriptInfo) editContent(change core.TextChange) {
	s.setText(change.ApplyTo(s.Text()))
	s.markContainingProjectsAsDirty()
}

func (s *ScriptInfo) ensureRealpath(project *Project) {
	if s.realpath == "" {
		realpath := project.FS().Realpath(string(s.path))
		s.realpath = project.toPath(realpath)
		if s.realpath != s.path {
			project.host.DocumentStore().AddRealpathMapping(s)
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
	s.containingProjectsMu.Lock()
	defer s.containingProjectsMu.Unlock()
	for _, project := range s.containingProjects {
		// !!!
		// if (isConfiguredProject(p)) {
		// 	p.getCachedDirectoryStructureHost().addOrDeleteFile(this.fileName, this.path, FileWatcherEventKind.Deleted);
		// }
		project.RemoveFile(s, false /*fileExists*/)
	}
	s.containingProjects = nil
}

func (s *ScriptInfo) detachFromProject(project *Project) {
	s.containingProjectsMu.Lock()
	defer s.containingProjectsMu.Unlock()
	s.detachFromProjectLocked(project)
}

func (s *ScriptInfo) detachFromProjectLocked(project *Project) {
	if index := slices.Index(s.containingProjects, project); index != -1 {
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

func (s *ScriptInfo) containedByDeferredClosedProject() bool {
	s.containingProjectsMu.RLock()
	defer s.containingProjectsMu.RUnlock()
	return slices.ContainsFunc(s.containingProjects, func(project *Project) bool {
		return project.deferredClose
	})
}
