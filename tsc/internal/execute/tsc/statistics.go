package tsc

import (
	"fmt"
	"io"
	"runtime"
	"strconv"
	"time"

	"github.com/microsoft/typescript-go/internal/compiler"
)

type tableRow struct {
	name  string
	value string
}

type table struct {
	rows []tableRow
}

func (t *table) add(name string, value any) {
	if d, ok := value.(time.Duration); ok {
		value = formatDuration(d)
	}
	t.rows = append(t.rows, tableRow{name, fmt.Sprint(value)})
}

func (t *table) print(w io.Writer) {
	nameWidth := 0
	valueWidth := 0
	for _, r := range t.rows {
		nameWidth = max(nameWidth, len(r.name))
		valueWidth = max(valueWidth, len(r.value))
	}

	for _, r := range t.rows {
		fmt.Fprintf(w, "%-*s %*s\n", nameWidth+1, r.name+":", valueWidth, r.value)
	}
}

func formatDuration(d time.Duration) string {
	return fmt.Sprintf("%.3fs", d.Seconds())
}

func identifierCount(p *compiler.Program) int {
	count := 0
	for _, file := range p.SourceFiles() {
		count += file.IdentifierCount
	}
	return count
}

type Statistics struct {
	isAggregate      bool
	Projects         int
	ProjectsBuilt    int
	TimestampUpdates int
	files            int
	lines            int
	identifiers      int
	symbols          int
	types            int
	instantiations   int
	memoryUsed       uint64
	memoryAllocs     uint64
	compileTimes     *CompileTimes
}

func statisticsFromProgram(input EmitInput, memStats *runtime.MemStats) *Statistics {
	return &Statistics{
		files:          len(input.Program.SourceFiles()),
		lines:          input.Program.LineCount(),
		identifiers:    input.Program.IdentifierCount(),
		symbols:        input.Program.SymbolCount(),
		types:          input.Program.TypeCount(),
		instantiations: input.Program.InstantiationCount(),
		memoryUsed:     memStats.Alloc,
		memoryAllocs:   memStats.Mallocs,
		compileTimes:   input.CompileTimes,
	}
}

func (s *Statistics) Report(w io.Writer, testing CommandLineTesting) {
	if testing != nil {
		testing.OnStatisticsStart(w)
		defer testing.OnStatisticsEnd(w)
	}
	var table table
	var prefix string

	if s.isAggregate {
		prefix = "Aggregate "
		table.add("Projects in scope", s.Projects)
		table.add("Projects built", s.ProjectsBuilt)
		table.add("Timestamps only updates", s.TimestampUpdates)
	}
	table.add(prefix+"Files", s.files)
	table.add(prefix+"Lines", s.lines)
	table.add(prefix+"Identifiers", s.identifiers)
	table.add(prefix+"Symbols", s.symbols)
	table.add(prefix+"Types", s.types)
	table.add(prefix+"Instantiations", s.instantiations)
	table.add(prefix+"Memory used", fmt.Sprintf("%vK", s.memoryUsed/1024))
	table.add(prefix+"Memory allocs", strconv.FormatUint(s.memoryAllocs, 10))
	if s.compileTimes.ConfigTime != 0 {
		table.add(prefix+"Config time", s.compileTimes.ConfigTime)
	}
	if s.compileTimes.BuildInfoReadTime != 0 {
		table.add(prefix+"BuildInfo read time", s.compileTimes.BuildInfoReadTime)
	}
	table.add(prefix+"Parse time", s.compileTimes.ParseTime)
	if s.compileTimes.bindTime != 0 {
		table.add(prefix+"Bind time", s.compileTimes.bindTime)
	}
	if s.compileTimes.checkTime != 0 {
		table.add(prefix+"Check time", s.compileTimes.checkTime)
	}
	if s.compileTimes.emitTime != 0 {
		table.add(prefix+"Emit time", s.compileTimes.emitTime)
	}
	if s.compileTimes.ChangesComputeTime != 0 {
		table.add(prefix+"Changes compute time", s.compileTimes.ChangesComputeTime)
	}
	table.add(prefix+"Total time", s.compileTimes.totalTime)
	table.print(w)
}

func (s *Statistics) Aggregate(stat *Statistics) {
	s.isAggregate = true
	if s.compileTimes == nil {
		s.compileTimes = &CompileTimes{}
	}
	// Aggregate statistics
	s.files += stat.files
	s.lines += stat.lines
	s.identifiers += stat.identifiers
	s.symbols += stat.symbols
	s.types += stat.types
	s.instantiations += stat.instantiations
	s.memoryUsed += stat.memoryUsed
	s.memoryAllocs += stat.memoryAllocs
	s.compileTimes.ConfigTime += stat.compileTimes.ConfigTime
	s.compileTimes.BuildInfoReadTime += stat.compileTimes.BuildInfoReadTime
	s.compileTimes.ParseTime += stat.compileTimes.ParseTime
	s.compileTimes.bindTime += stat.compileTimes.bindTime
	s.compileTimes.checkTime += stat.compileTimes.checkTime
	s.compileTimes.emitTime += stat.compileTimes.emitTime
	s.compileTimes.ChangesComputeTime += stat.compileTimes.ChangesComputeTime
}

func (s *Statistics) SetTotalTime(totalTime time.Duration) {
	if s.compileTimes == nil {
		s.compileTimes = &CompileTimes{}
	}
	s.compileTimes.totalTime = totalTime
}
