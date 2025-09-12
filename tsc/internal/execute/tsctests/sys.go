package tsctests

import (
	"fmt"
	"io"
	"io/fs"
	"maps"
	"slices"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type FileMap map[string]any

var tscLibPath = "/home/src/tslibs/TS/Lib"

var tscDefaultLibContent = stringtestutil.Dedent(`
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
`)

func getTestLibPathFor(libName string) string {
	var libFile string
	if value, ok := tsoptions.LibMap.Get(libName); ok {
		libFile = value.(string)
	} else {
		libFile = "lib." + libName + ".d.ts"
	}
	return tscLibPath + "/" + libFile
}

type TestClock struct {
	start time.Time
	now   time.Time
	nowMu sync.Mutex
}

func (t *TestClock) Now() time.Time {
	t.nowMu.Lock()
	defer t.nowMu.Unlock()
	if t.now.IsZero() {
		t.now = t.start
	}
	t.now = t.now.Add(1 * time.Second) // Simulate some time passing
	return t.now
}

func (t *TestClock) SinceStart() time.Duration {
	return t.Now().Sub(t.start)
}

func NewTscSystem(files FileMap, useCaseSensitiveFileNames bool, cwd string) *testSys {
	clock := &TestClock{start: time.Now()}
	return &testSys{
		fs: &testFs{
			FS: vfstest.FromMapWithClock(files, useCaseSensitiveFileNames, clock),
		},
		cwd:   cwd,
		clock: clock,
	}
}

func newTestSys(tscInput *tscInput, forIncrementalCorrectness bool) *testSys {
	cwd := tscInput.cwd
	if cwd == "" {
		cwd = "/home/src/workspaces/project"
	}
	libPath := tscLibPath
	if tscInput.windowsStyleRoot != "" {
		libPath = tscInput.windowsStyleRoot + libPath[1:]
	}
	currentWrite := &strings.Builder{}
	sys := NewTscSystem(tscInput.files, !tscInput.ignoreCase, cwd)
	sys.defaultLibraryPath = libPath
	sys.currentWrite = currentWrite
	sys.tracer = harnessutil.NewTracerForBaselining(tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: !tscInput.ignoreCase,
		CurrentDirectory:          cwd,
	}, currentWrite)
	sys.env = tscInput.env
	sys.forIncrementalCorrectness = forIncrementalCorrectness

	// Ensure the default library file is present
	sys.ensureLibPathExists("lib.d.ts")
	for _, libFile := range tsoptions.TargetToLibMap() {
		sys.ensureLibPathExists(libFile)
	}
	for libFile := range tsoptions.LibFilesSet.Keys() {
		sys.ensureLibPathExists(libFile)
	}
	return sys
}

type diffEntry struct {
	content       string
	mTime         time.Time
	isWritten     bool
	symlinkTarget string
}

type snapshot struct {
	snap        map[string]*diffEntry
	defaultLibs *collections.SyncSet[string]
}

type testSys struct {
	currentWrite              *strings.Builder
	programBaselines          strings.Builder
	programIncludeBaselines   strings.Builder
	tracer                    *harnessutil.TracerForBaselining
	serializedDiff            *snapshot
	forIncrementalCorrectness bool

	fs                 *testFs
	defaultLibraryPath string
	cwd                string
	env                map[string]string
	clock              *TestClock
}

var (
	_ tsc.System             = (*testSys)(nil)
	_ tsc.CommandLineTesting = (*testSys)(nil)
)

func (s *testSys) Now() time.Time {
	return s.clock.Now()
}

func (s *testSys) SinceStart() time.Duration {
	return s.clock.SinceStart()
}

func (s *testSys) FS() vfs.FS {
	return s.fs
}

func (s *testSys) fsFromFileMap() iovfs.FsWithSys {
	return s.fs.FS.(iovfs.FsWithSys)
}

func (s *testSys) mapFs() *vfstest.MapFS {
	return s.fsFromFileMap().FSys().(*vfstest.MapFS)
}

func (s *testSys) ensureLibPathExists(path string) {
	path = s.defaultLibraryPath + "/" + path
	if _, ok := s.fsFromFileMap().ReadFile(path); !ok {
		if s.fs.defaultLibs == nil {
			s.fs.defaultLibs = &collections.SyncSet[string]{}
		}
		s.fs.defaultLibs.Add(path)
		err := s.fsFromFileMap().WriteFile(path, tscDefaultLibContent, false)
		if err != nil {
			panic("Failed to write default library file: " + err.Error())
		}
	}
}

