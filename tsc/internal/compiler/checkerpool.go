package compiler

import (
	"cmp"
	"context"
	"math"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tracing"
)

// CheckerPool is implemented by the project system to provide checkers with
// request-scoped lifetime and reclamation. It returns a checker and a release
// function that must be called when the caller is done with the checker.
// The returned checker must not be accessed concurrently; each acquisition is exclusive.
// Acquisitions are not reentrant, even when they share a request ID. Callers must
// pass an already acquired checker to nested operations instead of acquiring again.
// If file is non-nil, the pool may use it as an affinity hint to return the same
// checker for the same file across calls.
type CheckerPool interface {
	GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func())
}

type checkerPool struct {
	program *Program
	tracing *tracing.Tracing

	createCheckersOnce sync.Once
	checkers           []*checker.Checker
	locks              []*sync.Mutex
	fileAssociations   map[*ast.SourceFile]*checker.Checker
}

var _ CheckerPool = (*checkerPool)(nil)

/*
Checker association is a balanced graph-partitioning problem:

  - A vertex is a group of type-checked source files.
  - An undirected edge connects two groups for each resolved, in-program import
    entry between files in them. Multiple entries may connect the same pair and
    therefore strengthen their affinity. Self-imports and unresolved or external
    targets do not create edges.
  - A partition is a checker with its own symbol, type, and instantiation caches.

Putting related files on the same checker reduces duplicated cache construction,
but concentrating too many roots on one checker increases the parallel critical
path. We use weighted FENNEL to trade off those objectives:

	affinity(partition) - alpha * incrementalLoadPenalty(partition)

See Tsourakakis et al., "FENNEL: Streaming Graph Partitioning for Massive Scale
Graphs", WSDM 2014: https://doi.org/10.1145/2556195.2556213.

Import edges alone are a weak locality signal: most of a checker's caches are
built for the types that a file's whole neighborhood shares (a framework's
declarations, a package's own types), and files in one directory tend to share
far more of those than their direct imports show. So FENNEL places groups of
files rather than single files. Groups start from directories: walking down
from the root, the first directory small enough to fit within
1/(checkerAssociationGroupFraction*checkerAssociationFineGroupDivisor) of an
average checker load becomes one unit with everything beneath it; a file whose
every enclosing directory is too big is a unit by itself. Label propagation over
the import graph then merges these units into groups of up to
1/checkerAssociationGroupFraction of an average load, so that tightly connected
directories stay together even when they are not siblings. Groups are placed
from heaviest to lightest, so that the big ones are spread while every checker
still has room, and the small ones fill in the remaining capacity next to their
neighbors.

Estimated work is often far off, and the error is shared by everything in a
directory: if one area costs twice its estimate, a checker holding most of it
falls behind and sets the overall time. So the load FENNEL balances is not the
estimate alone. For each area (the project's directories down to
checkerAssociationAreaDepth levels, and each file), a checker holding more than
its fair share 1/k of that area accumulates the square of the excess; the
square root of the sum, scaled by checkerAssociationSpreadMultiplier, is added
to its load. This spreads every large area across checkers, so that no single
misestimate can hold one checker back for long, while small areas stay
together. The penalty uses integer arithmetic so that assignments are
identical on every platform.

Declaration and JSON files whose checking is skipped (skipLibCheck or
skipDefaultLibCheck) are left out of the partition entirely, since no checker
spends time on them up front. Any later on-demand request for one goes to
checker 0.

FENNEL is sensitive to stream order. This is both established in the partitioning
literature (for example, Awadelkarim and Ugander, "Prioritized Restreaming
Algorithms for Balanced Graph Partitioning", KDD 2020:
https://arxiv.org/abs/2007.03131) and pronounced in checker workloads because
semantic work is demand-driven. Directory groups bound how far a bad order can
scatter related files, and a second pass (restreaming) lets each group see
neighbors that came after it in the first pass.

The constants below were chosen on bluesky, sentry, t3code (server), MUI docs,
VS Code, XState, and the TypeScript compiler at 2, 4, and 8 checkers:

  - 100-byte text weight divisor: keeps large literals, comments, and generated
    files from appearing artificially cheap without allowing raw byte length to
    dominate.
  - 1/16 checker load per group, built from directories of 1/64 merged over
    5 label propagation rounds: large enough to keep a package's files
    together, small enough that one misjudged group cannot hold a checker back
    for long.
  - 6 area levels and a 2x spread multiplier: without the penalty, VS Code
    and MUI docs regressed by 7-13% from concentrated areas; 1.5x and 3x
    each had a worse worst case than 2x.
  - 2 passes: the second lets each group follow neighbors placed after it.
  - 1x FENNEL penalty: groups already carry the locality, so the balance term
    only needs to break ties between checkers with similar affinity.
  - 256 imports per file: a file with more is a barrel or a route table whose
    references are cheap to check (MUI's icon index re-exports 10,750 modules
    and takes 20ms, but uncapped it would carry 14% of the estimated work and
    pull every icon onto its checker with it).
*/
const (
	checkerAssociationTextWeightDivisor = 100
	checkerAssociationGroupFraction     = 16
	checkerAssociationPenaltyMultiplier = 1
	checkerAssociationMaxImports        = 256
	checkerAssociationFineGroupDivisor  = 4
	checkerAssociationMergeRounds       = 5
	checkerAssociationAreaDepth         = 6
	checkerAssociationSpreadMultiplier  = 2
	checkerAssociationPasses            = 2
)

