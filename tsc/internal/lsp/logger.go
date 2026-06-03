package lsp

import (
	"fmt"
	"sync"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/logging"
)

var _ logging.Logger = (*logger)(nil)

type logger struct {
	server    *Server
	mu        sync.Mutex
	verbosity lsproto.LogVerbosity
}

func newLogger(server *Server) *logger {
	return &logger{
		server:    server,
		verbosity: lsproto.LogVerbosityInfo,
	}
}

// maxVerbosityForMessageType returns the least-verbose log level at which
// messages of the given LSP MessageType should still be sent.
func maxVerbosityForMessageType(msgType lsproto.MessageType) lsproto.LogVerbosity {
	switch msgType {
	case lsproto.MessageTypeError:
		return lsproto.LogVerbosityError
	case lsproto.MessageTypeWarning:
		return lsproto.LogVerbosityWarning
	case lsproto.MessageTypeInfo:
		return lsproto.LogVerbosityInfo
	case lsproto.MessageTypeDebug:
		return lsproto.LogVerbosityDebug
	default:
		return lsproto.LogVerbosityInfo
	}
}

// isValidLogVerbosity reports whether v is one of the defined LogVerbosity values.
func isValidLogVerbosity(v lsproto.LogVerbosity) bool {
	return v >= lsproto.LogVerbosityOff && v <= lsproto.LogVerbosityError
}

func (l *logger) sendLogMessage(msgType lsproto.MessageType, message string) {
	if l == nil {
		return
	}

	if !l.server.initStarted.Load() {
		fmt.Fprintln(l.server.stderr, message)
		return
	}

	// Don't send messages that the client will filter out anyway.
	l.mu.Lock()
	verbosity := l.verbosity
	l.mu.Unlock()
	if verbosity == lsproto.LogVerbosityOff || verbosity > maxVerbosityForMessageType(msgType) {
		return
	}

	notification := lsproto.WindowLogMessageInfo.NewNotificationMessage(&lsproto.LogMessageParams{
		Type:    msgType,
		Message: message,
	})

	if err := l.server.outgoingQueue.Put(l.server.backgroundCtx, notification.Message()); err != nil {
		if l.server.backgroundCtx.Err() != nil {
			fmt.Fprintln(l.server.stderr, message)
		}
	}
}

func (l *logger) Log(msg ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeInfo, fmt.Sprint(msg...))
}

func (l *logger) Logf(format string, args ...any) {
	if l == nil {
		return
	}
	l.sendLogMessage(lsproto.MessageTypeInfo, fmt.Sprintf(format, args...))
}

func (l *logger) Verbose() logging.Logger {
	if l == nil {
		return nil
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	if l.verbosity == lsproto.LogVerbosityOff || l.verbosity > lsproto.LogVerbosityDebug {
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
	return l.verbosity >= lsproto.LogVerbosityTrace && l.verbosity <= lsproto.LogVerbosityDebug
}

func (l *logger) SetVerbose(verbose bool) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	if verbose {
		l.verbosity = lsproto.LogVerbosityDebug
	} else {
		l.verbosity = lsproto.LogVerbosityInfo
	}
}

func (l *logger) IsTracing() bool {
	if l == nil {
		return false
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	return l.verbosity == lsproto.LogVerbosityTrace
}

func (l *logger) SetVerbosity(verbosity lsproto.LogVerbosity) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	l.verbosity = verbosity
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
