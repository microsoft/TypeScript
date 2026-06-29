package project

import (
	"cmp"
	"maps"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ProjectCollection struct {
	toPath             func(fileName string) tspath.Path
	configFileRegistry *ConfigFileRegistry
	// fileDefaultProjects is a map of file paths to the config file path (the key
	// into `configuredProjects`) of the default project for that file. If the file
	// belongs to the inferred project, the value is `inferredProjectName`. This map
	// contains quick lookups for only the associations discovered during the latest
	// snapshot update.
	fileDefaultProjects map[tspath.Path]tspath.Path
	// configuredProjects is the set of loaded projects associated with a tsconfig
	// file, keyed by the config file path.
	configuredProjects map[tspath.Path]*Project
	// openFiles is the set of open file paths associated with the snapshot that owns
	// this project collection.
	openFiles collections.Set[tspath.Path]
	// inferredProject is a fallback project that is used when no configured
	// project can be found for an open file.
	inferredProject *Project
	// apiState tracks the projects and files that API clients have explicitly
	// opened so they are kept loaded across snapshots.
	apiState APIState

	openConfiguredProjectsOnce sync.Once
	openConfiguredProjects     *collections.Set[tspath.Path]
}

// APIState tracks the projects and files that API clients have explicitly opened.
// Opens and closes are ref-counted so multiple API clients don't clobber each
// other, and it is carried across snapshots so API-opened resources stay loaded.
type APIState struct {
	// openProjects is the ref-counted set of projects to keep open for API
	// clients, keyed by config file path. The value is the number of outstanding
	// API opens.
	openProjects map[tspath.Path]int
	// openFiles is the ref-counted set of files to keep open for API clients,
	// keyed by file path. Files with no configured project are loaded into the
	// inferred project.
	openFiles map[tspath.Path]apiOpenedFile
}

func (s APIState) clone() APIState {
	return APIState{
		openProjects: maps.Clone(s.openProjects),
		openFiles:    maps.Clone(s.openFiles),
	}
}

func (s APIState) equals(other APIState) bool {
	return maps.Equal(s.openProjects, other.openProjects) && maps.Equal(s.openFiles, other.openFiles)
}

// apiOpenedFile tracks a file kept open by API clients along with its ref count.
type apiOpenedFile struct {
	fileName string
	refCount int
}

func (c *ProjectCollection) ConfigFileRegistry() *ConfigFileRegistry { return c.configFileRegistry }

func (c *ProjectCollection) ConfiguredProject(path tspath.Path) *Project {
	return c.configuredProjects[path]
}

func (c *ProjectCollection) GetProjectByPath(projectPath tspath.Path) *Project {
	if project, ok := c.configuredProjects[projectPath]; ok {
		return project
	}

	if projectPath == inferredProjectName {
		return c.inferredProject
	}

	return nil
}

// ConfiguredProjects returns all configured projects in a stable order.
func (c *ProjectCollection) ConfiguredProjects() []*Project {
	projects := make([]*Project, 0, len(c.configuredProjects))
	c.fillConfiguredProjects(&projects)
	return projects
}

func (c *ProjectCollection) fillConfiguredProjects(projects *[]*Project) {
	for _, p := range c.configuredProjects {
		*projects = append(*projects, p)
	}
	slices.SortFunc(*projects, func(a, b *Project) int {
		return cmp.Compare(a.Name(), b.Name())
	})
}

// ProjectsByPath returns an ordered map of configured projects keyed by their config file path,
// plus the inferred project, if it exists, with the key `inferredProjectName`.
func (c *ProjectCollection) ProjectsByPath() *collections.OrderedMap[tspath.Path, *Project] {
	projects := collections.NewOrderedMapWithSizeHint[tspath.Path, *Project](
		len(c.configuredProjects) + core.IfElse(c.inferredProject != nil, 1, 0),
	)
	for _, project := range c.ConfiguredProjects() {
		projects.Set(project.configFilePath, project)
	}
	if c.inferredProject != nil {
		projects.Set(inferredProjectName, c.inferredProject)
	}
	return projects
}

// Projects returns all projects, including the inferred project if it exists, in a stable order.
func (c *ProjectCollection) Projects() []*Project {
	if c.inferredProject == nil {
		return c.ConfiguredProjects()
	}
	projects := make([]*Project, 0, len(c.configuredProjects)+1)
	c.fillConfiguredProjects(&projects)
	projects = append(projects, c.inferredProject)
	return projects
}

func (c *ProjectCollection) InferredProject() *Project {
	return c.inferredProject
}

func (c *ProjectCollection) GetProjectsContainingFile(path tspath.Path) []ls.Project {
	var projects []ls.Project
	for _, project := range c.ConfiguredProjects() {
		if project.containsFile(path) {
			projects = append(projects, project)
		}
	}
	if c.inferredProject != nil && c.inferredProject.containsFile(path) {
		projects = append(projects, c.inferredProject)
	}
	return projects
}

// GetOpenConfiguredProjects returns configured projects containing at least one open file.
func (c *ProjectCollection) GetOpenConfiguredProjects() *collections.Set[tspath.Path] {
	c.openConfiguredProjectsOnce.Do(func() {
		openProjects := collections.NewSetWithSizeHint[tspath.Path](len(c.configuredProjects))
		for path := range c.openFiles.Keys() {
			if projectPath, ok := c.fileDefaultProjects[path]; ok && projectPath != inferredProjectName {
				if _, ok := c.configuredProjects[projectPath]; ok {
					openProjects.Add(projectPath)
					continue
				}
			}

			for _, project := range c.configuredProjects {
				if project.containsFile(path) {
					openProjects.Add(project.configFilePath)
				}
			}
		}
		c.openConfiguredProjects = openProjects
	})
	return c.openConfiguredProjects
}

func openFilePaths(overlays map[tspath.Path]*Overlay) collections.Set[tspath.Path] {
	openFiles := collections.Set[tspath.Path]{M: make(map[tspath.Path]struct{}, len(overlays))}
	for path := range overlays {
		openFiles.Add(path)
	}
	return openFiles
}

// !!! result could be cached
func (c *ProjectCollection) GetDefaultProject(path tspath.Path) *Project {
	if result, ok := c.fileDefaultProjects[path]; ok {
		if result == inferredProjectName {
			return c.inferredProject
		}
		return c.configuredProjects[result]
	}

	var (
		containingProjects                       []*Project
		firstConfiguredProject                   *Project
		firstNonSourceOfProjectReferenceRedirect *Project
		multipleDirectInclusions                 bool
	)
	for _, p := range c.ConfiguredProjects() {
		if p.containsFile(path) {
			containingProjects = append(containingProjects, p)
			if !multipleDirectInclusions && !p.IsSourceFromProjectReference(path) {
				if firstNonSourceOfProjectReferenceRedirect == nil {
					firstNonSourceOfProjectReferenceRedirect = p
				} else {
					multipleDirectInclusions = true
				}
			}
			if firstConfiguredProject == nil {
				firstConfiguredProject = p
			}
		}
	}
	if len(containingProjects) == 1 {
		return containingProjects[0]
	}
	if len(containingProjects) == 0 {
		if c.inferredProject != nil && c.inferredProject.containsFile(path) {
			return c.inferredProject
		}
		return nil
	}
	if !multipleDirectInclusions {
		if firstNonSourceOfProjectReferenceRedirect != nil {
			// Multiple projects include the file, but only one is a direct inclusion.
			return firstNonSourceOfProjectReferenceRedirect
		}
		// Multiple projects include the file, and none are direct inclusions.
		return firstConfiguredProject
	}
	// Multiple projects include the file directly.
	if defaultProject := c.findDefaultConfiguredProject(path); defaultProject != nil {
		return defaultProject
	}
	return firstConfiguredProject
}

func (c *ProjectCollection) findDefaultConfiguredProject(path tspath.Path) *Project {
	if configFileName := c.configFileRegistry.GetConfigFileName(path); configFileName != "" {
		return c.findDefaultConfiguredProjectWorker(path, configFileName, nil, nil)
	}
	return nil
}

func (c *ProjectCollection) findDefaultConfiguredProjectWorker(path tspath.Path, configFileName string, visited *collections.SyncSet[*Project], fallback *Project) *Project {
	configFilePath := c.toPath(configFileName)
	project, ok := c.configuredProjects[configFilePath]
	if !ok {
		return nil
	}
	if visited == nil {
		visited = &collections.SyncSet[*Project]{}
	}

	// Look in the config's project and its references recursively.
	search := core.BreadthFirstSearchParallelEx(
		project,
		func(project *Project) []*Project {
			if project.CommandLine == nil {
				return nil
			}
			// A referenced project may not be loaded if `disableReferencedProjectLoad` is true.
			return core.MapNonNil(project.CommandLine.ResolvedProjectReferencePaths(), func(configFileName string) *Project {
				return c.configuredProjects[c.toPath(configFileName)]
			})
		},
		func(project *Project) (isResult bool, stop bool) {
			if project.containsFile(path) {
				return true, !project.IsSourceFromProjectReference(path)
			}
			return false, false
		},
		core.BreadthFirstSearchOptions[*Project, *Project]{
			Visited: visited,
		},
		core.Identity,
	)

	if search.Stopped {
		// If we found a project that directly contains the file, return it.
		return search.Path[0]
	}
	if len(search.Path) > 0 && fallback == nil {
		// If we found a project that contains the file, but it is a source from
		// a project reference, record it as a fallback.
		fallback = search.Path[0]
	}

	// Look for tsconfig.json files higher up the directory tree and do the same. This handles
	// the common case where a higher-level "solution" tsconfig.json contains all projects in a
	// workspace.
	if config := c.configFileRegistry.GetConfig(path); config != nil && config.CompilerOptions().DisableSolutionSearching.IsTrue() {
		return fallback
	}
	if ancestorConfigName := c.configFileRegistry.GetAncestorConfigFileName(path, configFileName); ancestorConfigName != "" {
		return c.findDefaultConfiguredProjectWorker(path, ancestorConfigName, visited, fallback)
	}
	return fallback
}

// clone creates a shallow copy of the project collection.
func (c *ProjectCollection) clone() *ProjectCollection {
	return &ProjectCollection{
		toPath:              c.toPath,
		configFileRegistry:  c.configFileRegistry,
		configuredProjects:  c.configuredProjects,
		openFiles:           c.openFiles,
		inferredProject:     c.inferredProject,
		fileDefaultProjects: c.fileDefaultProjects,
		apiState:            c.apiState,
	}
}

// findDefaultConfiguredProjectFromProgramInclusion finds the default configured project for a file
// based on the file's inclusion in existing projects. The projects should be sorted, as ties will
// be broken by slice order. `getProject` should return a project with an up-to-date program.
// Along with the resulting project path, a boolean is returned indicating whether there were multiple
// direct inclusions of the file in different projects, indicating that the caller may want to perform
// additional logic to determine the best project.
func findDefaultConfiguredProjectFromProgramInclusion(
	fileName string,
	path tspath.Path,
	projectPaths []tspath.Path,
	getProject func(tspath.Path) *Project,
) (result tspath.Path, multipleCandidates bool) {
	var (
		containingProjects                       []tspath.Path
		firstConfiguredProject                   tspath.Path
		firstNonSourceOfProjectReferenceRedirect tspath.Path
		multipleDirectInclusions                 bool
	)

	for _, projectPath := range projectPaths {
		p := getProject(projectPath)
		if p.containsFile(path) {
			containingProjects = append(containingProjects, projectPath)
			if !multipleDirectInclusions && !p.IsSourceFromProjectReference(path) {
				if firstNonSourceOfProjectReferenceRedirect == "" {
					firstNonSourceOfProjectReferenceRedirect = projectPath
				} else {
					multipleDirectInclusions = true
				}
			}
			if firstConfiguredProject == "" {
				firstConfiguredProject = projectPath
			}
		}
	}

	if len(containingProjects) == 1 {
		return containingProjects[0], false
	}
	if !multipleDirectInclusions {
		if firstNonSourceOfProjectReferenceRedirect != "" {
			// Multiple projects include the file, but only one is a direct inclusion.
			return firstNonSourceOfProjectReferenceRedirect, false
		}
		// Multiple projects include the file, and none are direct inclusions.
		return firstConfiguredProject, false
	}
	// Multiple projects include the file directly.
	return firstConfiguredProject, true
}