// checkerAssociationGraph is the input to getCheckerAssociationsInOrder. Each
// vertex has a weight, a multiset of adjacent vertices, and its weight within
// each area, sorted by area. areas may be nil, in which case loads are not
// adjusted for concentration.
type checkerAssociationGraph struct {
	weights    []int
	adjacency  [][]int
	areas      [][]checkerAssociationAreaWeight
	areaTotals []int
	// areaShift scales area weights down so that squared excesses fit in uint64.
	areaShift uint
}

type checkerAssociationAreaWeight struct {
	area   int
	weight int
}

// checkerAssociationLoads tracks each checker's estimated load and how much of
// each area it holds. A checker's concentration is the root sum of squares of
// how far its weight in each area exceeds that area's fair share; its effective
// load adds checkerAssociationSpreadMultiplier times that concentration.
type checkerAssociationLoads struct {
	graph          *checkerAssociationGraph
	weights        []int
	areaWeights    []map[int]int
	excessSquares  []uint64
	effectiveCache []int
}

func newCheckerAssociationLoads(graph *checkerAssociationGraph, checkerCount int) *checkerAssociationLoads {
	loads := &checkerAssociationLoads{
		graph:          graph,
		weights:        make([]int, checkerCount),
		excessSquares:  make([]uint64, checkerCount),
		effectiveCache: make([]int, checkerCount),
	}
	if graph.areas != nil {
		loads.areaWeights = make([]map[int]int, checkerCount)
		for i := range loads.areaWeights {
			loads.areaWeights[i] = make(map[int]int)
		}
	}
	return loads
}

func (l *checkerAssociationLoads) effective(checkerIndex int) int {
	return l.effectiveCache[checkerIndex]
}

func (l *checkerAssociationLoads) effectiveLoad(weight int, excessSquares uint64) int {
	return weight + checkerAssociationSpreadMultiplier*int(isqrt(excessSquares)<<l.graph.areaShift)
}

// after returns the effective load and squared excess of checker checkerIndex
// if vertex were added to it.
func (l *checkerAssociationLoads) after(checkerIndex int, vertex int) (int, uint64) {
	squares := l.excessSquares[checkerIndex]
	if l.areaWeights != nil {
		checkerCount := len(l.weights)
		areaWeights := l.areaWeights[checkerIndex]
		for _, a := range l.graph.areas[vertex] {
			fairShare := l.graph.areaTotals[a.area] / checkerCount
			old := uint64(max(areaWeights[a.area]-fairShare, 0))
			updated := uint64(max(areaWeights[a.area]+a.weight-fairShare, 0))
			squares += updated*updated - old*old
		}
	}
	return l.effectiveLoad(l.weights[checkerIndex]+l.graph.weights[vertex], squares), squares
}