func (s *testSys) DefaultLibraryPath() string {
	return s.defaultLibraryPath
}

func (s *testSys) GetCurrentDirectory() string {
	return s.cwd
}

func (s *testSys) Writer() io.Writer {
	return s.currentWrite
}

func (s *testSys) WriteOutputIsTTY() bool {
	return true
}

func (s *testSys) GetWidthOfTerminal() int {
	if widthStr := s.GetEnvironmentVariable("TS_TEST_TERMINAL_WIDTH"); widthStr != "" {
		return core.Must(strconv.Atoi(widthStr))
	}
	return 0
}

func (s *testSys) GetEnvironmentVariable(name string) string {
	return s.env[name]
}

func (s *testSys) OnEmittedFiles(result *compiler.EmitResult, mTimesCache *collections.SyncMap[tspath.Path, time.Time]) {
	if result != nil {
		for _, file := range result.EmittedFiles {
			modTime := s.mapFs().GetModTime(file)
			if s.serializedDiff != nil {
				if diff, ok := s.serializedDiff.snap[file]; ok && diff.mTime.Equal(modTime) {
					// Even though written, timestamp was reverted
					continue
				}
			}

			// Ensure that the timestamp for emitted files is in the order
			now := s.Now()
			if err := s.fsFromFileMap().Chtimes(file, time.Time{}, now); err != nil {
				panic("Failed to change time for emitted file: " + file + ": " + err.Error())
			}
			// Update the mTime cache in --b mode to store the updated timestamp so tests will behave deteministically when finding newest output
			if mTimesCache != nil {
				path := tspath.ToPath(file, s.GetCurrentDirectory(), s.FS().UseCaseSensitiveFileNames())
				if _, found := mTimesCache.Load(path); found {
					mTimesCache.Store(path, now)
				}
			}
		}
	}
}

func (s *testSys) OnListFilesStart(w io.Writer) {
	fmt.Fprintln(w, listFileStart)
}

func (s *testSys) OnListFilesEnd(w io.Writer) {
	fmt.Fprintln(w, listFileEnd)
}

func (s *testSys) OnStatisticsStart(w io.Writer) {
	fmt.Fprintln(w, statisticsStart)
}

func (s *testSys) OnStatisticsEnd(w io.Writer) {
	fmt.Fprintln(w, statisticsEnd)
}

func (s *testSys) OnBuildStatusReportStart(w io.Writer) {
	fmt.Fprintln(w, buildStatusReportStart)
}

func (s *testSys) OnBuildStatusReportEnd(w io.Writer) {
	fmt.Fprintln(w, buildStatusReportEnd)
}

func (s *testSys) OnWatchStatusReportStart() {
	fmt.Fprintln(s.Writer(), watchStatusReportStart)
}

func (s *testSys) OnWatchStatusReportEnd() {
	fmt.Fprintln(s.Writer(), watchStatusReportEnd)
}

func (s *testSys) GetTrace(w io.Writer) func(str string) {
	return func(str string) {
		fmt.Fprintln(w, traceStart)
		defer fmt.Fprintln(w, traceEnd)
		// With tsc -b building projects in parallel we cannot serialize the package.json lookup trace
		// so trace as if it wasnt cached
		s.tracer.TraceWithWriter(w, str, w == s.Writer())
	}
}

func (s *testSys) writeHeaderToBaseline(builder *strings.Builder, program *incremental.Program) {
	if builder.Len() != 0 {
		builder.WriteString("\n")
	}

	if configFilePath := program.Options().ConfigFilePath; configFilePath != "" {
		builder.WriteString(tspath.GetRelativePathFromDirectory(s.cwd, configFilePath, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: s.FS().UseCaseSensitiveFileNames(),
			CurrentDirectory:          s.GetCurrentDirectory(),
		}) + "::\n")
	}
}

