package autoimporttestutil

import (
	"fmt"
	"maps"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

// FileHandle represents a file created for an autoimport lifecycle test.
type FileHandle struct {
	fileName string
	content  string
}

func (f FileHandle) FileName() string         { return f.fileName }
func (f FileHandle) Content() string          { return f.content }
func (f FileHandle) URI() lsproto.DocumentUri { return lsconv.FileNameToDocumentURI(f.fileName) }

// ProjectFileHandle adds export metadata for TypeScript source files.
type ProjectFileHandle struct {
	FileHandle
	exportIdentifier string
}

// NodeModulesPackageHandle describes a generated package under node_modules.
type NodeModulesPackageHandle struct {
	Name        string
	Directory   string
	packageJSON FileHandle
	declaration FileHandle
}

func (p NodeModulesPackageHandle) PackageJSONFile() FileHandle { return p.packageJSON }
func (p NodeModulesPackageHandle) DeclarationFile() FileHandle { return p.declaration }

// MonorepoHandle exposes the generated monorepo layout including root and packages.
type MonorepoHandle struct {
	root             string
	rootNodeModules  []NodeModulesPackageHandle
	rootDependencies []string
	packages         []ProjectHandle
	rootTSConfig     FileHandle
	rootPackageJSON  FileHandle
}

func (m MonorepoHandle) Root() string { return m.root }
func (m MonorepoHandle) RootNodeModules() []NodeModulesPackageHandle {
	return slices.Clone(m.rootNodeModules)
}
func (m MonorepoHandle) RootDependencies() []string { return slices.Clone(m.rootDependencies) }
func (m MonorepoHandle) Packages() []ProjectHandle  { return slices.Clone(m.packages) }
func (m MonorepoHandle) Package(index int) ProjectHandle {
	if index < 0 || index >= len(m.packages) {
		panic(fmt.Sprintf("package index %d out of range", index))
	}
	return m.packages[index]
}
func (m MonorepoHandle) RootTSConfig() FileHandle        { return m.rootTSConfig }
func (m MonorepoHandle) RootPackageJSONFile() FileHandle { return m.rootPackageJSON }

// ProjectHandle exposes the generated project layout for a fixture project root.
type ProjectHandle struct {
	root         string
	files        []ProjectFileHandle
	tsconfig     FileHandle
	packageJSON  FileHandle
	nodeModules  []NodeModulesPackageHandle
	dependencies []string
}

func (p ProjectHandle) Root() string               { return p.root }
func (p ProjectHandle) Files() []ProjectFileHandle { return slices.Clone(p.files) }
func (p ProjectHandle) File(index int) ProjectFileHandle {
	if index < 0 || index >= len(p.files) {
		panic(fmt.Sprintf("file index %d out of range", index))
	}
	return p.files[index]
}
func (p ProjectHandle) TSConfig() FileHandle        { return p.tsconfig }
func (p ProjectHandle) PackageJSONFile() FileHandle { return p.packageJSON }
func (p ProjectHandle) NodeModules() []NodeModulesPackageHandle {
	return slices.Clone(p.nodeModules)
}
func (p ProjectHandle) Dependencies() []string { return slices.Clone(p.dependencies) }

func (p ProjectHandle) NodeModuleByName(name string) *NodeModulesPackageHandle {
	for i := range p.nodeModules {
		if p.nodeModules[i].Name == name {
			return &p.nodeModules[i]
		}
	}
	return nil
}

// Fixture encapsulates a fully-initialized auto import lifecycle test session.
type Fixture struct {
	session  *project.Session
	utils    *projecttestutil.SessionUtils
	projects []ProjectHandle
}

func (f *Fixture) Session() *project.Session            { return f.session }
func (f *Fixture) Utils() *projecttestutil.SessionUtils { return f.utils }
func (f *Fixture) Projects() []ProjectHandle            { return slices.Clone(f.projects) }
func (f *Fixture) Project(index int) ProjectHandle {
	if index < 0 || index >= len(f.projects) {
		panic(fmt.Sprintf("project index %d out of range", index))
	}
	return f.projects[index]
}
func (f *Fixture) SingleProject() ProjectHandle { return f.Project(0) }

// MonorepoFixture encapsulates a fully-initialized monorepo lifecycle test session.
type MonorepoFixture struct {
	session  *project.Session
	utils    *projecttestutil.SessionUtils
	monorepo MonorepoHandle
	extra    []FileHandle
}

func (f *MonorepoFixture) Session() *project.Session            { return f.session }
func (f *MonorepoFixture) Utils() *projecttestutil.SessionUtils { return f.utils }
func (f *MonorepoFixture) Monorepo() MonorepoHandle             { return f.monorepo }
func (f *MonorepoFixture) ExtraFiles() []FileHandle             { return slices.Clone(f.extra) }
func (f *MonorepoFixture) ExtraFile(path string) FileHandle {
	normalized := normalizeAbsolutePath(path)
	for _, handle := range f.extra {
		if handle.fileName == normalized {
			return handle
		}
	}
	panic("extra file not found: " + path)
}

// MonorepoPackageTemplate captures the reusable settings for a package.json scope:
// the node_modules packages that exist alongside the package.json and the dependency
// names that should be written into that package.json. When DependencyNames is empty,
// all available node_modules packages in scope are used.
type MonorepoPackageTemplate struct {
	Name            string
	NodeModuleNames []string
	DependencyNames []string
}

// MonorepoSetupConfig describes the monorepo root and packages to create.
// The embedded MonorepoPackageTemplate describes the monorepo root package located at
// Root. DependencyNames defaults to NodeModuleNames when empty.
// Package.MonorepoPackageTemplate.DependencyNames defaults to the union of the root
// node_modules packages and the package's own NodeModuleNames when empty.
type MonorepoSetupConfig struct {
	Root string
	MonorepoPackageTemplate
	Packages   []MonorepoPackageConfig
	ExtraFiles []TextFileSpec
	Symlinks   []SymlinkSpec
}

type MonorepoPackageConfig struct {
	FileCount int
	MonorepoPackageTemplate
}

// TextFileSpec describes an additional file to place in the fixture.
type TextFileSpec struct {
	Path    string
	Content string
}

// SymlinkSpec describes a symlink to create in the fixture.
type SymlinkSpec struct {
	Link   string // The symlink path
	Target string // The target path the symlink points to
}

// SetupMonorepoLifecycleSession builds a monorepo workspace with root-level node_modules
// and multiple packages, each potentially with their own node_modules.
// The structure is:
//
//	root/
//	├── tsconfig.json (base config)
//	├── package.json
//	├── node_modules/
//	│   └── <rootNodeModuleCount packages>
//	└── packages/
//	    ├── package-a/
//	    │   ├── tsconfig.json
//	    │   ├── package.json
//	    │   ├── node_modules/
//	    │   │   └── <package-specific packages>
//	    │   └── *.ts files
//	    └── package-b/
//	        └── ...
func SetupMonorepoLifecycleSession(t *testing.T, config MonorepoSetupConfig) *MonorepoFixture {
	t.Helper()
	builder := newFileMapBuilder(nil)

	monorepoRoot := normalizeAbsolutePath(config.Root)
	monorepoName := config.MonorepoPackageTemplate.Name
	if monorepoName == "" {
		monorepoName = "monorepo"
	}

	// Add root tsconfig.json
	rootTSConfigPath := tspath.CombinePaths(monorepoRoot, "tsconfig.json")
	rootTSConfigContent := "{\n  \"compilerOptions\": {\n    \"module\": \"esnext\",\n    \"target\": \"esnext\",\n    \"strict\": true,\n    \"baseUrl\": \".\",\n    \"allowJs\": true,\n    \"checkJs\": true\n  }\n}\n"
	builder.AddTextFile(rootTSConfigPath, rootTSConfigContent)
	rootTSConfig := FileHandle{fileName: rootTSConfigPath, content: rootTSConfigContent}

	// Add root node_modules
	rootNodeModulesDir := tspath.CombinePaths(monorepoRoot, "node_modules")
	rootNodeModules := builder.AddNodeModulesPackagesWithNames(rootNodeModulesDir, config.NodeModuleNames)

	// Add root package.json with dependencies (default to all root node_modules if unspecified)
	rootDependencies := selectPackagesByName(rootNodeModules, config.DependencyNames)
	rootPackageJSON := builder.addRootPackageJSON(monorepoRoot, monorepoName, rootDependencies)
	rootDependencyNames := packageNames(rootDependencies)

	// Build each package in packages/
	packagesDir := tspath.CombinePaths(monorepoRoot, "packages")
	packageHandles := make([]ProjectHandle, 0, len(config.Packages))
	for _, pkg := range config.Packages {
		pkgDir := tspath.CombinePaths(packagesDir, pkg.Name)
		builder.AddLocalProject(pkgDir, pkg.FileCount)

		var pkgNodeModules []NodeModulesPackageHandle
		if len(pkg.NodeModuleNames) > 0 {
			pkgNodeModulesDir := tspath.CombinePaths(pkgDir, "node_modules")
			pkgNodeModules = builder.AddNodeModulesPackagesWithNames(pkgNodeModulesDir, pkg.NodeModuleNames)
		}

		availableDeps := append(slices.Clone(rootNodeModules), pkgNodeModules...)
		selectedDeps := selectPackagesByName(availableDeps, pkg.DependencyNames)
		if len(selectedDeps) > 0 {
			builder.AddPackageJSONWithDependenciesNamed(pkgDir, pkg.Name, selectedDeps)
		}
	}

	// Add arbitrary extra files
	extraHandles := make([]FileHandle, 0, len(config.ExtraFiles))
	for _, extra := range config.ExtraFiles {
		builder.AddTextFile(extra.Path, extra.Content)
		extraHandles = append(extraHandles, FileHandle{fileName: normalizeAbsolutePath(extra.Path), content: extra.Content})
	}

	// Add symlinks
	for _, symlink := range config.Symlinks {
		builder.AddSymlink(symlink.Link, symlink.Target)
	}

	// Build project handles after all packages are created
	for _, pkg := range config.Packages {
		pkgDir := tspath.CombinePaths(packagesDir, pkg.Name)
		if record, ok := builder.projects[pkgDir]; ok {
			packageHandles = append(packageHandles, record.toHandles())
		}
	}

	session, sessionUtils := projecttestutil.Setup(builder.Files())
	t.Cleanup(session.Close)

	// Build root node_modules handle by looking at the project record for the workspace root
	// (created as side effect of AddNodeModulesPackages)
	var rootNodeModulesHandles []NodeModulesPackageHandle
	if rootRecord, ok := builder.projects[monorepoRoot]; ok {
		rootNodeModulesHandles = rootRecord.nodeModules
	}

	return &MonorepoFixture{
		session: session,
		utils:   sessionUtils,
		monorepo: MonorepoHandle{
			root:             monorepoRoot,
			rootNodeModules:  rootNodeModulesHandles,
			rootDependencies: rootDependencyNames,
			packages:         packageHandles,
			rootTSConfig:     rootTSConfig,
			rootPackageJSON:  rootPackageJSON,
		},
		extra: extraHandles,
	}
}

// SetupLifecycleSession builds a basic single-project workspace configured with the
// requested number of TypeScript files and a single synthetic node_modules package.
func SetupLifecycleSession(t *testing.T, projectRoot string, fileCount int) *Fixture {
	t.Helper()
	builder := newFileMapBuilder(nil)
	builder.AddLocalProject(projectRoot, fileCount)
	nodeModulesDir := tspath.CombinePaths(projectRoot, "node_modules")
	deps := builder.AddNodeModulesPackages(nodeModulesDir, 1)
	builder.AddPackageJSONWithDependencies(projectRoot, deps)
	session, sessionUtils := projecttestutil.Setup(builder.Files())
	t.Cleanup(session.Close)
	return &Fixture{
		session:  session,
		utils:    sessionUtils,
		projects: builder.projectHandles(),
	}
}

type fileMapBuilder struct {
	files         map[string]any
	nextPackageID int
	nextProjectID int
	projects      map[string]*projectRecord
}

type projectRecord struct {
	root         string
	sourceFiles  []projectFile
	tsconfig     FileHandle
	packageJSON  *FileHandle
	nodeModules  []NodeModulesPackageHandle
	dependencies []string
}

type projectFile struct {
	FileName         string
	ExportIdentifier string
	Content          string
}

func newFileMapBuilder(initial map[string]any) *fileMapBuilder {
	b := &fileMapBuilder{
		files:    make(map[string]any),
		projects: make(map[string]*projectRecord),
	}
	if len(initial) == 0 {
		return b
	}
	for path, content := range initial {
		b.files[normalizeAbsolutePath(path)] = content
	}
	return b
}

func (b *fileMapBuilder) ensureProjectRecord(root string) *projectRecord {
	if record, ok := b.projects[root]; ok {
		return record
	}
	record := &projectRecord{root: root}
	b.projects[root] = record
	return record
}

func (b *fileMapBuilder) projectHandles() []ProjectHandle {
	keys := slices.Collect(maps.Keys(b.projects))
	slices.Sort(keys)
	result := make([]ProjectHandle, 0, len(keys))
	for _, key := range keys {
		result = append(result, b.projects[key].toHandles())
	}
	return result
}

func (r *projectRecord) toHandles() ProjectHandle {
	files := make([]ProjectFileHandle, len(r.sourceFiles))
	for i, file := range r.sourceFiles {
		files[i] = ProjectFileHandle{
			FileHandle:       FileHandle{fileName: file.FileName, content: file.Content},
			exportIdentifier: file.ExportIdentifier,
		}
	}
	packageJSON := FileHandle{}
	if r.packageJSON != nil {
		packageJSON = *r.packageJSON
	}
	return ProjectHandle{
		root:         r.root,
		files:        files,
		tsconfig:     r.tsconfig,
		packageJSON:  packageJSON,
		nodeModules:  slices.Clone(r.nodeModules),
		dependencies: slices.Clone(r.dependencies),
	}
}

func (b *fileMapBuilder) Files() map[string]any {
	return maps.Clone(b.files)
}

func (b *fileMapBuilder) AddTextFile(path string, contents string) {
	b.ensureFiles()
	b.files[normalizeAbsolutePath(path)] = contents
}

// AddSymlink creates a symlink from linkPath to targetPath.
// The targetPath should be an absolute path.
func (b *fileMapBuilder) AddSymlink(linkPath string, targetPath string) {
	b.ensureFiles()
	b.files[normalizeAbsolutePath(linkPath)] = vfstest.Symlink(normalizeAbsolutePath(targetPath))
}

func (b *fileMapBuilder) AddNodeModulesPackages(nodeModulesDir string, count int) []NodeModulesPackageHandle {
	packages := make([]NodeModulesPackageHandle, 0, count)
	for range count {
		packages = append(packages, b.AddNodeModulesPackage(nodeModulesDir))
	}
	return packages
}

func (b *fileMapBuilder) AddNodeModulesPackagesWithNames(nodeModulesDir string, names []string) []NodeModulesPackageHandle {
	if len(names) == 0 {
		return nil
	}
	packages := make([]NodeModulesPackageHandle, 0, len(names))
	for _, name := range names {
		packages = append(packages, b.AddNamedNodeModulesPackage(nodeModulesDir, name))
	}
	return packages
}

func (b *fileMapBuilder) AddNodeModulesPackage(nodeModulesDir string) NodeModulesPackageHandle {
	return b.AddNamedNodeModulesPackage(nodeModulesDir, "")
}

func (b *fileMapBuilder) AddNamedNodeModulesPackage(nodeModulesDir string, name string) NodeModulesPackageHandle {
	b.ensureFiles()
	normalizedDir := normalizeAbsolutePath(nodeModulesDir)
	if tspath.GetBaseFileName(normalizedDir) != "node_modules" {
		panic("nodeModulesDir must point to a node_modules directory: " + nodeModulesDir)
	}
	b.nextPackageID++
	resolvedName := name
	if resolvedName == "" {
		resolvedName = fmt.Sprintf("pkg%d", b.nextPackageID)
	}
	exportName := sanitizeIdentifier(resolvedName) + "_value"
	pkgDir := tspath.CombinePaths(normalizedDir, resolvedName)
	packageJSONPath := tspath.CombinePaths(pkgDir, "package.json")
	packageJSONContent := fmt.Sprintf(`{"name":"%s","types":"index.d.ts"}`, resolvedName)
	b.files[packageJSONPath] = packageJSONContent
	declarationPath := tspath.CombinePaths(pkgDir, "index.d.ts")
	declarationContent := fmt.Sprintf("export declare const %s: number;\n", exportName)
	b.files[declarationPath] = declarationContent
	packageHandle := NodeModulesPackageHandle{
		Name:        resolvedName,
		Directory:   pkgDir,
		packageJSON: FileHandle{fileName: packageJSONPath, content: packageJSONContent},
		declaration: FileHandle{fileName: declarationPath, content: declarationContent},
	}
	projectRoot := tspath.GetDirectoryPath(normalizedDir)
	record := b.ensureProjectRecord(projectRoot)
	record.nodeModules = append(record.nodeModules, packageHandle)
	return packageHandle
}

func (b *fileMapBuilder) AddLocalProject(projectDir string, fileCount int) {
	b.ensureFiles()
	if fileCount < 0 {
		panic("fileCount must be non-negative")
	}
	dir := normalizeAbsolutePath(projectDir)
	record := b.ensureProjectRecord(dir)
	b.nextProjectID++
	tsConfigPath := tspath.CombinePaths(dir, "tsconfig.json")
	tsConfigContent := "{\n  \"compilerOptions\": {\n    \"module\": \"esnext\",\n    \"target\": \"esnext\",\n    \"strict\": true,\n    \"allowJs\": true,\n    \"checkJs\": true\n  }\n}\n"
	b.files[tsConfigPath] = tsConfigContent
	record.tsconfig = FileHandle{fileName: tsConfigPath, content: tsConfigContent}
	for i := 1; i <= fileCount; i++ {
		path := tspath.CombinePaths(dir, fmt.Sprintf("file%d.ts", i))
		exportName := fmt.Sprintf("localExport%d_%d", b.nextProjectID, i)
		content := fmt.Sprintf("export const %s = %d;\n", exportName, i)
		b.files[path] = content
		record.sourceFiles = append(record.sourceFiles, projectFile{FileName: path, ExportIdentifier: exportName, Content: content})
	}
}

func (b *fileMapBuilder) AddPackageJSONWithDependencies(projectDir string, deps []NodeModulesPackageHandle) FileHandle {
	b.nextProjectID++
	return b.AddPackageJSONWithDependenciesNamed(projectDir, fmt.Sprintf("local-project-%d", b.nextProjectID), deps)
}

func (b *fileMapBuilder) AddPackageJSONWithDependenciesNamed(projectDir string, packageName string, deps []NodeModulesPackageHandle) FileHandle {
	b.ensureFiles()
	dir := normalizeAbsolutePath(projectDir)
	packageJSONPath := tspath.CombinePaths(dir, "package.json")
	dependencyLines := make([]string, 0, len(deps))
	for _, dep := range deps {
		dependencyLines = append(dependencyLines, fmt.Sprintf("\"%s\": \"*\"", dep.Name))
	}
	var builder strings.Builder
	name := packageName
	if name == "" {
		b.nextProjectID++
		name = fmt.Sprintf("local-project-%d", b.nextProjectID)
	}
	builder.WriteString(fmt.Sprintf("{\n  \"name\": \"%s\"", name))
	if len(dependencyLines) > 0 {
		builder.WriteString(",\n  \"dependencies\": {\n    ")
		builder.WriteString(strings.Join(dependencyLines, ",\n    "))
		builder.WriteString("\n  }\n")
	} else {
		builder.WriteString("\n")
	}
	builder.WriteString("}\n")
	content := builder.String()
	b.files[packageJSONPath] = content
	record := b.ensureProjectRecord(dir)
	packageHandle := FileHandle{fileName: packageJSONPath, content: content}
	record.packageJSON = &packageHandle
	record.dependencies = packageNames(deps)
	return packageHandle
}

// addRootPackageJSON creates a root package.json for a monorepo without creating a project record.
// This is used to set up the root workspace config without treating it as a project.
func (b *fileMapBuilder) addRootPackageJSON(rootDir string, packageName string, deps []NodeModulesPackageHandle) FileHandle {
	b.ensureFiles()
	dir := normalizeAbsolutePath(rootDir)
	packageJSONPath := tspath.CombinePaths(dir, "package.json")
	dependencyLines := make([]string, 0, len(deps))
	for _, dep := range deps {
		dependencyLines = append(dependencyLines, fmt.Sprintf("\"%s\": \"*\"", dep.Name))
	}
	var builder strings.Builder
	pkgName := packageName
	if pkgName == "" {
		pkgName = "monorepo-root"
	}
	builder.WriteString(fmt.Sprintf("{\n  \"name\": \"%s\",\n  \"private\": true", pkgName))
	if len(dependencyLines) > 0 {
		builder.WriteString(",\n  \"dependencies\": {\n    ")
		builder.WriteString(strings.Join(dependencyLines, ",\n    "))
		builder.WriteString("\n  }\n")
	} else {
		builder.WriteString("\n")
	}
	builder.WriteString("}\n")
	content := builder.String()
	b.files[packageJSONPath] = content
	return FileHandle{fileName: packageJSONPath, content: content}
}

func selectPackagesByName(available []NodeModulesPackageHandle, names []string) []NodeModulesPackageHandle {
	if len(names) == 0 {
		return slices.Clone(available)
	}
	result := make([]NodeModulesPackageHandle, 0, len(names))
	for _, name := range names {
		found := false
		for _, candidate := range available {
			if candidate.Name == name {
				result = append(result, candidate)
				found = true
				break
			}
		}
		if !found {
			panic("dependency not found: " + name)
		}
	}
	return result
}

func packageNames(deps []NodeModulesPackageHandle) []string {
	if len(deps) == 0 {
		return nil
	}
	names := make([]string, 0, len(deps))
	for _, dep := range deps {
		names = append(names, dep.Name)
	}
	return names
}

func sanitizeIdentifier(name string) string {
	sanitized := strings.Map(func(r rune) rune {
		if r >= 'a' && r <= 'z' {
			return r
		}
		if r >= 'A' && r <= 'Z' {
			return r
		}
		if r >= '0' && r <= '9' {
			return r
		}
		if r == '_' || r == '-' {
			return '_'
		}
		return -1
	}, name)
	if sanitized == "" {
		return "pkg"
	}
	return sanitized
}

func (b *fileMapBuilder) ensureFiles() {
	if b.files == nil {
		b.files = make(map[string]any)
	}
}

func normalizeAbsolutePath(path string) string {
	normalized := tspath.NormalizePath(path)
	if !tspath.PathIsAbsolute(normalized) {
		panic("paths used in lifecycle tests must be absolute: " + path)
	}
	return normalized
}
