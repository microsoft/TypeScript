package project

import (
	"cmp"
	"slices"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
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
	// inferredProject is a fallback project that is used when no configured
	// project can be found for an open file.
	inferredProject *Project
	// apiOpenedProjects is the set of projects that should be kept open for
	// API clients.
	apiOpenedProjects map[tspath.Path]struct{}
}

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

// !!! result could be cached
func (c *ProjectCollection) GetDefaultProject(fileName string, path tspath.Path) *Project {
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
	if defaultProject := c.findDefaultConfiguredProject(fileName, path); defaultProject != nil {
		return defaultProject
	}
	return firstConfiguredProject
}

func (c *ProjectCollection) findDefaultConfiguredProject(fileName string, path tspath.Path) *Project {
	if configFileName := c.configFileRegistry.GetConfigFileName(path); configFileName != "" {
		return c.findDefaultConfiguredProjectWorker(fileName, path, configFileName, nil, nil)
	}
	return nil
}

func (c *ProjectCollection) findDefaultConfiguredProjectWorker(fileName string, path tspath.Path, configFileName string, visited *collections.SyncSet[*Project], fallback *Project) *Project {
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
			return core.Map(project.CommandLine.ResolvedProjectReferencePaths(), func(configFileName string) *Project {
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
		return c.findDefaultConfiguredProjectWorker(fileName, path, ancestorConfigName, visited, fallback)
	}
	return fallback
}

// clone creates a shallow copy of the project collection.
func (c *ProjectCollection) clone() *ProjectCollection {
	return &ProjectCollection{
		toPath:              c.toPath,
		configuredProjects:  c.configuredProjects,
		inferredProject:     c.inferredProject,
		fileDefaultProjects: c.fileDefaultProjects,
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