func (s *testSys) OnProgram(program *incremental.Program) {
	s.writeHeaderToBaseline(&s.programBaselines, program)

	testingData := program.GetTestingData()
	s.programBaselines.WriteString("SemanticDiagnostics::\n")
	for _, file := range program.GetProgram().GetSourceFiles() {
		if diagnostics, ok := testingData.SemanticDiagnosticsPerFile.Load(file.Path()); ok {
			if oldDiagnostics, ok := testingData.OldProgramSemanticDiagnosticsPerFile.Load(file.Path()); !ok || oldDiagnostics != diagnostics {
				s.programBaselines.WriteString("*refresh*    " + file.FileName() + "\n")
			}
		} else {
			s.programBaselines.WriteString("*not cached* " + file.FileName() + "\n")
		}
	}

	// Write signature updates
	s.programBaselines.WriteString("Signatures::\n")
	for _, file := range program.GetProgram().GetSourceFiles() {
		if kind, ok := testingData.UpdatedSignatureKinds[file.Path()]; ok {
			switch kind {
			case incremental.SignatureUpdateKindComputedDts:
				s.programBaselines.WriteString("(computed .d.ts) " + file.FileName() + "\n")
			case incremental.SignatureUpdateKindStoredAtEmit:
				s.programBaselines.WriteString("(stored at emit) " + file.FileName() + "\n")
			case incremental.SignatureUpdateKindUsedVersion:
				s.programBaselines.WriteString("(used version)   " + file.FileName() + "\n")
			}
		}
	}

	var filesWithoutIncludeReason []string
	var fileNotInProgramWithIncludeReason []string
	includeReasons := program.GetProgram().GetIncludeReasons()
	for _, file := range program.GetProgram().GetSourceFiles() {
		if _, ok := includeReasons[file.Path()]; !ok {
			filesWithoutIncludeReason = append(filesWithoutIncludeReason, string(file.Path()))
		}
	}
	for path := range includeReasons {
		if program.GetProgram().GetSourceFileByPath(path) == nil && !program.GetProgram().IsMissingPath(path) {
			fileNotInProgramWithIncludeReason = append(fileNotInProgramWithIncludeReason, string(path))
		}
	}
	if len(filesWithoutIncludeReason) > 0 || len(fileNotInProgramWithIncludeReason) > 0 {
		s.writeHeaderToBaseline(&s.programIncludeBaselines, program)
		s.programIncludeBaselines.WriteString("!!! Expected all files to have include reasons\nfilesWithoutIncludeReason::\n")
		for _, file := range filesWithoutIncludeReason {
			s.programIncludeBaselines.WriteString("  " + file + "\n")
		}
		s.programIncludeBaselines.WriteString("filesNotInProgramWithIncludeReason::\n")
		for _, file := range fileNotInProgramWithIncludeReason {
			s.programIncludeBaselines.WriteString("  " + file + "\n")
		}
	}
}

func (s *testSys) baselinePrograms(baseline *strings.Builder, header string) string {
	baseline.WriteString(s.programBaselines.String())
	s.programBaselines.Reset()
	var result string
	if s.programIncludeBaselines.Len() > 0 {
		result += fmt.Sprintf("\n\n%s\n!!! Include reasons expectations don't match pls review!!!\n", header)
		result += s.programIncludeBaselines.String()
		s.programIncludeBaselines.Reset()
		baseline.WriteString(result)
	}
	return result
}

func (s *testSys) serializeState(baseline *strings.Builder) {
	s.baselineOutput(baseline)
	s.baselineFSwithDiff(baseline)
	// todo watch
	// this.serializeWatches(baseline);
	// this.timeoutCallbacks.serialize(baseline);
	// this.immediateCallbacks.serialize(baseline);
	// this.pendingInstalls.serialize(baseline);
	// this.service?.baseline();
}

var (
	fakeTimeStamp = "HH:MM:SS AM"
	fakeDuration  = "d.ddds"

	buildStartingAt        = "build starting at "
	buildFinishedIn        = "build finished in "
	listFileStart          = "!!! List files start"
	listFileEnd            = "!!! List files end"
	statisticsStart        = "!!! Statistics start"
	statisticsEnd          = "!!! Statistics end"
	buildStatusReportStart = "!!! Build Status Report Start"
	buildStatusReportEnd   = "!!! Build Status Report End"
	watchStatusReportStart = "!!! Watch Status Report Start"
	watchStatusReportEnd   = "!!! Watch Status Report End"
	traceStart             = "!!! Trace start"
	traceEnd               = "!!! Trace end"
)

