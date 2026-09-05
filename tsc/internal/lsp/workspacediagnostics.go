package lsp

import (
	"context"
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

const (
	// How much of a streamed report is buffered before being flushed.
	workspaceDiagnosticsChunkFiles    = 100
	workspaceDiagnosticsChunkInterval = 500 * time.Millisecond
)

type workspaceDiagnosticReport = lsproto.WorkspaceFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport

func registerWorkspaceDiagnosticHandler(handlers handlerMap) {
	handlers[lsproto.WorkspaceDiagnosticInfo.Method] = func(s *Server, ctx context.Context, req *lsproto.RequestMessage) (func() error, error) {
		if s.session == nil {
			return nil, lsproto.ErrorCodeServerNotInitialized
		}
		params, err := lsproto.UnmarshalParams[*lsproto.WorkspaceDiagnosticParams](req)
		if err != nil {
			return nil, err
		}
		// A pull can run for minutes, so it stays off the dispatch loop.
		return func() error {
			defer s.recover(req)
			resp, lsErr := s.computeWorkspaceDiagnostics(ctx, params)
			if lsErr != nil {
				return lsErr
			}
			if ctx.Err() != nil {
				return ctx.Err()
			}
			return s.sendResult(req.ID, resp)
		}, nil
	}
}

// workspaceDiagnosticsTrees is the set of project trees a scope needs loaded. An empty (non-nil)
// set loads no trees beyond what already is; nil asks for all of them.
func (s *Server) workspaceDiagnosticsTrees(scope lsutil.WorkspaceDiagnosticsScope) *collections.Set[tspath.Path] {
	if scope == lsutil.WorkspaceDiagnosticsScopeAllProjects {
		return nil
	}
	trees := &collections.Set[tspath.Path]{}
	if scope == lsutil.WorkspaceDiagnosticsScopeOpenProjectsAndDependents {
		for _, open := range s.session.Snapshot().OpenProjects() {
			trees.Add(open.Id())
		}
	}
	return trees
}

func (s *Server) computeWorkspaceDiagnostics(ctx context.Context, params *lsproto.WorkspaceDiagnosticParams) (lsproto.WorkspaceDiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	run := newWorkspaceDiagnosticsRun(s, ctx, params)

	scope := s.session.Config().WorkspaceDiagnosticsScope
	trees := s.workspaceDiagnosticsTrees(scope)

	s.session.WithSnapshotLoadingProjectTree(ctx, trees, func(snapshot *project.Snapshot) {
		preferences := snapshot.UserPreferences()
		// A program generation cannot see a settings change, so the cache is keyed on them too.
		s.workspaceDiagnostics.useSettings(workspaceDiagnosticsSettings{
			preferences: preferences,
			locale:      s.GetLocale().String(),
		})
		if !scope.Enabled() || preferences.EnableValidation.IsFalse() {
			// Nothing is reported, and the cleanup pass below clears whatever the client holds.
			return
		}
		run.collect(snapshot, scope)
	})

	// A cancelled run covered only part of the workspace; the cleanup below would
	// mistake the files it never reached for files that no longer have diagnostics.
	if err := ctx.Err(); err != nil {
		run.endProgress()
		return nil, err
	}
	if run.abandoned.Load() {
		// The editor has moved on from what this pull was answering for, so the workspace is only
		// partly covered and the same reasoning applies. ContentModified is how a client is told to
		// ask again; the projects that did finish are cached, so the next pull carries on from
		// there rather than starting over.
		run.endProgress()
		return nil, lsproto.ErrorCodeContentModified
	}
	// Report empty for anything the client holds that no project reported, so it clears.
	for _, previous := range params.PreviousResultIds {
		if !run.reported.Has(previous.Uri) {
			run.add(workspaceDiagnosticReport{
				FullDocumentDiagnosticReport: &lsproto.WorkspaceFullDocumentDiagnosticReport{
					Uri:   previous.Uri,
					Items: []*lsproto.Diagnostic{},
				},
			})
		}
	}

	if run.collected {
		s.workspaceDiagnostics.retain(&run.reported)
		if s.logger.IsVerbose() {
			stats := s.workspaceDiagnostics.stats()
			s.logger.Logf("workspace diagnostics: reported %d files, cached %d files across %d projects",
				run.filesDone, stats.Files, stats.Projects)
		}
	}

	// Checking can surface global diagnostics the owning tsconfig has not published yet.
	s.session.EnqueuePublishGlobalDiagnostics()

	return run.finish(), nil
}

// workspaceDiagnosticsRun accumulates the reports of one `workspace/diagnostic` request.
type workspaceDiagnosticsRun struct {
	server *Server
	ctx    context.Context

	partialResultToken *lsproto.IntegerOrString
	workDoneToken      *lsproto.IntegerOrString
	// Result ids the client already holds.
	previous map[lsproto.DocumentUri]string
	// abandoned records that the run stopped early, so part of the workspace was never reported.
	abandoned atomic.Bool
	// Documents already covered, so a file in several projects is reported once.
	reported collections.Set[lsproto.DocumentUri]

	// Reports not yet flushed; without a partial result token this holds all of them.
	pending []workspaceDiagnosticReport
	// Paces flushes and progress so neither is sent per file.
	sinceTick int
	lastTick  time.Time

	filesDone  int
	filesTotal int
	begun      bool
	// Whether a sweep actually ran, so a disabled pull does not prune the cache.
	collected bool
	// Set when a project was rebuilt mid-pull, so what this pull found is already out of date.

	cache *workspaceDiagnosticsCache
}

func newWorkspaceDiagnosticsRun(server *Server, ctx context.Context, params *lsproto.WorkspaceDiagnosticParams) *workspaceDiagnosticsRun {
	previous := make(map[lsproto.DocumentUri]string, len(params.PreviousResultIds))
	for _, id := range params.PreviousResultIds {
		previous[id.Uri] = id.Value
	}
	return &workspaceDiagnosticsRun{
		server:             server,
		ctx:                ctx,
		partialResultToken: params.PartialResultToken,
		workDoneToken:      params.WorkDoneToken,
		previous:           previous,
		lastTick:           time.Now(),
		cache:              server.workspaceDiagnostics,
	}
}

// collect reports every file owned by every project in scope. Files within a project are checked
// one at a time because they share its single diagnostics checker, which exists to keep the walk
// order consistent; checker pools are per project, so whole projects run concurrently.
func (r *workspaceDiagnosticsRun) collect(snapshot *project.Snapshot, scope lsutil.WorkspaceDiagnosticsScope) {
	r.collected = true
	work := r.assignFilesToProjects(snapshot, projectsInScope(snapshot, scope))
	// Only files that still need checking count towards progress.
	r.filesTotal = 0
	for _, pf := range work {
		r.filesTotal += pf.toCheck
	}
	r.beginProgress()

	if concurrency := workspaceDiagnosticsConcurrency(work); concurrency > 1 {
		r.checkConcurrently(snapshot, work, concurrency)
	} else {
		r.checkSequentially(snapshot, work)
	}
}

// checkSequentially is the single threaded path: no goroutines are spawned at all, so a run can be
// stepped through. core.NewWorkGroup's single threaded form cannot serve here because it defers
// every task to RunAndWait, and this drains projects as they finish.
// stale reports whether the project has been rebuilt since this pull took its snapshot. Checking it
// further would spend the project's checkers working out diagnostics for a program the editor has
// already moved past, while the requests the user is waiting on queue behind them.
func (r *workspaceDiagnosticsRun) stale(pf workspaceDiagnosticsProject) bool {
	current := r.server.session.Snapshot().ProjectCollection.GetProjectByPath(pf.project.Id())
	return current == nil || current.Program != pf.project.Program
}

func (r *workspaceDiagnosticsRun) checkSequentially(snapshot *project.Snapshot, work []workspaceDiagnosticsProject) {
	for _, pf := range work {
		if pf.toCheck == 0 {
			r.emitProject(pf)
			continue
		}
		if r.stale(pf) {
			r.abandoned.Store(true)
			return
		}
		completed := r.checkProject(snapshot, pf)
		snapshot.ReleaseSweptCheckers(pf.project)
		if !completed {
			return
		}
		r.emitProject(pf)
	}
}

// checkConcurrently gives each project its own slot and drains them in project order as they fill,
// so reports stream as they finish but always come out in the same order.
func (r *workspaceDiagnosticsRun) checkConcurrently(snapshot *project.Snapshot, work []workspaceDiagnosticsProject, concurrency int) {
	completed := make([]bool, len(work))
	done := make([]chan struct{}, len(work))
	for i := range done {
		done[i] = make(chan struct{})
	}

	slots := make(chan struct{}, concurrency)
	wg := core.NewWorkGroup(false /*singleThreaded*/)
	for i, pf := range work {
		if pf.toCheck == 0 {
			// Answered entirely from the cache: no checker, no slot.
			completed[i] = true
			close(done[i])
			continue
		}
		wg.Queue(func() {
			defer close(done[i])
			select {
			case slots <- struct{}{}:
				defer func() { <-slots }()
			case <-r.ctx.Done():
				return
			}
			if r.stale(pf) {
				r.abandoned.Store(true)
				return
			}
			// Handed back as soon as this project is done, so a sweep holds only as many projects'
			// worth of types as it is checking at once.
			defer snapshot.ReleaseSweptCheckers(pf.project)
			completed[i] = r.checkProject(snapshot, pf)
		})
	}

	for i, pf := range work {
		<-done[i]
		if !completed[i] {
			break
		}
		r.emitProject(pf)
	}
	wg.RunAndWait()
}

// checkProject fills in the reports for the files of one project, reporting whether it got through
// them all. A cancelled project must not be emitted: its remaining reports are still zero values.
// checkProject checks a project's files and builds their reports. The program checks them all in
// one call, so the work is split across the checkers a build would use rather than being driven a
// file at a time from here; the trade is that a project reports once it is done rather than
// streaming as each of its files finishes.
func (r *workspaceDiagnosticsRun) checkProject(snapshot *project.Snapshot, pf workspaceDiagnosticsProject) bool {
	files := make([]*ast.SourceFile, 0, len(pf.files))
	for _, file := range pf.files {
		if file != nil {
			files = append(files, file)
		}
	}
	// Ask through the incremental view, so a change is re-checked where it landed rather than
	// across the whole project.
	program, doneWithProgram := snapshot.IncrementalProgram(pf.project)
	defer doneWithProgram()
	reports := pf.languageService.WorkspaceDiagnosticsForProject(r.ctx, program, files)
	if r.ctx.Err() != nil {
		return false
	}
	for j, file := range pf.files {
		if file == nil {
			continue
		}
		pf.reports[j] = r.reportForFile(snapshot, file, reports[file])
	}
	return true
}

// emitProject hands a finished project's reports to the client and remembers which program version
// produced each result id, so the next pull can skip the file.
func (r *workspaceDiagnosticsRun) emitProject(pf workspaceDiagnosticsProject) {
	for j, report := range pf.reports {
		if pf.files[j] != nil {
			r.filesDone++
			if full := report.FullDocumentDiagnosticReport; full != nil && full.ResultId != nil {
				r.cache.store(lsconv.FileNameToDocumentURI(pf.files[j].FileName()), workspaceDiagnosticsCacheEntry{
					project:    pf.project.Id(),
					generation: pf.generation,
					resultID:   *full.ResultId,
				})
			}
		}
		r.add(report)
	}
}

func (r *workspaceDiagnosticsRun) reportForFile(snapshot *project.Snapshot, file *ast.SourceFile, items []*lsproto.Diagnostic) workspaceDiagnosticReport {
	uri := lsconv.FileNameToDocumentURI(file.FileName())
	resultID := workspaceDiagnosticsResultID(items)
	version := openDocumentVersion(snapshot, file.FileName())

	if previous, ok := r.previous[uri]; ok && resultID != "" && previous == resultID {
		return workspaceDiagnosticReport{
			UnchangedDocumentDiagnosticReport: &lsproto.WorkspaceUnchangedDocumentDiagnosticReport{
				Uri:      uri,
				Version:  version,
				ResultId: resultID,
			},
		}
	}
	full := &lsproto.WorkspaceFullDocumentDiagnosticReport{
		Uri:     uri,
		Version: version,
		Items:   items,
	}
	if resultID != "" {
		full.ResultId = &resultID
	}
	return workspaceDiagnosticReport{FullDocumentDiagnosticReport: full}
}

func (r *workspaceDiagnosticsRun) add(report workspaceDiagnosticReport) {
	r.pending = append(r.pending, report)
	r.sinceTick++
	if r.sinceTick < workspaceDiagnosticsChunkFiles && time.Since(r.lastTick) < workspaceDiagnosticsChunkInterval {
		return
	}
	r.sinceTick = 0
	r.lastTick = time.Now()
	r.flush()
	r.reportProgress()
}

// flush streams buffered reports to the partial result token, if the client gave one.
func (r *workspaceDiagnosticsRun) flush() {
	if r.partialResultToken == nil || len(r.pending) == 0 {
		return
	}
	_ = sendNotification(r.server, lsproto.WorkspaceDiagnosticPartialResultInfo, &lsproto.WorkspaceDiagnosticPartialResultParams{
		Token: *r.partialResultToken,
		Value: lsproto.WorkspaceDiagnosticReportPartialResult{Items: r.pending},
	})
	r.pending = nil
}

func (r *workspaceDiagnosticsRun) finish() lsproto.WorkspaceDiagnosticResponse {
	// With a partial result token everything was streamed already; without one, pending holds it all.
	r.flush()
	r.endProgress()
	items := r.pending
	if items == nil {
		items = []workspaceDiagnosticReport{}
	}
	r.pending = nil
	return &lsproto.WorkspaceDiagnosticReport{Items: items}
}

func (r *workspaceDiagnosticsRun) beginProgress() {
	if r.workDoneToken == nil || r.filesTotal == 0 {
		return
	}
	r.begun = true
	r.sendProgress(lsproto.WorkDoneProgressBeginOrReportOrEnd{
		Begin: &lsproto.WorkDoneProgressBegin{
			Title:      diagnostics.Checking_workspace.Localize(r.server.GetLocale()),
			Percentage: new(uint32(0)),
		},
	})
}

func (r *workspaceDiagnosticsRun) reportProgress() {
	if !r.begun {
		return
	}
	r.sendProgress(lsproto.WorkDoneProgressBeginOrReportOrEnd{
		Report: &lsproto.WorkDoneProgressReport{
			Percentage: new(uint32(r.filesDone * 100 / r.filesTotal)),
		},
	})
}

func (r *workspaceDiagnosticsRun) endProgress() {
	if !r.begun {
		return
	}
	r.begun = false
	r.sendProgress(lsproto.WorkDoneProgressBeginOrReportOrEnd{End: &lsproto.WorkDoneProgressEnd{}})
}

func (r *workspaceDiagnosticsRun) sendProgress(value lsproto.WorkDoneProgressBeginOrReportOrEnd) {
	_ = sendNotification(r.server, lsproto.ProgressInfo, &lsproto.ProgressParams{
		Token: *r.workDoneToken,
		Value: value,
	})
}

// openDocumentVersion returns the LSP version of an open file, and null otherwise.
func openDocumentVersion(snapshot *project.Snapshot, fileName string) lsproto.IntegerOrNull {
	if handle := snapshot.GetFile(fileName); handle != nil && handle.IsOverlay() {
		return lsproto.IntegerOrNull{Integer: new(handle.Version())}
	}
	return lsproto.IntegerOrNull{}
}
