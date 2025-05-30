package project

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
	"sync"
	"time"
)

type LogLevel int

const (
	LogLevelTerse LogLevel = iota
	LogLevelNormal
	LogLevelRequestTime
	LogLevelVerbose
)

type Logger struct {
	mu         sync.Mutex
	outputs    []*bufio.Writer
	fileHandle *os.File
	level      LogLevel
	seq        int
}

func NewLogger(outputs []io.Writer, file string, level LogLevel) *Logger {
	var o []*bufio.Writer
	for _, w := range outputs {
		o = append(o, bufio.NewWriter(w))
	}
	logger := &Logger{outputs: o, level: level}
	logger.SetFile(file)
	return logger
}

func (l *Logger) SetFile(file string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	if l.fileHandle != nil {
		oldWriter := l.outputs[len(l.outputs)-1]
		l.outputs = l.outputs[:len(l.outputs)-1]
		_ = oldWriter.Flush()
		l.fileHandle.Close()
	}
	if file != "" {
		f, err := os.OpenFile(file, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o666)
		if err != nil {
			panic(err)
		}
		l.fileHandle = f
		l.outputs = append(l.outputs, bufio.NewWriter(f))
	}
}

func (l *Logger) PerfTrace(s string) {
	l.msg(s, "Perf")
}

func (l *Logger) Info(s string) {
	l.msg(s, "Info")
}

func (l *Logger) Error(s string) {
	l.msg(s, "Err")
}

func (l *Logger) LoggingEnabled() bool {
	return l != nil && len(l.outputs) > 0
}

func (l *Logger) HasLevel(level LogLevel) bool {
	return l != nil && l.LoggingEnabled() && l.level >= level
}

func (l *Logger) Close() {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, output := range l.outputs {
		_ = output.Flush()
	}
	if l.fileHandle != nil {
		_ = l.fileHandle.Close()
	}
}

func (l *Logger) msg(s string, messageType string) {
	if l == nil {
		return
	}
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, output := range l.outputs {
		header := fmt.Sprintf("%s %d", messageType, l.seq)
		output.WriteString(header)                                      //nolint: errcheck
		output.WriteString(strings.Repeat(" ", max(0, 10-len(header)))) //nolint: errcheck
		output.WriteRune('[')                                           //nolint: errcheck
		output.WriteString(time.Now().Format("15:04:05.000"))           //nolint: errcheck
		output.WriteString("] ")                                        //nolint: errcheck
		output.WriteString(s)                                           //nolint: errcheck
		output.WriteRune('\n')                                          //nolint: errcheck
		output.Flush()
	}
	l.seq++
}