func (s *testSys) baselineOutput(baseline io.Writer) {
	fmt.Fprint(baseline, "\nOutput::\n")
	output := s.getOutput(false)
	fmt.Fprint(baseline, output)
}

type outputSanitizer struct {
	forComparing bool
	lines        []string
	index        int
	outputLines  []string
}

func (o *outputSanitizer) addOutputLine(s string) {
	if change := strings.ReplaceAll(s, fmt.Sprintf("'%s'", core.Version()), fmt.Sprintf("'%s'", harnessutil.FakeTSVersion)); change != s {
		s = change
	}
	if change := strings.ReplaceAll(s, "Version "+core.Version(), "Version "+harnessutil.FakeTSVersion); change != s {
		s = change
	}
	o.outputLines = append(o.outputLines, s)
}

func (o *outputSanitizer) sanitizeBuildStatusTimeStamp() string {
	statusLine := o.lines[o.index]
	hhSeparator := strings.IndexRune(statusLine, ':')
	if hhSeparator < 2 {
		panic("Expected timestamp")
	}
	return statusLine[:hhSeparator-2] + fakeTimeStamp + statusLine[hhSeparator+len(fakeTimeStamp)-2:]
}

func (o *outputSanitizer) transformLines() string {
	for ; o.index < len(o.lines); o.index++ {
		line := o.lines[o.index]
		if strings.HasPrefix(line, buildStartingAt) {
			if !o.forComparing {
				o.addOutputLine(buildStartingAt + fakeTimeStamp)
			}
			continue
		}
		if strings.HasPrefix(line, buildFinishedIn) {
			if !o.forComparing {
				o.addOutputLine(buildFinishedIn + fakeDuration)
			}
			continue
		}
		if !o.addOrSkipLinesForComparing(listFileStart, listFileEnd, false, nil) &&
			!o.addOrSkipLinesForComparing(statisticsStart, statisticsEnd, true, nil) &&
			!o.addOrSkipLinesForComparing(traceStart, traceEnd, false, nil) &&
			!o.addOrSkipLinesForComparing(buildStatusReportStart, buildStatusReportEnd, false, o.sanitizeBuildStatusTimeStamp) &&
			!o.addOrSkipLinesForComparing(watchStatusReportStart, watchStatusReportEnd, false, o.sanitizeBuildStatusTimeStamp) {
			o.addOutputLine(line)
		}
	}
	return strings.Join(o.outputLines, "\n")
}

func (o *outputSanitizer) addOrSkipLinesForComparing(
	lineStart string,
	lineEnd string,
	skipEvenIfNotComparing bool,
	sanitizeFirstLine func() string,
) bool {
	if o.lines[o.index] != lineStart {
		return false
	}
	o.index++
	isFirstLine := true
	for ; o.index < len(o.lines); o.index++ {
		if o.lines[o.index] == lineEnd {
			return true
		}
		if !o.forComparing && !skipEvenIfNotComparing {
			line := o.lines[o.index]
			if isFirstLine && sanitizeFirstLine != nil {
				line = sanitizeFirstLine()
				isFirstLine = false
			}
			o.addOutputLine(line)
		}
	}
	panic("Expected lineEnd" + lineEnd + " not found after " + lineStart)
}

func (s *testSys) getOutput(forComparing bool) string {
	lines := strings.Split(s.currentWrite.String(), "\n")
	transformer := &outputSanitizer{
		forComparing: forComparing,
		lines:        lines,
		outputLines:  make([]string, 0, len(lines)),
	}
	return transformer.transformLines()
}

func (s *testSys) clearOutput() {
	s.currentWrite.Reset()
	s.tracer.Reset()
}

