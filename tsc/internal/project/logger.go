package project

import (
	"bufio"
	"fmt"
	"io"
	"strings"
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
	outputs []*bufio.Writer
	level   LogLevel
	inGroup bool
	seq     int
}

func NewLogger(outputs []io.Writer, level LogLevel) *Logger {
	var o []*bufio.Writer
	for _, w := range outputs {
		o = append(o, bufio.NewWriter(w))
	}
	return &Logger{outputs: o, level: level}
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

func (l *Logger) StartGroup() {
	l.inGroup = true
}

func (l *Logger) EndGroup() {
	l.inGroup = false
}

func (l *Logger) LoggingEnabled() bool {
	return len(l.outputs) > 0
}

func (l *Logger) HasLevel(level LogLevel) bool {
	return l.LoggingEnabled() && l.level >= level
}

func (l *Logger) msg(s string, messageType string) {
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
	if !l.inGroup {
		l.seq++
	}
}
