package lsp

import (
	"fmt"
	"sync"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/logging"
)

var _ logging.Logger = (*logger)(nil)

type logger struct {
	server  *Server
	mu      sync.Mutex
	verbose bool
}

func newLogger(server *Server) *logger {
	return &logger{
		server: server,
	}
}

func (l *logger) sendLogMessage(msgType lsproto.MessageType, message string) {
	if l == nil {
		return
	}

	if !l.server.initStarted.Load() {
		fmt.Fprintln(l.server.stderr, message)
		return
	}

	notification := lsproto.WindowLogMessageInfo.NewNotificationMessage(&lsproto.LogMessageParams{
		Type:    msgType,
		Message: message,
	})
	l.server.outgoingQueue <- notification.Message()
}

func (l *logger) Log(msg ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeLog, fmt.Sprint(msg...))
}

func (l *logger) Logf(format string, args ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeLog, fmt.Sprintf(format, args...))
}

func (l *logger) Verbose() logging.Logger {
	if l == nil {
		return nil
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	if !l.verbose {
		return nil
	}
	return l
}

func (l *logger) IsVerbose() bool {
	if l == nil {
		return false
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	return l.verbose
}

func (l *logger) SetVerbose(verbose bool) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	l.verbose = verbose
}

func (l *logger) Error(msg ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeError, fmt.Sprint(msg...))
}

func (l *logger) Errorf(format string, args ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeError, fmt.Sprintf(format, args...))
}

func (l *logger) Warn(msg ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeWarning, fmt.Sprint(msg...))
}

func (l *logger) Warnf(format string, args ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeWarning, fmt.Sprintf(format, args...))
}

func (l *logger) Info(msg ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeInfo, fmt.Sprint(msg...))
}

func (l *logger) Infof(format string, args ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeInfo, fmt.Sprintf(format, args...))
}
