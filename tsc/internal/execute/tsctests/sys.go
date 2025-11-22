package tsctests

import (
	"fmt"
	"io"
	"maps"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/testutil/fsbaselineutil"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"golang.org/x/text/language"
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

func NewTscSystem(files FileMap, useCaseSensitiveFileNames bool, cwd string) *TestSys {
	clock := &TestClock{start: time.Now()}
	return &TestSys{
		fs: &testFs{
			FS: vfstest.FromMapWithClock(files, useCaseSensitiveFileNames, clock),
		},
		cwd:   cwd,
		clock: clock,
	}
}

func GetFileMapWithBuild(files FileMap, commandLineArgs []string) FileMap {
	sys := newTestSys(&tscInput{
		files: maps.Clone(files),
	}, false)
	execute.CommandLine(sys, commandLineArgs, sys)
	sys.fs.writtenFiles.Range(func(key string) bool {
		if text, ok := sys.fsFromFileMap().ReadFile(key); ok {
			files[key] = text
		}
		return true
	})
	return files
}

func newTestSys(tscInput *tscInput, forIncrementalCorrectness bool) *TestSys {
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
	sys.fsDiffer = &fsbaselineutil.FSDiffer{
		FS:           sys.fs.FS.(iovfs.FsWithSys),
		DefaultLibs:  func() *collections.SyncSet[string] { return sys.fs.defaultLibs },
		WrittenFiles: &sys.fs.writtenFiles,
	}

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

type TestSys struct {
	currentWrite              *strings.Builder
	programBaselines          strings.Builder
	programIncludeBaselines   strings.Builder
	tracer                    *harnessutil.TracerForBaselining
	fsDiffer                  *fsbaselineutil.FSDiffer
	forIncrementalCorrectness bool

	fs                 *testFs
	defaultLibraryPath string
	cwd                string
	env                map[string]string
	clock              *TestClock
}

var (
	_ tsc.System             = (*TestSys)(nil)
	_ tsc.CommandLineTesting = (*TestSys)(nil)
)

func (s *TestSys) Now() time.Time {
	return s.clock.Now()
}

func (s *TestSys) SinceStart() time.Duration {
	return s.clock.SinceStart()
}

func (s *TestSys) FS() vfs.FS {
	return s.fs
}

func (s *TestSys) fsFromFileMap() iovfs.FsWithSys {
	return s.fsDiffer.FS
}

func (s *TestSys) mapFs() *vfstest.MapFS {
	return s.fsDiffer.MapFs()
}

func (s *TestSys) ensureLibPathExists(path string) {
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

func (s *TestSys) DefaultLibraryPath() string {
	return s.defaultLibraryPath
}

func (s *TestSys) GetCurrentDirectory() string {
	return s.cwd
}

func (s *TestSys) Writer() io.Writer {
	return s.currentWrite
}

func (s *TestSys) WriteOutputIsTTY() bool {
	return true
}

func (s *TestSys) GetWidthOfTerminal() int {
	if widthStr := s.GetEnvironmentVariable("TS_TEST_TERMINAL_WIDTH"); widthStr != "" {
		return core.Must(strconv.Atoi(widthStr))
	}
	return 0
}

func (s *TestSys) GetEnvironmentVariable(name string) string {
	return s.env[name]
}

func (s *TestSys) OnEmittedFiles(result *compiler.EmitResult, mTimesCache *collections.SyncMap[tspath.Path, time.Time]) {
	if result != nil {
		for _, file := range result.EmittedFiles {
			modTime := s.mapFs().GetModTime(file)
			if serializedDiff := s.fsDiffer.SerializedDiff(); serializedDiff != nil {
				if diff, ok := serializedDiff.Snap[file]; ok && diff.MTime.Equal(modTime) {
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

func (s *TestSys) OnListFilesStart(w io.Writer) {
	fmt.Fprintln(w, listFileStart)
}

func (s *TestSys) OnListFilesEnd(w io.Writer) {
	fmt.Fprintln(w, listFileEnd)
}

func (s *TestSys) OnStatisticsStart(w io.Writer) {
	fmt.Fprintln(w, statisticsStart)
}

func (s *TestSys) OnStatisticsEnd(w io.Writer) {
	fmt.Fprintln(w, statisticsEnd)
}

func (s *TestSys) OnBuildStatusReportStart(w io.Writer) {
	fmt.Fprintln(w, buildStatusReportStart)
}

func (s *TestSys) OnBuildStatusReportEnd(w io.Writer) {
	fmt.Fprintln(w, buildStatusReportEnd)
}

func (s *TestSys) OnWatchStatusReportStart() {
	fmt.Fprintln(s.Writer(), watchStatusReportStart)
}

func (s *TestSys) OnWatchStatusReportEnd() {
	fmt.Fprintln(s.Writer(), watchStatusReportEnd)
}

func (s *TestSys) GetTrace(w io.Writer, locale locale.Locale) func(msg *diagnostics.Message, args ...any) {
	return func(msg *diagnostics.Message, args ...any) {
		fmt.Fprintln(w, traceStart)
		defer fmt.Fprintln(w, traceEnd)
		// With tsc -b building projects in parallel we cannot serialize the package.json lookup trace
		// so trace as if it wasnt cached
		str := msg.Localize(locale, args...)
		s.tracer.TraceWithWriter(w, str, w == s.Writer())
	}
}

func (s *TestSys) writeHeaderToBaseline(builder *strings.Builder, program *incremental.Program) {
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

func (s *TestSys) OnProgram(program *incremental.Program) {
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

func (s *TestSys) baselinePrograms(baseline *strings.Builder, header string) string {
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

func (s *TestSys) serializeState(baseline *strings.Builder) {
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

func (s *TestSys) baselineOutput(baseline io.Writer) {
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

var (
	englishVersion     = diagnostics.Version_0.Localize(locale.Default, core.Version())
	fakeEnglishVersion = diagnostics.Version_0.Localize(locale.Default, harnessutil.FakeTSVersion)
	czech              = locale.Locale(language.MustParse("cs"))
	czechVersion       = diagnostics.Version_0.Localize(czech, core.Version())
	fakeCzechVersion   = diagnostics.Version_0.Localize(czech, harnessutil.FakeTSVersion)
)

func (o *outputSanitizer) addOutputLine(s string) {
	s = strings.ReplaceAll(s, fmt.Sprintf("'%s'", core.Version()), fmt.Sprintf("'%s'", harnessutil.FakeTSVersion))
	s = strings.ReplaceAll(s, englishVersion, fakeEnglishVersion)
	s = strings.ReplaceAll(s, czechVersion, fakeCzechVersion)
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

func (s *TestSys) getOutput(forComparing bool) string {
	lines := strings.Split(s.currentWrite.String(), "\n")
	transformer := &outputSanitizer{
		forComparing: forComparing,
		lines:        lines,
		outputLines:  make([]string, 0, len(lines)),
	}
	return transformer.transformLines()
}

func (s *TestSys) clearOutput() {
	s.currentWrite.Reset()
	s.tracer.Reset()
}

func (s *TestSys) baselineFSwithDiff(baseline io.Writer) {
	s.fsDiffer.BaselineFSwithDiff(baseline)
}

func (s *TestSys) writeFileNoError(path string, content string, writeByteOrderMark bool) {
	if err := s.fsFromFileMap().WriteFile(path, content, writeByteOrderMark); err != nil {
		panic(err)
	}
}

func (s *TestSys) removeNoError(path string) {
	if err := s.fsFromFileMap().Remove(path); err != nil {
		panic(err)
	}
}

func (s *TestSys) readFileNoError(path string) string {
	content, ok := s.fsFromFileMap().ReadFile(path)
	if !ok {
		panic("File not found: " + path)
	}
	return content
}

func (s *TestSys) renameFileNoError(oldPath string, newPath string) {
	s.writeFileNoError(newPath, s.readFileNoError(oldPath), false)
	s.removeNoError(oldPath)
}

func (s *TestSys) replaceFileText(path string, oldText string, newText string) {
	content := s.readFileNoError(path)
	content = strings.Replace(content, oldText, newText, 1)
	s.writeFileNoError(path, content, false)
}

func (s *TestSys) replaceFileTextAll(path string, oldText string, newText string) {
	content := s.readFileNoError(path)
	content = strings.ReplaceAll(content, oldText, newText)
	s.writeFileNoError(path, content, false)
}

func (s *TestSys) appendFile(path string, text string) {
	content := s.readFileNoError(path)
	s.writeFileNoError(path, content+text, false)
}

func (s *TestSys) prependFile(path string, text string) {
	content := s.readFileNoError(path)
	s.writeFileNoError(path, text+content, false)
}
