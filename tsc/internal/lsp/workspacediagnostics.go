package lsp

import (
	"context"
	"errors"
	"fmt"
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
		// Superseded here, on the dispatch loop, so pulls replace one another in the order the
		// client sent them rather than the order their goroutines happen to start in.
		ctx, cancel := context.WithCancelCause(ctx)
		pull := &workspaceDiagnosticsPull{cancel: cancel}
		s.supersedeWorkspaceDiagnostics(pull)

		// A pull can run for minutes, so it stays off the dispatch loop.
		return func() error {
			defer s.recover(req)
			defer cancel(nil)
			defer s.finishWorkspaceDiagnostics(pull)

			resp, lsErr := s.handleWorkspaceDiagnostic(ctx, params)
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

// supersededWorkspaceDiagnosticsError is what a pull that a newer one replaced answers with. The
// code has to be ServerCancelled carrying DiagnosticServerCancellationData: a client that cannot
// tell a server-cancelled pull from a failed one counts it against the handful of failures it
// allows before it stops pulling the workspace altogether. retriggerRequest is false because the
// pull that replaced this one is already reporting what it would have.
var supersededWorkspaceDiagnosticsError = errorWithData{
	code: lsproto.ErrorCodeServerCancelled,
	data: &lsproto.DiagnosticServerCancellationData{RetriggerRequest: false},
}

// errWorkspaceDiagnosticsSuperseded is the cancellation cause of a pull that a newer one replaced.
// The context carries the reason so that it does not have to be tracked alongside it, and so that
// it cannot disagree with whether the context is actually done.
var errWorkspaceDiagnosticsSuperseded = errors.New("workspace diagnostics superseded by a newer pull")

// workspaceDiagnosticsPull is one running `workspace/diagnostic` request, identified by pointer so
// a pull can tell whether it is still the current one.
type workspaceDiagnosticsPull struct {
	cancel context.CancelCauseFunc
}

// supersedeWorkspaceDiagnostics makes pull the current one and cancels whatever was running before
// it. A pull reports the whole workspace as of the snapshot it starts from, so an older one can
// only answer with a program version the newer one is about to cover; finishing it would spend
// minutes of checking to tell the client something it is already being told.
func (s *Server) supersedeWorkspaceDiagnostics(pull *workspaceDiagnosticsPull) {
	s.workspaceDiagnosticsMu.Lock()
	superseded := s.workspaceDiagnosticsPull
	s.workspaceDiagnosticsPull = pull
	s.workspaceDiagnosticsMu.Unlock()
	if superseded != nil {
		superseded.cancel(errWorkspaceDiagnosticsSuperseded)
	}
}

// finishWorkspaceDiagnostics clears the current pull, unless a newer one has already replaced it.
func (s *Server) finishWorkspaceDiagnostics(pull *workspaceDiagnosticsPull) {
	s.workspaceDiagnosticsMu.Lock()
	defer s.workspaceDiagnosticsMu.Unlock()
	if s.workspaceDiagnosticsPull == pull {
		s.workspaceDiagnosticsPull = nil
	}
}

// pullWorkspaceDiagnostics reports the workspace as of the snapshot it reads.
func (s *Server) pullWorkspaceDiagnostics(ctx context.Context, params *lsproto.WorkspaceDiagnosticParams) (lsproto.WorkspaceDiagnosticResponse, error) {
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	run := newWorkspaceDiagnosticsRun(ctx, s, params)

	scope := s.session.Config().WorkspaceDiagnosticsScope
	// An empty (non-nil) set loads no trees beyond what is already loaded.
	var trees *collections.Set[tspath.Path]
	if scope != lsutil.WorkspaceDiagnosticsScopeAllProjects {
		trees = &collections.Set[tspath.Path]{}
		if scope == lsutil.WorkspaceDiagnosticsScopeOpenProjectsAndDependents {
			for _, open := range s.session.Snapshot().OpenProjects() {
				trees.Add(open.Id())
			}
		}
	}

	repeat := false
	s.session.WithSnapshotLoadingProjectTree(ctx, trees, func(snapshot *project.Snapshot) {
		preferences := snapshot.UserPreferences()
		settings := workspaceDiagnosticsSettings{preferences: preferences, locale: s.GetLocale().String()}
		// A program generation cannot see a settings change, so the cache is keyed on them too.
		s.workspaceDiagnostics.useSettings(settings)
		if !scope.Enabled() || preferences.EnableValidation.IsFalse() {
			// Nothing is reported, and the cleanup pass below clears whatever the client holds.
			return
		}
		run.fingerprint = newWorkspaceDiagnosticsFingerprint(snapshot, settings)
		if s.workspaceDiagnostics.repeatsLastAnswer(run.fingerprint, run.previous) {
			repeat = true
			return
		}
		run.collect(snapshot, projectsInScope(snapshot, scope))
	})

	if repeat {
		// The client pulls every couple of seconds for as long as it is open, so most pulls have
		// nothing to tell it. Saying so in full would walk every file of every project and make
		// the client reconcile a report each, for no change. Reporting nothing leaves it alone.
		return &lsproto.WorkspaceDiagnosticReport{Items: []workspaceDiagnosticReport{}}, nil
	}

	// A cancelled run covered only part of the workspace; the cleanup below would mistake the files
	// it never reached for files that no longer have diagnostics.
	if err := ctx.Err(); err != nil {
		run.endProgress()
		return nil, err
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
		s.workspaceDiagnostics.retain(&run.reported, run.fingerprint)
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
	// The token progress is reported against: the client's if it sent one, otherwise one the
	// server created. Nil until a sweep with something to report begins.
	progressToken *lsproto.IntegerOrString
	// Result ids the client already holds.
	previous map[lsproto.DocumentUri]string
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
	// The projects being checked, so progress can be totalled from wherever it is reported.
	work []*workspaceDiagnosticsProject
	// The last percentage sent, so progress never goes backwards and unchanged ticks say nothing.
	lastPercentage atomic.Int64
	// Whether a sweep actually ran, so a disabled pull does not prune the cache.
	collected bool
	// What this answer was computed from, recorded with it so the next pull can tell whether it
	// has anything to add.
	fingerprint workspaceDiagnosticsFingerprint

	cache *workspaceDiagnosticsCache
}

func newWorkspaceDiagnosticsRun(ctx context.Context, server *Server, params *lsproto.WorkspaceDiagnosticParams) *workspaceDiagnosticsRun {
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

// collect reports every file owned by every project in scope. A project's files are split across
// its diagnostics checkers the way a build splits them, so checking one project already uses
// several checkers; projects run concurrently on top of that, bounded so the two together do not
// take the machine.
func (r *workspaceDiagnosticsRun) collect(snapshot *project.Snapshot, projects []*project.Project) {
	r.collected = true
	// Enumerating the files walks every one of them, which is worth standing aside for too.
	snapshot.WaitForInteractiveIdle(r.ctx)
	work := r.assignFilesToProjects(snapshot, projects)
	r.work = work
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
func (r *workspaceDiagnosticsRun) checkSequentially(snapshot *project.Snapshot, work []*workspaceDiagnosticsProject) {
	for _, pf := range work {
		if pf.toCheck == 0 {
			r.emitProject(pf)
			continue
		}
		completed := r.checkProject(snapshot, pf)
		snapshot.ReleaseDiagnosticsCheckers(pf.project)
		if !completed {
			return
		}
		r.emitProject(pf)
	}
}

// checkConcurrently gives each project its own slot and drains them in project order as they fill,
// so reports stream as they finish but always come out in the same order.
func (r *workspaceDiagnosticsRun) checkConcurrently(snapshot *project.Snapshot, work []*workspaceDiagnosticsProject, concurrency int) {
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
			// Hand back the checkers before the next project builds its own, so a sweep holds
			// only as many programs' worth of types as it is checking at once.
			defer snapshot.ReleaseDiagnosticsCheckers(pf.project)
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
//
// The program checks them all in one call, so the work is split across the checkers a build would
// use rather than being driven a file at a time from here; the trade is that a project reports
// once it is done rather than streaming as each of its files finishes.
func (r *workspaceDiagnosticsRun) checkProject(snapshot *project.Snapshot, pf *workspaceDiagnosticsProject) bool {
	files := make([]*ast.SourceFile, 0, len(pf.files))
	for _, file := range pf.files {
		if file != nil {
			files = append(files, file)
		}
	}
	// The check runs for as long as the project is big, so it says how far along it is as it
	// goes. It counts the files of the program, which is more than the files this reports on -
	// the libraries among them are checked but never reported - so the count is scaled onto what
	// this project contributes to the bar rather than used directly.
	ctx := project.WithCheckProgress(r.ctx, func(checked, total int) {
		if total <= 0 {
			return
		}
		pf.progress.Store(min(int64(pf.toCheck), int64(checked)*int64(pf.toCheck)/int64(total)))
		// Called once per file, from the checkers. reportProgress says nothing unless the
		// percentage moved, which bounds this to a hundred notifications however big the sweep.
		r.reportProgress()
	})

	// Ask through the incremental view, so a change is re-checked where it landed rather than
	// across the whole project.
	program := snapshot.IncrementalProgram(pf.project)
	reports := pf.languageService.WorkspaceDiagnosticsForProject(ctx, program, files)
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
func (r *workspaceDiagnosticsRun) emitProject(pf *workspaceDiagnosticsProject) {
	// Whatever the check reported along the way, the project is done now.
	pf.progress.Store(int64(pf.toCheck))
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

// beginProgress starts reporting how far through the workspace the sweep is. A sweep of a large
// workspace runs for minutes, so the client needs something to show for it.
//
// The token is the client's when it sent one. Clients that pull the workspace generally do not:
// they send a partial result token to stream the reports and nothing else, which leaves the server
// to create a progress token of its own. Both are the same notification once a token exists; only
// who creates it differs.
func (r *workspaceDiagnosticsRun) beginProgress() {
	if r.filesTotal == 0 {
		// Everything was answered from the cache, so there is nothing to watch.
		return
	}
	switch {
	case r.workDoneToken != nil:
		r.progressToken = r.workDoneToken
	case r.server.clientCapabilities.Window.WorkDoneProgress:
		// Named after the request so two pulls cannot report against one token.
		token := lsproto.IntegerOrString{String: new("tsgo-workspace-diagnostics-" + core.GetRequestID(r.ctx))}
		r.progressToken = &token
		// Not waited on: the client answers with null, and a slow one would hold up the sweep. The
		// notifications below leave on the same queue behind it, so they cannot overtake it.
		if err := sendClientRequestFireAndForget(r.server, lsproto.WindowWorkDoneProgressCreateInfo, &lsproto.WorkDoneProgressCreateParams{
			Token: token,
		}); err != nil {
			r.progressToken = nil
			return
		}
	default:
		return
	}

	r.begun = true
	r.sendProgress(lsproto.WorkDoneProgressBeginOrReportOrEnd{
		Begin: &lsproto.WorkDoneProgressBegin{
			Title:      diagnostics.Checking_workspace.Localize(r.server.GetLocale()),
			Message:    new(fmt.Sprintf("0/%d", r.filesTotal)),
			Percentage: new(uint32(0)),
		},
	})
}

// filesChecked totals what the projects have got through. Reported files rather than checked ones,
// so it can be read against filesTotal.
func (r *workspaceDiagnosticsRun) filesChecked() int {
	done := 0
	for _, pf := range r.work {
		done += int(pf.progress.Load())
	}
	return done
}

// reportProgress sends where the sweep has got to, unless it has not moved. Called from each of
// the checkers as they finish a file, and as reports are added, so it only ever moves forwards and
// says nothing when it has not.
func (r *workspaceDiagnosticsRun) reportProgress() {
	if !r.begun || r.filesTotal == 0 {
		return
	}
	done := min(r.filesChecked(), r.filesTotal)
	percentage := int64(done * 100 / r.filesTotal)
	for {
		last := r.lastPercentage.Load()
		if percentage <= last {
			return
		}
		if r.lastPercentage.CompareAndSwap(last, percentage) {
			break
		}
	}
	r.sendProgress(lsproto.WorkDoneProgressBeginOrReportOrEnd{
		Report: &lsproto.WorkDoneProgressReport{
			Message:    new(fmt.Sprintf("%d/%d", done, r.filesTotal)),
			Percentage: new(uint32(percentage)),
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
		Token: *r.progressToken,
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
