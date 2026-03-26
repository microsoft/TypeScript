package lsp

import (
	"fmt"

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

// projectLoadingProgress manages LSP WorkDoneProgress indicators for
// long-running operations. A single persistent goroutine processes
// start/finish events, maintains a ref-counted map of active operations,
// and sends progress messages in order.
//
// start/finish may block if the internal buffer (64 events) is full,
// but will bail out if the server's background context is cancelled.
type projectLoadingProgress struct {
	server *Server
	ch     chan progressEvent
}

func newProjectLoadingProgress(server *Server) *projectLoadingProgress {
	p := &projectLoadingProgress{
		server: server,
		ch:     make(chan progressEvent, 64),
	}
	go p.run()
	return p
}

func (p *projectLoadingProgress) start(message *diagnostics.Message, args ...any) {
	select {
	case p.ch <- progressEvent{message: message, args: args}:
		// Sent successfully.
	case <-p.server.backgroundCtx.Done():
		// Server shutting down; drop the event.
	}
}

func (p *projectLoadingProgress) finish(message *diagnostics.Message, args ...any) {
	select {
	case p.ch <- progressEvent{message: message, args: args, finish: true}:
		// Sent successfully.
	case <-p.server.backgroundCtx.Done():
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
		title   = diagnostics.Loading.Localize(p.server.locale)
	)

	for {
		select {
		case ev := <-p.ch:
			text := ev.message.Localize(p.server.locale, ev.args...)
			if !ev.finish {
				count := loading.GetOrZero(text)
				loading.Set(text, count+1)
				if token == "" {
					tokenID++
					token = fmt.Sprintf("tsgo-loading-%d", tokenID)
					begun = false
					_, _ = sendClientRequest(p.server.backgroundCtx, p.server, lsproto.WindowWorkDoneProgressCreateInfo, &lsproto.WorkDoneProgressCreateParams{
						Token: lsproto.IntegerOrString{String: &token},
					})
				}
				if !begun {
					begun = true
					p.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
						Begin: &lsproto.WorkDoneProgressBegin{
							Title:   title,
							Message: &text,
						},
					})
				} else {
					p.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
						Report: &lsproto.WorkDoneProgressReport{
							Message: &text,
						},
					})
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
					p.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
						End: &lsproto.WorkDoneProgressEnd{},
					})
					token = ""
				} else {
					first := core.FirstOrNilSeq(loading.Keys())
					p.sendProgress(token, lsproto.WorkDoneProgressBeginOrReportOrEnd{
						Report: &lsproto.WorkDoneProgressReport{
							Message: &first,
						},
					})
				}
			}

		case <-p.server.backgroundCtx.Done():
			return
		}
	}
}

// sendProgress sends a $/progress notification with a snapshot of the token
// string, so deferred serialization in the write loop won't see a mutated value.
func (p *projectLoadingProgress) sendProgress(token string, value lsproto.WorkDoneProgressBeginOrReportOrEnd) {
	_ = sendNotification(p.server, lsproto.ProgressInfo, &lsproto.ProgressParams{
		Token: lsproto.IntegerOrString{String: &token},
		Value: value,
	})
}
