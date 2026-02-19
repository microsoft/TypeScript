package fourslash

import (
	"fmt"
	"io"
	"iter"
	"maps"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/json"

	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/fsbaselineutil"
	"github.com/microsoft/typescript-go/internal/testutil/lsptestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"gotest.tools/v3/assert"
)

type stateBaseline struct {
	baseline      strings.Builder
	fsDiffer      *fsbaselineutil.FSDiffer
	isInitialized bool

	serializedProjects           map[string]projectInfo
	serializedOpenFiles          map[string]*openFileInfo
	serializedConfigFileRegistry *project.ConfigFileRegistry
}

func newStateBaseline(fsFromMap iovfs.FsWithSys) *stateBaseline {
	stateBaseline := &stateBaseline{
		fsDiffer: &fsbaselineutil.FSDiffer{
			FS:           fsFromMap,
			WrittenFiles: &collections.SyncSet[string]{},
		},
	}
	fmt.Fprintf(&stateBaseline.baseline, "UseCaseSensitiveFileNames: %v\n", fsFromMap.UseCaseSensitiveFileNames())
	stateBaseline.fsDiffer.BaselineFSwithDiff(&stateBaseline.baseline)
	return stateBaseline
}

type requestOrMessage struct {
	Method lsproto.Method `json:"method"`
	Params any            `json:"params,omitzero"`
}

func (f *FourslashTest) baselineRequestOrNotification(t *testing.T, method lsproto.Method, params any) {
	t.Helper()

	if !f.testData.isStateBaseliningEnabled() {
		return
	}

	res, _ := json.Marshal(requestOrMessage{method, params}, json.WithIndent("  "))
	f.stateBaseline.baseline.WriteString("\n" + string(res) + "\n")
	f.stateBaseline.isInitialized = true
}

func (f *FourslashTest) baselineProjectsAfterNotification(t *testing.T, fileName string) {
	t.Helper()
	if !f.testData.isStateBaseliningEnabled() {
		return
	}
	// Do hover so we have snapshot to check things on!!
	_, _, resultOk := lsptestutil.SendRequest(t, f.client, lsproto.TextDocumentHoverInfo, &lsproto.HoverParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(fileName),
		},
		Position: lsproto.Position{
			Line:      uint32(0),
			Character: uint32(0),
		},
	})
	assert.Assert(t, resultOk)
	f.baselineState(t)
}

func (f *FourslashTest) baselineState(t *testing.T) {
	t.Helper()

	if !f.testData.isStateBaseliningEnabled() {
		return
	}

	serialized := f.serializedState(t)
	if serialized != "" {
		f.stateBaseline.baseline.WriteString("\n")
		f.stateBaseline.baseline.WriteString(serialized)
	}
}

func (f *FourslashTest) serializedState(t *testing.T) string {
	t.Helper()

	var builder strings.Builder
	f.stateBaseline.fsDiffer.BaselineFSwithDiff(&builder)
	if strings.TrimSpace(builder.String()) == "" {
		builder.Reset()
	}

	f.printStateDiff(t, &builder)
	return builder.String()
}

type projectInfo = *compiler.Program

type openFileInfo struct {
	defaultProjectName string
	allProjects        []string
}

type diffTableOptions struct {
	indent   string
	sortKeys bool
}

type diffTable struct {
	diff    collections.OrderedMap[string, string]
	options diffTableOptions
}

func (d *diffTable) add(key, value string) {
	d.diff.Set(key, value)
}

func (d *diffTable) print(w io.Writer, header string) {
	count := d.diff.Size()
	if count == 0 {
		return
	}
	if header != "" {
		fmt.Fprintf(w, "%s%s\n", d.options.indent, header)
	}
	diffKeys := make([]string, 0, count)
	keyWidth := 0
	indent := d.options.indent + "  "
	for key := range d.diff.Keys() {
		keyWidth = max(keyWidth, len(key))
		diffKeys = append(diffKeys, key)
	}
	if d.options.sortKeys {
		slices.Sort(diffKeys)
	}

	for _, key := range diffKeys {
		value := d.diff.GetOrZero(key)
		fmt.Fprintf(w, "%s%-*s %s\n", indent, keyWidth+1, key, value)
	}
}

type diffTableWriter struct {
	hasChange bool
	header    string
	diffs     map[string]func(io.Writer)
}

func newDiffTableWriter(header string) *diffTableWriter {
	return &diffTableWriter{header: header, diffs: make(map[string]func(io.Writer))}
}

func (d *diffTableWriter) setHasChange() {
	d.hasChange = true
}

func (d *diffTableWriter) add(key string, fn func(io.Writer)) {
	d.diffs[key] = fn
}

