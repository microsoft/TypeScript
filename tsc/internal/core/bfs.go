package core

import (
	"math"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/collections"
)

type BreadthFirstSearchResult[N any] struct {
	Stopped bool
	Path    []N
}

type breadthFirstSearchJob[N any] struct {
	node   N
	parent *breadthFirstSearchJob[N]
}

type BreadthFirstSearchLevel[K comparable, N any] struct {
	jobs *collections.OrderedMap[K, *breadthFirstSearchJob[N]]
}

func (l *BreadthFirstSearchLevel[K, N]) Has(key K) bool {
	return l.jobs.Has(key)
}

func (l *BreadthFirstSearchLevel[K, N]) Delete(key K) {
	l.jobs.Delete(key)
}

func (l *BreadthFirstSearchLevel[K, N]) Range(f func(node N) bool) {
	for job := range l.jobs.Values() {
		if !f(job.node) {
			return
		}
	}
}

type BreadthFirstSearchOptions[K comparable, N any] struct {
	// Visited is a set of nodes that have already been visited.
	// If nil, a new set will be created.
	Visited *collections.SyncSet[K]
	// PreprocessLevel is a function that, if provided, will be called
	// before each level, giving the caller an opportunity to remove nodes.
	PreprocessLevel func(*BreadthFirstSearchLevel[K, N])
}

// BreadthFirstSearchParallel performs a breadth-first search on a graph
// starting from the given node. It processes nodes in parallel and returns the path
// from the first node that satisfies the `visit` function back to the start node.
func BreadthFirstSearchParallel[N comparable](
	start N,
	neighbors func(N) []N,
	visit func(node N) (isResult bool, stop bool),
) BreadthFirstSearchResult[N] {
	return BreadthFirstSearchParallelEx(start, neighbors, visit, BreadthFirstSearchOptions[N, N]{}, Identity)
}

// BreadthFirstSearchParallelEx is an extension of BreadthFirstSearchParallel that allows
// the caller to pass a pre-seeded set of already-visited nodes and a preprocessing function
// that can be used to remove nodes from each level before parallel processing.
func BreadthFirstSearchParallelEx[K comparable, N any](
	start N,
	neighbors func(N) []N,
	visit func(node N) (isResult bool, stop bool),
	options BreadthFirstSearchOptions[K, N],
	getKey func(N) K,
) BreadthFirstSearchResult[N] {
	visited := options.Visited
	if visited == nil {
		visited = &collections.SyncSet[K]{}
	}

	type result struct {
		stop bool
		job  *breadthFirstSearchJob[N]
		next *collections.OrderedMap[K, *breadthFirstSearchJob[N]]
	}

	var fallback *breadthFirstSearchJob[N]
	// processLevel processes each node at the current level in parallel.
	// It produces either a list of jobs to be processed in the next level,
	// or a result if the visit function returns true for any node.
	processLevel := func(index int, jobs *collections.OrderedMap[K, *breadthFirstSearchJob[N]]) result {
		var lowestFallback atomic.Int64
		var lowestGoal atomic.Int64
		var nextJobCount atomic.Int64
		lowestGoal.Store(math.MaxInt64)
		lowestFallback.Store(math.MaxInt64)
		if options.PreprocessLevel != nil {
			options.PreprocessLevel(&BreadthFirstSearchLevel[K, N]{jobs: jobs})
		}
		next := make([][]*breadthFirstSearchJob[N], jobs.Size())
		var wg sync.WaitGroup
		i := 0
		for j := range jobs.Values() {
			wg.Add(1)
			go func(i int, j *breadthFirstSearchJob[N]) {
				defer wg.Done()
				if int64(i) >= lowestGoal.Load() {
					return // Stop processing if we already found a lower result
				}

				// If we have already visited this node, skip it.
				if !visited.AddIfAbsent(getKey(j.node)) {
					// Note that if we are here, we already visited this node at a
					// previous *level*, which means `visit` must have returned false,
					// so we don't need to update our result indices. This holds true
					// because we deduplicated jobs before queuing the level.
					return
				}

				isResult, stop := visit(j.node)
				if isResult {
					// We found a result, so we will stop at this level, but an
					// earlier job may still find a true result at a lower index.
					if stop {
						updateMin(&lowestGoal, int64(i))
						return
					}
					if fallback == nil {
						updateMin(&lowestFallback, int64(i))
					}
				}

				if int64(i) >= lowestGoal.Load() {
					// If `visit` is expensive, it's likely that by the time we get here,
					// a different job has already found a lower index result, so we
					// don't even need to collect the next jobs.
					return
				}
				// Add the next level jobs
				neighborNodes := neighbors(j.node)
				if len(neighborNodes) > 0 {
					nextJobCount.Add(int64(len(neighborNodes)))
					next[i] = Map(neighborNodes, func(child N) *breadthFirstSearchJob[N] {
						return &breadthFirstSearchJob[N]{node: child, parent: j}
					})
				}
			}(i, j)
			i++
		}
		wg.Wait()
		if index := lowestGoal.Load(); index != math.MaxInt64 {
			// If we found a result, return it immediately.
			_, job, _ := jobs.EntryAt(int(index))
			return result{stop: true, job: job}
		}
		if fallback == nil {
			if index := lowestFallback.Load(); index != math.MaxInt64 {
				_, fallback, _ = jobs.EntryAt(int(index))
			}
		}
		nextJobs := collections.NewOrderedMapWithSizeHint[K, *breadthFirstSearchJob[N]](int(nextJobCount.Load()))
		for _, jobs := range next {
			for _, j := range jobs {
				if !nextJobs.Has(getKey(j.node)) {
					// Deduplicate synchronously to avoid messy locks and spawning
					// unnecessary goroutines.
					nextJobs.Set(getKey(j.node), j)
				}
			}
		}
		return result{next: nextJobs}
	}

	createPath := func(job *breadthFirstSearchJob[N]) []N {
		var path []N
		for job != nil {
			path = append(path, job.node)
			job = job.parent
		}
		return path
	}

	levelIndex := 0
	level := collections.NewOrderedMapFromList([]collections.MapEntry[K, *breadthFirstSearchJob[N]]{
		{Key: getKey(start), Value: &breadthFirstSearchJob[N]{node: start}},
	})
	for level.Size() > 0 {
		result := processLevel(levelIndex, level)
		if result.stop {
			return BreadthFirstSearchResult[N]{Stopped: true, Path: createPath(result.job)}
		} else if result.job != nil && fallback == nil {
			fallback = result.job
		}
		level = result.next
		levelIndex++
	}
	return BreadthFirstSearchResult[N]{Stopped: false, Path: createPath(fallback)}
}

// updateMin updates the atomic integer `a` to the candidate value if it is less than the current value.
func updateMin(a *atomic.Int64, candidate int64) bool {
	for {
		current := a.Load()
		if current < candidate {
			return false
		}
		if a.CompareAndSwap(current, candidate) {
			return true
		}
	}
}
