package logging

import (
	"fmt"
	"io"
	"sync"
	"time"
)

type Logger interface {
	// Log prints a line to the output writer with a header.
	Log(msg ...any)
	// Logf prints a formatted line to the output writer with a header.
	Logf(format string, args ...any)
	// Write prints the msg string to the output with no additional formatting, followed by a newline
	Write(msg string)
	// Verbose returns the logger instance if verbose logging is enabled, and otherwise returns nil.
	// A nil logger created with `logging.NewLogger` is safe to call methods on.
	Verbose() Logger
	// IsVerbose returns true if verbose logging is enabled, and false otherwise.
	IsVerbose() bool
	// SetVerbose sets the verbose logging flag.
	SetVerbose(verbose bool)
}

var _ Logger = (*logger)(nil)

type logger struct {
	mu      sync.Mutex
	verbose bool
	writer  io.Writer
	prefix  func() string
}

func (l *logger) Log(msg ...any) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	fmt.Fprintln(l.writer, l.prefix(), fmt.Sprint(msg...))
}

func (l *logger) Logf(format string, args ...any) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	fmt.Fprintf(l.writer, "%s %s\n", l.prefix(), fmt.Sprintf(format, args...))
}

func (l *logger) Write(msg string) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	fmt.Fprintln(l.writer, msg)
}

func (l *logger) Verbose() Logger {
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

func NewLogger(output io.Writer) Logger {
	return &logger{
		writer: output,
		prefix: func() string {
			return formatTime(time.Now())
		},
	}
}

func formatTime(t time.Time) string {
	return fmt.Sprintf("[%s]", t.Format("15:04:05.000"))
}