func (d *diffTableWriter) print(w io.Writer) {
	if d.hasChange {
		fmt.Fprintf(w, "%s::\n", d.header)
		keys := slices.Collect(maps.Keys(d.diffs))
		slices.Sort(keys)
		for _, key := range keys {
			d.diffs[key](w)
		}
	}
}

func areIterSeqEqual(a, b iter.Seq[tspath.Path]) bool {
	aSlice := slices.Collect(a)
	bSlice := slices.Collect(b)
	slices.Sort(aSlice)
	slices.Sort(bSlice)
	return slices.Equal(aSlice, bSlice)
}

func printSlicesWithDiffTable(w io.Writer, header string, newSlice []string, getOldSlice func() []string, options diffTableOptions, topChange string, isDefault func(entry string) bool) {
	var oldSlice []string
	if topChange == "*modified*" {
		oldSlice = getOldSlice()
	}
	table := diffTable{options: options}
	for _, entry := range newSlice {
		entryChange := ""
		if isDefault != nil && isDefault(entry) {
			entryChange = "(default) "
		}
		if topChange == "*modified*" && !slices.Contains(oldSlice, entry) {
			entryChange = "*new*"
		}
		table.add(entry, entryChange)
	}
	if topChange == "*modified*" {
		for _, entry := range oldSlice {
			if !slices.Contains(newSlice, entry) {
				table.add(entry, "*deleted*")
			}
		}
	}
	table.print(w, header)
}

func sliceFromIterSeqPath(seq iter.Seq[tspath.Path]) []string {
	var result []string
	for path := range seq {
		result = append(result, string(path))
	}
	slices.Sort(result)
	return result
}

func printPathIterSeqWithDiffTable(w io.Writer, header string, newIterSeq iter.Seq[tspath.Path], getOldIterSeq func() iter.Seq[tspath.Path], options diffTableOptions, topChange string) {
	printSlicesWithDiffTable(
		w,
		header,
		sliceFromIterSeqPath(newIterSeq),
		func() []string { return sliceFromIterSeqPath(getOldIterSeq()) },
		options,
		topChange,
		nil,
	)
}

func (f *FourslashTest) printStateDiff(t *testing.T, w io.Writer) {
	if !f.stateBaseline.isInitialized {
		return
	}
	session := f.client.Server.Session()
	snapshot, release := session.Snapshot()
	defer release()

	f.printProjectsDiff(t, snapshot, w)
	f.printOpenFilesDiff(t, snapshot, w)
	f.printConfigFileRegistryDiff(t, snapshot, w)
}

func (f *FourslashTest) printProjectsDiff(t *testing.T, snapshot *project.Snapshot, w io.Writer) {
	t.Helper()

	currentProjects := make(map[string]projectInfo)
	options := diffTableOptions{indent: "  "}
	projectsDiffTable := newDiffTableWriter("Projects")

	for _, project := range snapshot.ProjectCollection.Projects() {
		program := project.GetProgram()
		var oldProgram *compiler.Program
		currentProjects[project.Name()] = program
		projectChange := ""
		if existing, ok := f.stateBaseline.serializedProjects[project.Name()]; ok {
			oldProgram = existing
			if oldProgram != program {
				projectChange = "*modified*"
				projectsDiffTable.setHasChange()
			} else {
				projectChange = ""
			}
		} else {
			projectChange = "*new*"
			projectsDiffTable.setHasChange()
		}

		projectsDiffTable.add(project.Name(), func(w io.Writer) {
			fmt.Fprintf(w, "  [%s] %s\n", project.Name(), projectChange)
			subDiff := diffTable{options: options}
			if program != nil {
				for _, file := range program.GetSourceFiles() {
					fileDiff := ""
					// No need to write "*new*" for files as its obvious
					fileName := file.FileName()
					if projectChange == "*modified*" {
						if oldProgram == nil {
							if !isLibFile(fileName) {
								fileDiff = "*new*"
							}
						} else if oldFile := oldProgram.GetSourceFileByPath(file.Path()); oldFile == nil {
							fileDiff = "*new*"
						} else if oldFile != file {
							fileDiff = "*modified*"
						}
					}
					if fileDiff != "" || !isLibFile(fileName) {
						subDiff.add(fileName, fileDiff)
					}
				}
			}
			if oldProgram != program && oldProgram != nil {
				for _, file := range oldProgram.GetSourceFiles() {
					if program == nil || program.GetSourceFileByPath(file.Path()) == nil {
						subDiff.add(file.FileName(), "*deleted*")
					}
				}
			}
			subDiff.print(w, "")
		})
	}

	for projectName, info := range f.stateBaseline.serializedProjects {
		if _, found := currentProjects[projectName]; !found {
			projectsDiffTable.setHasChange()
			projectsDiffTable.add(projectName, func(w io.Writer) {
				fmt.Fprintf(w, "  [%s] *deleted*\n", projectName)
				subDiff := diffTable{options: options}
				if info != nil {
					for _, file := range info.GetSourceFiles() {
						if fileName := file.FileName(); !isLibFile(fileName) {
							subDiff.add(fileName, "")
						}
					}
				}
				subDiff.print(w, "")
			})
		}
	}
	f.stateBaseline.serializedProjects = currentProjects
	projectsDiffTable.print(w)
}