func (s *testSys) baselineFSwithDiff(baseline io.Writer) {
	// todo: baselines the entire fs, possibly doesn't correctly diff all cases of emitted files, since emit isn't fully implemented and doesn't always emit the same way as strada
	snap := map[string]*diffEntry{}

	diffs := map[string]string{}

	for path, file := range s.mapFs().Entries() {
		if file.Mode&fs.ModeSymlink != 0 {
			target, ok := s.mapFs().GetTargetOfSymlink(path)
			if !ok {
				panic("Failed to resolve symlink target: " + path)
			}
			newEntry := &diffEntry{symlinkTarget: target}
			snap[path] = newEntry
			s.addFsEntryDiff(diffs, newEntry, path)
			continue
		} else if file.Mode.IsRegular() {
			newEntry := &diffEntry{content: string(file.Data), mTime: file.ModTime, isWritten: s.fs.writtenFiles.Has(path)}
			snap[path] = newEntry
			s.addFsEntryDiff(diffs, newEntry, path)
		}
	}
	if s.serializedDiff != nil {
		for path := range s.serializedDiff.snap {
			if fileInfo := s.mapFs().GetFileInfo(path); fileInfo == nil {
				// report deleted
				s.addFsEntryDiff(diffs, nil, path)
			}
		}
	}
	var defaultLibs collections.SyncSet[string]
	if s.fs.defaultLibs != nil {
		s.fs.defaultLibs.Range(func(libPath string) bool {
			defaultLibs.Add(libPath)
			return true
		})
	}
	s.serializedDiff = &snapshot{
		snap:        snap,
		defaultLibs: &defaultLibs,
	}
	diffKeys := slices.Collect(maps.Keys(diffs))
	slices.Sort(diffKeys)
	for _, path := range diffKeys {
		fmt.Fprint(baseline, "//// ["+path+"] ", diffs[path], "\n")
	}
	fmt.Fprintln(baseline)
	s.fs.writtenFiles = collections.SyncSet[string]{} // Reset written files after baseline
}

func (s *testSys) addFsEntryDiff(diffs map[string]string, newDirContent *diffEntry, path string) {
	var oldDirContent *diffEntry
	var defaultLibs *collections.SyncSet[string]
	if s.serializedDiff != nil {
		oldDirContent = s.serializedDiff.snap[path]
		defaultLibs = s.serializedDiff.defaultLibs
	}
	// todo handle more cases of fs changes
	if oldDirContent == nil {
		if s.fs.defaultLibs == nil || !s.fs.defaultLibs.Has(path) {
			if newDirContent.symlinkTarget != "" {
				diffs[path] = "-> " + newDirContent.symlinkTarget + " *new*"
			} else {
				diffs[path] = "*new* \n" + newDirContent.content
			}
		}
	} else if newDirContent == nil {
		diffs[path] = "*deleted*"
	} else if newDirContent.content != oldDirContent.content {
		diffs[path] = "*modified* \n" + newDirContent.content
	} else if newDirContent.isWritten {
		diffs[path] = "*rewrite with same content*"
	} else if newDirContent.mTime != oldDirContent.mTime {
		diffs[path] = "*mTime changed*"
	} else if defaultLibs != nil && defaultLibs.Has(path) && s.fs.defaultLibs != nil && !s.fs.defaultLibs.Has(path) {
		// Lib file that was read
		diffs[path] = "*Lib*\n" + newDirContent.content
	}
}

func (s *testSys) writeFileNoError(path string, content string, writeByteOrderMark bool) {
	if err := s.fsFromFileMap().WriteFile(path, content, writeByteOrderMark); err != nil {
		panic(err)
	}
}

func (s *testSys) removeNoError(path string) {
	if err := s.fsFromFileMap().Remove(path); err != nil {
		panic(err)
	}
}

func (s *testSys) readFileNoError(path string) string {
	content, ok := s.fsFromFileMap().ReadFile(path)
	if !ok {
		panic("File not found: " + path)
	}
	return content
}

func (s *testSys) renameFileNoError(oldPath string, newPath string) {
	s.writeFileNoError(newPath, s.readFileNoError(oldPath), false)
	s.removeNoError(oldPath)
}

func (s *testSys) replaceFileText(path string, oldText string, newText string) {
	content := s.readFileNoError(path)
	content = strings.Replace(content, oldText, newText, 1)
	s.writeFileNoError(path, content, false)
}

func (s *testSys) replaceFileTextAll(path string, oldText string, newText string) {
	content := s.readFileNoError(path)
	content = strings.ReplaceAll(content, oldText, newText)
	s.writeFileNoError(path, content, false)
}

func (s *testSys) appendFile(path string, text string) {
	content := s.readFileNoError(path)
	s.writeFileNoError(path, content+text, false)
}

func (s *testSys) prependFile(path string, text string) {
	content := s.readFileNoError(path)
	s.writeFileNoError(path, text+content, false)
}