func (l *checkerAssociationLoads) add(checkerIndex int, vertex int, squares uint64) {
	l.weights[checkerIndex] += l.graph.weights[vertex]
	l.excessSquares[checkerIndex] = squares
	if l.areaWeights != nil {
		for _, a := range l.graph.areas[vertex] {
			l.areaWeights[checkerIndex][a.area] += a.weight
		}
	}
	l.effectiveCache[checkerIndex] = l.effectiveLoad(l.weights[checkerIndex], squares)
}

// isqrt returns floor(sqrt(n)).
func isqrt(n uint64) uint64 {
	r := uint64(math.Sqrt(float64(n)))
	for r > 0 && r*r > n {
		r--
	}
	for (r+1)*(r+1) <= n {
		r++
	}
	return r
}

// getCheckerAssociationsInOrder partitions the graph using a weighted adaptation
// of FENNEL's streaming graph-partitioning objective with gamma = 3/2. Each
// vertex is placed where it has the most already-placed neighbors, minus the
// incremental convex penalty on the checker's effective load. The published
// alpha = m*sqrt(k)/n^(3/2) becomes m*sqrt(k)/W^(3/2), where W is total
// estimated checker work.
//
// When previous is non-nil, neighbors not yet placed in this pass count toward
// the checker previous assigned them, so that a second pass sees affinity to
// vertices later in the order.
//
// The preferred maximum effective load is the larger of the largest vertex and
// roughly 101% of average. If no checker can accept a vertex under that bound,
// it is assigned to the checker with the least resulting effective load. The 1%
// slack permits discrete vertices to pack near the average while preventing
// affinity from deliberately creating meaningful estimated imbalance. Ties are
// deterministic.
func getCheckerAssociationsInOrder(graph *checkerAssociationGraph, order []int, checkerCount int, previous []int) []int {
	if len(graph.weights) == 0 {
		return nil
	}

	totalWeight := 0
	maxWeight := 0
	edgeCount := 0
	for i, weight := range graph.weights {
		totalWeight += weight
		maxWeight = max(maxWeight, weight)
		edgeCount += len(graph.adjacency[i])
	}

	associations := make([]int, len(graph.weights))
	for i := range associations {
		associations[i] = -1
	}
	loads := newCheckerAssociationLoads(graph, checkerCount)
	averageCheckerWeight := (totalWeight + checkerCount - 1) / checkerCount
	maxCheckerWeight := max(maxWeight, averageCheckerWeight+averageCheckerWeight/100)
	totalWeightFloat := float64(totalWeight)
	alpha := float64(checkerAssociationPenaltyMultiplier) * float64(edgeCount/2) * math.Sqrt(float64(checkerCount)) / (totalWeightFloat * math.Sqrt(totalWeightFloat))
	neighborCounts := make([]int, checkerCount)
	newLoads := make([]int, checkerCount)
	newSquares := make([]uint64, checkerCount)

	for position := range graph.weights {
		vertex := position
		if order != nil {
			vertex = order[position]
		}

		clear(neighborCounts)
		for _, neighbor := range graph.adjacency[vertex] {
			checkerIndex := associations[neighbor]
			if checkerIndex < 0 && previous != nil {
				checkerIndex = previous[neighbor]
			}
			if checkerIndex >= 0 {
				neighborCounts[checkerIndex]++
			}
		}

		bestChecker := -1
		bestScore := math.Inf(-1)
		for checkerIndex := range checkerCount {
			newLoads[checkerIndex], newSquares[checkerIndex] = loads.after(checkerIndex, vertex)
			if newLoads[checkerIndex] > maxCheckerWeight {
				continue
			}
			oldWeight := float64(loads.effective(checkerIndex))
			newWeight := float64(newLoads[checkerIndex])
			newPenalty := float64(newWeight * math.Sqrt(newWeight))
			oldPenalty := float64(oldWeight * math.Sqrt(oldWeight))
			penalty := float64(alpha * (newPenalty - oldPenalty))
			score := float64(neighborCounts[checkerIndex]) - penalty
			if score > bestScore || score == bestScore && (bestChecker < 0 || loads.weights[checkerIndex] < loads.weights[bestChecker]) {
				bestChecker = checkerIndex
				bestScore = score
			}
		}
		if bestChecker < 0 {
			bestChecker = 0
			for checkerIndex := 1; checkerIndex < checkerCount; checkerIndex++ {
				if newLoads[checkerIndex] < newLoads[bestChecker] {
					bestChecker = checkerIndex
				}
			}
		}
		associations[vertex] = bestChecker
		loads.add(bestChecker, vertex, newSquares[bestChecker])
	}
	return associations
}