func (f *FourslashTest) printOpenFilesDiff(t *testing.T, snapshot *project.Snapshot, w io.Writer) {
	t.Helper()

	currentOpenFiles := make(map[string]*openFileInfo)
	filesDiffTable := newDiffTableWriter("Open Files")
	options := diffTableOptions{indent: "  ", sortKeys: true}
	for fileName := range f.openFiles {
		path := tspath.ToPath(fileName, "/", f.vfs.UseCaseSensitiveFileNames())
		defaultProject := snapshot.ProjectCollection.GetDefaultProject(path)
		newFileInfo := &openFileInfo{}
		if defaultProject != nil {
			newFileInfo.defaultProjectName = defaultProject.Name()
		}
		for _, project := range snapshot.ProjectCollection.Projects() {
			if program := project.GetProgram(); program != nil && program.GetSourceFileByPath(path) != nil {
				newFileInfo.allProjects = append(newFileInfo.allProjects, project.Name())
			}
		}
		slices.Sort(newFileInfo.allProjects)
		currentOpenFiles[fileName] = newFileInfo
		openFileChange := ""
		var oldFileInfo *openFileInfo
		if existing, ok := f.stateBaseline.serializedOpenFiles[fileName]; ok {
			oldFileInfo = existing
			if existing.defaultProjectName != newFileInfo.defaultProjectName || !slices.Equal(existing.allProjects, newFileInfo.allProjects) {
				openFileChange = "*modified*"
				filesDiffTable.setHasChange()
			} else {
				openFileChange = ""
			}
		} else {
			openFileChange = "*new*"
			filesDiffTable.setHasChange()
		}

		filesDiffTable.add(fileName, func(w io.Writer) {
			fmt.Fprintf(w, "  [%s] %s\n", fileName, openFileChange)
			printSlicesWithDiffTable(
				w,
				"",
				newFileInfo.allProjects,
				func() []string { return oldFileInfo.allProjects },
				options,
				openFileChange,
				func(projectName string) bool { return projectName == newFileInfo.defaultProjectName },
			)
		})
	}
	for fileName := range f.stateBaseline.serializedOpenFiles {
		if _, found := currentOpenFiles[fileName]; !found {
			filesDiffTable.setHasChange()
			filesDiffTable.add(fileName, func(w io.Writer) {
				fmt.Fprintf(w, "  [%s] *closed*\n", fileName)
			})
		}
	}
	f.stateBaseline.serializedOpenFiles = currentOpenFiles
	filesDiffTable.print(w)
}

