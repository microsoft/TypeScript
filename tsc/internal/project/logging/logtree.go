package logging

import (
	"fmt"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

var seq atomic.Uint64

type logEntry struct {
	seq     uint64
	time    time.Time
	message string
	child   *InitializedLogTree
}

type (
	defLogEntry        = *logEntry           /* ref: nonnil */
	InitializedLogTree = LogTree             /* ref: struct { root typeutil.DefPtr[LogTree] } */
	DefLogTree         = *InitializedLogTree /* ref: nonnil */
)

func newLogEntry(child *InitializedLogTree, message string) defLogEntry {
	return &logEntry{
		seq:     seq.Add(1),
		time:    time.Now(),
		message: message,
		child:   child,
	}
}

func assertDefLogTreeImplementsLogCollector(tree DefLogTree) {
	var _ LogCollector = tree
}

type LogTree struct {
	name    string
	mu      sync.Mutex
	logs    []defLogEntry
	root    *LogTree
	level   int
	verbose bool

	// Only set on root
	count        atomic.Int32
	stringLength atomic.Int32
}

func NewLogTree(name string) DefLogTree {
	lc := &LogTree{name: name}
	lc.root = lc
	return lc //ref:ignore
}

func (c DefLogTree) add(log defLogEntry) {
	// indent + header + message + newline
	c.root.stringLength.Add(int32(c.level + 15 + len(log.message) + 1))
	c.root.count.Add(1)
	c.mu.Lock()
	defer c.mu.Unlock()
	c.logs = append(c.logs, log)
}

func (c *InitializedLogTree) Log(message ...any) {
	if c == nil {
		return
	}
	log := newLogEntry(nil, fmt.Sprint(message...))
	c.add(log)
}

func (c *InitializedLogTree) Logf(format string, args ...any) {
	if c == nil {
		return
	}
	log := newLogEntry(nil, fmt.Sprintf(format, args...))
	c.add(log)
}

func (c DefLogTree) IsVerbose() bool {
	return c.verbose
}

func (c *InitializedLogTree) SetVerbose(verbose bool) {
	if c == nil {
		return
	}
	c.verbose = verbose
}

func (c *InitializedLogTree) Verbose() Logger {
	if c == nil || !c.verbose {
		return nil
	}
	return c
}

func (c *InitializedLogTree) Error(msg ...any) {
	c.Log(msg...)
}

func (c *InitializedLogTree) Errorf(format string, args ...any) {
	c.Logf(format, args...)
}

func (c *InitializedLogTree) Warn(msg ...any) {
	c.Log(msg...)
}

func (c *InitializedLogTree) Warnf(format string, args ...any) {
	c.Logf(format, args...)
}

func (c *InitializedLogTree) Info(msg ...any) {
	c.Log(msg...)
}

func (c *InitializedLogTree) Infof(format string, args ...any) {
	c.Logf(format, args...)
}

func (c *InitializedLogTree) Embed(logs DefLogTree) {
	if c == nil {
		return
	}
	count := logs.count.Load()
	c.root.stringLength.Add(logs.stringLength.Load() + count*int32(c.level))
	c.root.count.Add(count)
	log := newLogEntry(logs, logs.name)
	c.add(log)
}

func (c *InitializedLogTree) Fork(message string) *InitializedLogTree {
	if c == nil {
		return nil
	}
	child := &InitializedLogTree{level: c.level + 1, root: c.root, verbose: c.verbose}
	log := newLogEntry(child, message)
	c.add(log)
	return child
}

func (c DefLogTree) String() string {
	if c.root != c {
		panic("can only call String on root LogTree")
	}
	var builder strings.Builder
	header := fmt.Sprintf("======== %s ========\n", c.name)
	builder.Grow(int(c.stringLength.Load()) + len(header))
	builder.WriteString(header)
	c.writeLogsRecursive(&builder, "")
	return builder.String()
}

func (c DefLogTree) writeLogsRecursive(builder typeutil.DefPtr[strings.Builder], indent string) {
	for _, log := range c.logs {
		builder.WriteString(indent)
		builder.WriteString(formatTime(log.time))
		builder.WriteString(" ")
		builder.WriteString(log.message)
		builder.WriteString("\n")
		if log.child != nil {
			log.child.writeLogsRecursive(builder, indent+"\t")
		}
	}
}