func getCheckerAssociationBaseWeight(nodeCount int, textLength int) int {
	return max(nodeCount+textLength/checkerAssociationTextWeightDivisor, 1)
}

// getCheckerAssociationWeights combines local syntax work with syntactic import
// fanout. One import unit is totalBaseWeight / totalImports, so imports collectively
// contribute approximately the same vertex weight as syntax. Syntactic imports are
// deliberately broader than getImportAdjacency's resolved, in-program edges: this
// term estimates the work of processing module references, while adjacency controls
// checker affinity. Normalizing the term avoids a project-specific vertex-weight
// constant. A program with few imports, such as one built from namespaces, would
// make each import outweigh whole files, so an import unit is capped at twice the
// average weight of a weighted file.
func getCheckerAssociationWeights(baseWeights []int, importCounts []int) []int {
	totalBaseWeight := 0
	totalImports := 0
	weightedFiles := 0
	for i, baseWeight := range baseWeights {
		totalBaseWeight += baseWeight
		totalImports += importCounts[i]
		if baseWeight > 0 {
			weightedFiles++
		}
	}
	importWeight := 0
	if totalImports > 0 {
		importWeight = max(min(totalBaseWeight/totalImports, 2*totalBaseWeight/weightedFiles), 1)
	}
	fileWeights := make([]int, len(baseWeights))
	for i, baseWeight := range baseWeights {
		fileWeights[i] = baseWeight + importCounts[i]*importWeight
	}
	return fileWeights
}

func newCheckerPool(program *Program) *checkerPool {
	return newCheckerPoolWithTracing(program, nil)
}

func newCheckerPoolWithTracing(program *Program, tr *tracing.Tracing) *checkerPool {
	checkerCount := 4
	if program.SingleThreaded() {
		checkerCount = 1
	} else if c := program.Options().Checkers; c != nil {
		checkerCount = *c
	}

	checkerCount = max(min(checkerCount, len(program.files), 256), 1)

	pool := &checkerPool{
		program:  program,
		checkers: make([]*checker.Checker, checkerCount),
		locks:    make([]*sync.Mutex, checkerCount),
		tracing:  tr,
	}

	return pool
}

// GetChecker implements CheckerPool. When file is non-nil, returns the checker
// associated with that file; otherwise returns the first checker.
func (p *checkerPool) GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	if file != nil {
		return p.getCheckerForFileExclusive(ctx, file)
	}
	p.createCheckers()
	c := p.checkers[0]
	p.locks[0].Lock()
	return c, sync.OnceFunc(func() {
		p.locks[0].Unlock()
	})
}

// getCheckerForFileNonExclusive returns the checker for the given file without locking.
// This is only safe when the caller guarantees no concurrent access to the same checker,
// e.g. for read-only operations like obtaining an emit resolver.
func (p *checkerPool) getCheckerForFileNonExclusive(file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	return p.fileAssociations[file], noop
}

func (p *checkerPool) getCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	p.createCheckers()
	c := p.fileAssociations[file]
	idx := slices.Index(p.checkers, c)
	p.locks[idx].Lock()
	return c, sync.OnceFunc(func() {
		p.locks[idx].Unlock()
	})
}

// getCheckerNonExclusive returns the first checker without locking.
func (p *checkerPool) getCheckerNonExclusive() (*checker.Checker, func()) {
	p.createCheckers()
	return p.checkers[0], noop
}