func (f *FourslashTest) printConfigFileRegistryDiff(t *testing.T, snapshot *project.Snapshot, w io.Writer) {
	t.Helper()
	configFileRegistry := snapshot.ProjectCollection.ConfigFileRegistry()

	configDiffsTable := newDiffTableWriter("Config")
	configFileNamesDiffsTable := newDiffTableWriter("Config File Names")

	if f.stateBaseline.serializedConfigFileRegistry == configFileRegistry {
		return
	}
	options := diffTableOptions{indent: "    ", sortKeys: true}
	configFileRegistry.ForEachTestConfigEntry(func(path tspath.Path, entry *project.TestConfigEntry) {
		configChange := ""
		oldEntry := f.stateBaseline.serializedConfigFileRegistry.GetTestConfigEntry(path)
		if oldEntry == nil {
			configChange = "*new*"
			configDiffsTable.setHasChange()
		} else if oldEntry != entry {
			if !areIterSeqEqual(oldEntry.RetainingProjects, entry.RetainingProjects) ||
				!areIterSeqEqual(oldEntry.RetainingOpenFiles, entry.RetainingOpenFiles) ||
				!areIterSeqEqual(oldEntry.RetainingConfigs, entry.RetainingConfigs) {
				configChange = "*modified*"
				configDiffsTable.setHasChange()
			}
		}
		configDiffsTable.add(string(path), func(w io.Writer) {
			fmt.Fprintf(w, "  [%s] %s\n", entry.FileName, configChange)
			// Print the details of the config entry
			var retainingProjectsModified string
			var retainingOpenFilesModified string
			var retainingConfigsModified string
			if configChange == "*modified*" {
				if !areIterSeqEqual(entry.RetainingProjects, oldEntry.RetainingProjects) {
					retainingProjectsModified = " *modified*"
				}
				if !areIterSeqEqual(entry.RetainingOpenFiles, oldEntry.RetainingOpenFiles) {
					retainingOpenFilesModified = " *modified*"
				}
				if !areIterSeqEqual(entry.RetainingConfigs, oldEntry.RetainingConfigs) {
					retainingConfigsModified = " *modified*"
				}
			}
			printPathIterSeqWithDiffTable(w, "RetainingProjects:"+retainingProjectsModified, entry.RetainingProjects, func() iter.Seq[tspath.Path] { return oldEntry.RetainingProjects }, options, configChange)
			printPathIterSeqWithDiffTable(w, "RetainingOpenFiles:"+retainingOpenFilesModified, entry.RetainingOpenFiles, func() iter.Seq[tspath.Path] { return oldEntry.RetainingOpenFiles }, options, configChange)
			printPathIterSeqWithDiffTable(w, "RetainingConfigs:"+retainingConfigsModified, entry.RetainingConfigs, func() iter.Seq[tspath.Path] { return oldEntry.RetainingConfigs }, options, configChange)
		})
	})
	configFileRegistry.ForEachTestConfigFileNamesEntry(func(path tspath.Path, entry *project.TestConfigFileNamesEntry) {
		configFileNamesChange := ""
		oldEntry := f.stateBaseline.serializedConfigFileRegistry.GetTestConfigFileNamesEntry(path)
		if oldEntry == nil {
			configFileNamesChange = "*new*"
			configFileNamesDiffsTable.setHasChange()
		} else if oldEntry.NearestConfigFileName != entry.NearestConfigFileName ||
			!maps.Equal(oldEntry.Ancestors, entry.Ancestors) {
			configFileNamesChange = "*modified*"
			configFileNamesDiffsTable.setHasChange()
		}
		configFileNamesDiffsTable.add(string(path), func(w io.Writer) {
			fmt.Fprintf(w, "  [%s] %s\n", path, configFileNamesChange)
			var nearestConfigFileNameModified string
			var ancestorDiffModified string
			if configFileNamesChange == "*modified*" {
				if oldEntry.NearestConfigFileName != entry.NearestConfigFileName {
					nearestConfigFileNameModified = " *modified*"
				}
				if !maps.Equal(oldEntry.Ancestors, entry.Ancestors) {
					ancestorDiffModified = " *modified*"
				}
			}
			fmt.Fprintf(w, "    NearestConfigFileName: %s%s\n", entry.NearestConfigFileName, nearestConfigFileNameModified)
			ancestorDiff := diffTable{options: options}
			for config, ancestorOfConfig := range entry.Ancestors {
				ancestorChange := ""
				if configFileNamesChange == "*modified*" {
					if oldConfigFileName, ok := oldEntry.Ancestors[config]; ok {
						if oldConfigFileName != ancestorOfConfig {
							ancestorChange = "*modified*"
						}
					} else {
						ancestorChange = "*new*"
					}
				}
				ancestorDiff.add(config, fmt.Sprintf("%s %s", ancestorOfConfig, ancestorChange))
			}
			if configFileNamesChange == "*modified*" {
				for ancestorPath, oldConfigFileName := range oldEntry.Ancestors {
					if _, ok := entry.Ancestors[ancestorPath]; !ok {
						ancestorDiff.add(ancestorPath, oldConfigFileName+" *deleted*")
					}
				}
			}
			ancestorDiff.print(w, "Ancestors:"+ancestorDiffModified)
		})
	})

	f.stateBaseline.serializedConfigFileRegistry.ForEachTestConfigEntry(func(path tspath.Path, entry *project.TestConfigEntry) {
		if configFileRegistry.GetTestConfigEntry(path) == nil {
			configDiffsTable.setHasChange()
			configDiffsTable.add(string(path), func(w io.Writer) {
				fmt.Fprintf(w, "  [%s] *deleted*\n", entry.FileName)
			})
		}
	})
	f.stateBaseline.serializedConfigFileRegistry.ForEachTestConfigFileNamesEntry(func(path tspath.Path, entry *project.TestConfigFileNamesEntry) {
		if configFileRegistry.GetTestConfigFileNamesEntry(path) == nil {
			configFileNamesDiffsTable.setHasChange()
			configFileNamesDiffsTable.add(string(path), func(w io.Writer) {
				fmt.Fprintf(w, "  [%s] *deleted*\n", path)
			})
		}
	})
	f.stateBaseline.serializedConfigFileRegistry = configFileRegistry
	configDiffsTable.print(w)
	configFileNamesDiffsTable.print(w)
}
