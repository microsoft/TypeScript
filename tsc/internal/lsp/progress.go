package lsp

import (
	"fmt"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

type progressEvent struct {
	message *diagnostics.Message
	args    []any
	finish  bool
}

// progressReporter abstracts the LSP transport operations needed by
// projectLoadingProgress so the progress logic can be tested without a
// full Server instance.
type progressReporter interface {
	// done returns a channel that is closed when the server is shutting down.
	done() <-chan struct{}
	// localize converts a diagnostic message to a display string.
	localize(msg *diagnostics.Message, args ...any) string
	// createWorkDoneProgress asks the client to create a progress token.
	createWorkDoneProgress(token string)
	// sendProgress sends a $/progress notification.
	sendProgress(token string, value lsproto.WorkDoneProgressBeginOrReportOrEnd)
}

// serverProgressReporter adapts *Server to the progressReporter interface.
type serverProgressReporter struct {
	server *Server
}

func (r *serverProgressReporter) done() <-chan struct{} {
	return r.server.backgroundCtx.Done()
}

func (r *serverProgressReporter) localize(msg *diagnostics.Message, args ...any) string {
	return msg.Localize(r.server.locale, args...)
}

func (r *serverProgressReporter) createWorkDoneProgress(token string) {
	_, _ = sendClientRequest(r.server.backgroundCtx, r.server, lsproto.WindowWorkDoneProgressCreateInfo, &lsproto.WorkDoneProgressCreateParams{
		Token: lsproto.IntegerOrString{String: &token},
	})
}

func (r *serverProgressReporter) sendProgress(token string, value lsproto.WorkDoneProgressBeginOrReportOrEnd) {
	_ = sendNotification(r.server, lsproto.ProgressInfo, &lsproto.ProgressParams{
		Token: lsproto.IntegerOrString{String: &token},
		Value: value,
	})
}

// projectLoadingProgress manages LSP WorkDoneProgress indicators for
// long-running operations. A single persistent goroutine processes
// start/finish events, maintains a ref-counted map of active operations,
// and sends progress messages in order.
//
// To avoid flickering on fast operations, the indicator is not shown
// until progressDelay has elapsed since the first start event. If all
// operations complete before then, no progress UI is displayed.
//
// start/finish may block if the internal buffer (64 events) is full,
// but will bail out if the server's background context is cancelled.
type projectLoadingProgress struct {
	reporter progressReporter
	ch       chan progressEvent
	delay    time.Duration // time to wait before showing progress UI
}

func newProjectLoadingProgress(server *Server, delay time.Duration) *projectLoadingProgress {
	return newProjectLoadingProgressFromReporter(&serverProgressReporter{server: server}, delay)
}

func newProjectLoadingProgressFromReporter(reporter progressReporter, delay time.Duration) *projectLoadingProgress {
	p := &projectLoadingProgress{
		reporter: reporter,
		ch:       make(chan progressEvent, 64),
		delay:    delay,
	}
	go p.run()
	return p
}

func (p *projectLoadingProgress) start(message *diagnostics.Message, args ...any) {
	select {
	case p.ch <- progressEvent{message: message, args: args}:
		// Sent successfully.
	case <-p.reporter.done():
		// Server shutting down; drop the event.
	}
}

func (p *projectLoadingProgress) finish(message *diagnostics.Message, args ...any) {
	select {
	case p.ch <- progressEvent{message: message, args: args, finish: true}:
		// Sent successfully.
	case <-p.reporter.done():
		// Server shutting down; drop the event.
	}
}

// run is the persistent goroutine that processes all progress events.
// It owns all mutable state: no external synchronization needed.
func (p *projectLoadingProgress) run() {
	var (
		loading collections.OrderedMap[string, int]
		token   string // current token; empty if no progress active
		tokenID int
		begun   bool // whether "begin" has been sent for the current token
	)

	var delay *time.Timer
	delayC := func() <-chan time.Time {
		if delay == nil {
			return nil
		}
		return delay.C
	}
	stopDelay := func() {
		if delay != nil {
			delay.Stop()
			delay = nil
		}
	}
	delayFired := false // true after the delay timer fires

	for {
		select {
		case ev := <-p.ch:
			text := p.reporter.localize(ev.message, ev.args...)
			if !ev.finish {
				count := loading.GetOrZero(text)
				loading.Set(text, count+1)
				if token == "" {
					tokenID++
					token = fmt.Sprintf("tsgo-loading-%d", tokenID)
					begun = false
					if p.delay <= 0 {
						delayFired = true
						p.reporter.createWorkDoneProgress(token)
					} else {
						delayFired = false
						delay = time.NewTimer(p.delay)
					}
				}
				if delayFired {
					begun = p.beginOrReport(token, text, begun)
				}
			} else {
				count := loading.GetOrZero(text)
				if count <= 1 {
					loading.Delete(text)
				} else {
					loading.Set(text, count-1)
				}
				if token == "" {
					continue
				}
				if loading.Size() == 0 {
					if begun {
						p.reporter.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
							End: &lsproto.WorkDoneProgressEnd{},
						})
					}
					stopDelay()
					token = ""
				} else if delayFired {
					first := core.FirstOrNilSeq(loading.Keys())
					p.reporter.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
						Report: &lsproto.WorkDoneProgressReport{
							Message: &first,
						},
					})
				}
			}

		case <-delayC():
			delayFired = true
			if token != "" && loading.Size() > 0 {
				p.reporter.createWorkDoneProgress(token)
				first := core.FirstOrNilSeq(loading.Keys())
				begun = p.beginOrReport(token, first, begun)
			}

		case <-p.reporter.done():
			stopDelay()
			return
		}
	}
}

// beginOrReport sends WorkDoneProgressBegin if not yet begun, otherwise
// sends WorkDoneProgressReport. Returns true to indicate begun state.
func (p *projectLoadingProgress) beginOrReport(token, text string, begun bool) bool {
	if !begun {
		title := p.reporter.localize(diagnostics.Loading)
		p.reporter.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
			Begin: &lsproto.WorkDoneProgressBegin{
				Title:   title,
				Message: &text,
			},
		})
	} else {
		p.reporter.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
			Report: &lsproto.WorkDoneProgressReport{
				Message: &text,
			},
		})
	}
	return true
}