func (p *checkerPool) createCheckers() {
	p.createCheckersOnce.Do(func() {
		checkerCount := len(p.checkers)
		wg := core.NewWorkGroup(p.program.SingleThreaded())
		for i := range checkerCount {
			wg.Queue(func() {
				var tracer *checker.Tracer
				if p.tracing != nil {
					tracer = checker.NewTracer(p.tracing, i)
				}
				p.checkers[i], p.locks[i] = checker.NewChecker(p.program, tracer)
			})
		}

		wg.RunAndWait()

		var associations []int
		if checkerCount > 1 {
			associations = p.getCheckerAssociations(checkerCount)
		} else {
			associations = make([]int, len(p.program.files))
		}
		p.fileAssociations = make(map[*ast.SourceFile]*checker.Checker, len(p.program.files))
		for i, file := range p.program.files {
			p.fileAssociations[file] = p.checkers[associations[i]]
		}
	})
}

// getCheckerAssociations returns the checker index of each program file.
func (p *checkerPool) getCheckerAssociations(checkerCount int) []int {
	files := p.program.files
	baseWeights := make([]int, len(files))
	importCounts := make([]int, len(files))
	var order []int
	for i, file := range files {
		if (file.IsDeclarationFile || ast.IsJsonSourceFile(file)) && p.program.SkipTypeChecking(file, false) {
			continue
		}
		baseWeights[i] = getCheckerAssociationBaseWeight(file.NodeCount, len(file.Text()))
		importCounts[i] = min(len(file.Imports()), checkerAssociationMaxImports)
		order = append(order, i)
	}
	associations := make([]int, len(files))
	if len(order) == 0 {
		return associations
	}
	weights := getCheckerAssociationWeights(baseWeights, importCounts)
	paths := make([]string, len(files))
	for _, i := range order {
		paths[i] = string(files[i].PathKey())
	}
	slices.SortFunc(order, func(a, b int) int {
		return cmp.Or(strings.Compare(paths[a], paths[b]), cmp.Compare(a, b))
	})
	totalWeight := 0
	for _, i := range order {
		totalWeight += weights[i]
	}
	maxGroupWeight := totalWeight / (checkerCount * checkerAssociationGroupFraction)

	adjacentFiles := p.getImportAdjacency()
	fineGroupOf, fineGroupWeights := getDirectoryGroups(paths, weights, order, maxGroupWeight/checkerAssociationFineGroupDivisor)
	labels := mergeCheckerAssociationGroups(fineGroupWeights, getGroupAdjacency(adjacentFiles, fineGroupOf, order, len(fineGroupWeights)), maxGroupWeight)

	groupOf := make([]int, len(files))
	for i := range groupOf {
		groupOf[i] = -1
	}
	groupIDs := make(map[int]int)
	var groupWeights []int
	for _, i := range order {
		label := labels[fineGroupOf[i]]
		g, ok := groupIDs[label]
		if !ok {
			g = len(groupWeights)
			groupIDs[label] = g
			groupWeights = append(groupWeights, 0)
		}
		groupOf[i] = g
		groupWeights[g] += weights[i]
	}

	graph := &checkerAssociationGraph{
		weights:   groupWeights,
		adjacency: getGroupAdjacency(adjacentFiles, groupOf, order, len(groupWeights)),
	}
	graph.areas, graph.areaTotals, graph.areaShift = getCheckerAssociationAreas(paths, weights, order, groupOf, len(groupWeights), totalWeight)

	groupOrder := make([]int, len(groupWeights))
	for g := range groupOrder {
		groupOrder[g] = g
	}
	slices.SortFunc(groupOrder, func(a, b int) int {
		return cmp.Or(cmp.Compare(groupWeights[b], groupWeights[a]), cmp.Compare(a, b))
	})
	var groupAssociations []int
	for range checkerAssociationPasses {
		groupAssociations = getCheckerAssociationsInOrder(graph, groupOrder, checkerCount, groupAssociations)
	}
	for _, i := range order {
		associations[i] = groupAssociations[groupOf[i]]
	}
	return associations
}

