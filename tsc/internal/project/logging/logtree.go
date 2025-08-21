package logging

import (
	"fmt"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

var seq atomic.Uint64

type logEntry struct {
	seq     uint64
	time    time.Time
	message string
	child   *LogTree
}

func newLogEntry(child *LogTree, message string) *logEntry {
	return &logEntry{
		seq:     seq.Add(1),
		time:    time.Now(),
		message: message,
		child:   child,
	}
}

var _ LogCollector = (*LogTree)(nil)

type LogTree struct {
	name    string
	mu      sync.Mutex
	logs    []*logEntry
	root    *LogTree
	level   int
	verbose bool

	// Only set on root
	count        atomic.Int32
	stringLength atomic.Int32
}

func NewLogTree(name string) *LogTree {
	lc := &LogTree{
		name: name,
	}
	lc.root = lc
	return lc
}

func (c *LogTree) add(log *logEntry) {
	// indent + header + message + newline
	c.root.stringLength.Add(int32(c.level + 15 + len(log.message) + 1))
	c.root.count.Add(1)
	c.mu.Lock()
	defer c.mu.Unlock()
	c.logs = append(c.logs, log)
}

func (c *LogTree) Log(message ...any) {
	if c == nil {
		return
	}
	log := newLogEntry(nil, fmt.Sprint(message...))
	c.add(log)
}

func (c *LogTree) Logf(format string, args ...any) {
	if c == nil {
		return
	}
	log := newLogEntry(nil, fmt.Sprintf(format, args...))
	c.add(log)
}

func (c *LogTree) Write(msg string) {
	if c == nil {
		return
	}
	log := newLogEntry(nil, msg)
	c.add(log)
}

func (c *LogTree) IsVerbose() bool {
	return c.verbose
}

func (c *LogTree) SetVerbose(verbose bool) {
	if c == nil {
		return
	}
	c.verbose = verbose
}

func (c *LogTree) Verbose() Logger {
	if c == nil || !c.verbose {
		return nil
	}
	return c
}

func (c *LogTree) Embed(logs *LogTree) {
	if c == nil {
		return
	}
	count := logs.count.Load()
	c.root.stringLength.Add(logs.stringLength.Load() + count*int32(c.level))
	c.root.count.Add(count)
	log := newLogEntry(logs, logs.name)
	c.add(log)
}

func (c *LogTree) Fork(message string) *LogTree {
	if c == nil {
		return nil
	}
	child := &LogTree{level: c.level + 1, root: c.root, verbose: c.verbose}
	log := newLogEntry(child, message)
	c.add(log)
	return child
}

func (c *LogTree) String() string {
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

func (c *LogTree) writeLogsRecursive(builder *strings.Builder, indent string) {
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