// getDirectoryGroups assigns each file in order (sorted by path) to the
// outermost enclosing directory whose files in order weigh no more than
// maxGroupWeight; when no directory is that light, the file is alone. Groups
// are numbered by first appearance in path order. groupOf is -1 for files not
// in order.
func getDirectoryGroups(paths []string, weights []int, order []int, maxGroupWeight int) (groupOf []int, groupWeights []int) {
	subtreeWeights := make(map[string]int)
	for _, i := range order {
		path := paths[i]
		for pos := range len(path) {
			if path[pos] == '/' {
				subtreeWeights[path[:pos]] += weights[i]
			}
		}
	}
	groupIDs := make(map[string]int)
	groupOf = make([]int, len(paths))
	for i := range groupOf {
		groupOf[i] = -1
	}
	for _, i := range order {
		path := paths[i]
		key := path
		for pos := range len(path) {
			if path[pos] == '/' && subtreeWeights[path[:pos]] <= maxGroupWeight {
				key = path[:pos]
				break
			}
		}
		g, ok := groupIDs[key]
		if !ok {
			g = len(groupWeights)
			groupIDs[key] = g
			groupWeights = append(groupWeights, 0)
		}
		groupOf[i] = g
		groupWeights[g] += weights[i]
	}
	return groupOf, groupWeights
}

// getGroupAdjacency lifts file adjacency to groups, keeping one entry per
// file-level edge between different groups.
func getGroupAdjacency(adjacentFiles [][]int, groupOf []int, order []int, groupCount int) [][]int {
	groupAdjacency := make([][]int, groupCount)
	for _, i := range order {
		for _, j := range adjacentFiles[i] {
			if gi, gj := groupOf[i], groupOf[j]; gj >= 0 && gi != gj {
				groupAdjacency[gi] = append(groupAdjacency[gi], gj)
			}
		}
	}
	return groupAdjacency
}

// mergeCheckerAssociationGroups merges directory groups with size-constrained
// label propagation and returns each group's label. Each group starts with its
// own label; in each round, groups in order adopt the label of the most edges
// among their neighbors, provided the labeled cluster stays within
// maxGroupWeight. Ties go to the lowest label.
func mergeCheckerAssociationGroups(weights []int, adjacency [][]int, maxGroupWeight int) []int {
	labels := make([]int, len(weights))
	labelWeights := make([]int, len(weights))
	for i := range labels {
		labels[i] = i
		labelWeights[i] = weights[i]
	}
	edgeCounts := make([]int, len(weights))
	var seen []int
	for range checkerAssociationMergeRounds {
		moved := false
		for g, neighbors := range adjacency {
			for _, neighbor := range neighbors {
				label := labels[neighbor]
				if edgeCounts[label] == 0 {
					seen = append(seen, label)
				}
				edgeCounts[label]++
			}
			current := labels[g]
			best, bestCount := current, edgeCounts[current]
			for _, label := range seen {
				if label == current || labelWeights[label]+weights[g] > maxGroupWeight {
					continue
				}
				if count := edgeCounts[label]; count > bestCount || count == bestCount && label < best {
					best, bestCount = label, count
				}
			}
			for _, label := range seen {
				edgeCounts[label] = 0
			}
			seen = seen[:0]
			if best != current {
				labelWeights[current] -= weights[g]
				labelWeights[best] += weights[g]
				labels[g] = best
				moved = true
			}
		}
		if !moved {
			break
		}
	}
	return labels
}

// getCheckerAssociationAreas returns each group's weight in each area, sorted by
// area, along with each area's total weight. Areas are the deepest directory
// containing every file in order, the directories beneath it down to
// checkerAssociationAreaDepth levels in total, and each file by itself. Weights
// are shifted right by areaShift so that squared excesses cannot overflow.
func getCheckerAssociationAreas(paths []string, weights []int, order []int, groupOf []int, groupCount int, totalWeight int) (areas [][]checkerAssociationAreaWeight, areaTotals []int, areaShift uint) {
	for totalWeight>>areaShift >= 1<<29 {
		areaShift++
	}
	first, last := paths[order[0]], paths[order[len(order)-1]]
	commonLength := 0
	for commonLength < min(len(first), len(last)) && first[commonLength] == last[commonLength] {
		commonLength++
	}
	rootEnd := strings.LastIndexByte(first[:commonLength], '/')

	type entry struct {
		group, area, weight int
	}
	var entries []entry
	areaIDs := make(map[string]int)
	areaID := func(key string) int {
		id, ok := areaIDs[key]
		if !ok {
			id = len(areaIDs)
			areaIDs[key] = id
		}
		return id
	}
	for _, i := range order {
		path := paths[i]
		weight := weights[i] >> areaShift
		depth := 0
		for pos := rootEnd; pos < len(path) && depth < checkerAssociationAreaDepth; pos++ {
			if path[pos] == '/' {
				entries = append(entries, entry{groupOf[i], areaID(path[:pos]), weight})
				depth++
			}
		}
		entries = append(entries, entry{groupOf[i], areaID(path), weight})
	}
	slices.SortFunc(entries, func(a, b entry) int {
		return cmp.Or(cmp.Compare(a.group, b.group), cmp.Compare(a.area, b.area))
	})
	areas = make([][]checkerAssociationAreaWeight, groupCount)
	areaTotals = make([]int, len(areaIDs))
	for _, e := range entries {
		areaTotals[e.area] += e.weight
		groupAreas := areas[e.group]
		if n := len(groupAreas); n > 0 && groupAreas[n-1].area == e.area {
			groupAreas[n-1].weight += e.weight
		} else {
			areas[e.group] = append(groupAreas, checkerAssociationAreaWeight{e.area, e.weight})
		}
	}
	return areas, areaTotals, areaShift
}

// getImportAdjacency returns an undirected import graph represented by file
// index. A directed import from A to B makes both files adjacent because either
// file can benefit from sharing checker caches with the other.
func (p *checkerPool) getImportAdjacency() [][]int {
	fileIndices := make(map[*ast.SourceFile]int, len(p.program.files))
	for i, file := range p.program.files {
		fileIndices[file] = i
	}
	adjacentFiles := make([][]int, len(p.program.files))
	for fileIndex, file := range p.program.files {
		resolvedModules := p.program.resolvedModules[file.PathKey()]
		for _, resolved := range resolvedModules {
			if resolved == nil || !resolved.IsResolved() {
				continue
			}
			importedFile := p.program.GetSourceFileForResolvedModule(resolved)
			importedIndex, ok := fileIndices[importedFile]
			if !ok || importedIndex == fileIndex {
				continue
			}
			adjacentFiles[fileIndex] = append(adjacentFiles[fileIndex], importedIndex)
			adjacentFiles[importedIndex] = append(adjacentFiles[importedIndex], fileIndex)
		}
	}
	return adjacentFiles
}

// Runs `cb` for each checker in the pool concurrently, locking and unlocking checker mutexes as it goes,
// making it safe to call `forEachCheckerParallel` from many threads simultaneously.
func (p *checkerPool) forEachCheckerParallel(cb func(idx int, c *checker.Checker)) {
	p.createCheckers()
	wg := core.NewWorkGroup(p.program.SingleThreaded())
	for idx, checker := range p.checkers {
		wg.Queue(func() {
			p.locks[idx].Lock()
			defer p.locks[idx].Unlock()
			cb(idx, checker)
		})
	}
	wg.RunAndWait()
}

func (p *checkerPool) GetGlobalDiagnostics() []*ast.Diagnostic {
	p.createCheckers()
	globalDiagnostics := make([][]*ast.Diagnostic, len(p.checkers))
	p.forEachCheckerParallel(func(idx int, checker *checker.Checker) {
		globalDiagnostics[idx] = checker.GetGlobalDiagnostics()
	})
	return SortAndDeduplicateDiagnostics(slices.Concat(globalDiagnostics...))
}

// forEachCheckerGroupDo runs one task per checker in parallel. Each task iterates
// the provided files, processing only those assigned to its checker. Within each
// checker's set, files are visited in their original order.
func (p *checkerPool) forEachCheckerGroupDo(ctx context.Context, files []*ast.SourceFile, singleThreaded bool, cb func(c *checker.Checker, fileIndex int, file *ast.SourceFile)) {
	p.createCheckers()

	checkerCount := len(p.checkers)
	wg := core.NewWorkGroup(singleThreaded)
	for checkerIdx := range checkerCount {
		wg.Queue(func() {
			p.locks[checkerIdx].Lock()
			defer p.locks[checkerIdx].Unlock()
			for i, file := range files {
				if checker := p.checkers[checkerIdx]; checker == p.fileAssociations[file] {
					cb(checker, i, file)
				}
			}
		})
	}
	wg.RunAndWait()
}

func noop() {}
