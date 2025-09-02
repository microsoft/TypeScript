package core_test

import (
	"sort"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"gotest.tools/v3/assert"
)

func TestBreadthFirstSearchParallel(t *testing.T) {
	t.Parallel()
	t.Run("basic functionality", func(t *testing.T) {
		t.Parallel()
		// Test basic functionality with a simple DAG
		// Graph: A -> B, A -> C, B -> D, C -> D
		graph := map[string][]string{
			"A": {"B", "C"},
			"B": {"D"},
			"C": {"D"},
			"D": {},
		}

		children := func(node string) []string {
			return graph[node]
		}

		t.Run("find specific node", func(t *testing.T) {
			t.Parallel()
			result := core.BreadthFirstSearchParallel("A", children, func(node string) (bool, bool) {
				return node == "D", true
			})
			assert.Equal(t, result.Stopped, true, "Expected search to stop at D")
			assert.DeepEqual(t, result.Path, []string{"D", "B", "A"})
		})

		t.Run("visit all nodes", func(t *testing.T) {
			t.Parallel()
			var mu sync.Mutex
			var visitedNodes []string
			result := core.BreadthFirstSearchParallel("A", children, func(node string) (bool, bool) {
				mu.Lock()
				defer mu.Unlock()
				visitedNodes = append(visitedNodes, node)
				return false, false // Never stop early
			})

			// Should return nil since we never return true
			assert.Equal(t, result.Stopped, false, "Expected search to not stop early")
			assert.Assert(t, result.Path == nil, "Expected nil path when visit function never returns true")

			// Should visit all nodes exactly once
			sort.Strings(visitedNodes)
			expected := []string{"A", "B", "C", "D"}
			assert.DeepEqual(t, visitedNodes, expected)
		})
	})

	t.Run("early termination", func(t *testing.T) {
		t.Parallel()
		// Test that nodes below the target level are not visited
		graph := map[string][]string{
			"Root": {"L1A", "L1B"},
			"L1A":  {"L2A", "L2B"},
			"L1B":  {"L2C"},
			"L2A":  {"L3A"},
			"L2B":  {},
			"L2C":  {},
			"L3A":  {},
		}

		children := func(node string) []string {
			return graph[node]
		}

		var visited collections.SyncSet[string]
		core.BreadthFirstSearchParallelEx("Root", children, func(node string) (bool, bool) {
			return node == "L2B", true // Stop at level 2
		}, core.BreadthFirstSearchOptions[string, string]{
			Visited: &visited,
		},
			core.Identity)

		assert.Assert(t, visited.Has("Root"), "Expected to visit Root")
		assert.Assert(t, visited.Has("L1A"), "Expected to visit L1A")
		assert.Assert(t, visited.Has("L1B"), "Expected to visit L1B")
		assert.Assert(t, visited.Has("L2A"), "Expected to visit L2A")
		assert.Assert(t, visited.Has("L2B"), "Expected to visit L2B")
		// L2C is non-deterministic
		assert.Assert(t, !visited.Has("L3A"), "Expected not to visit L3A")
	})

	t.Run("returns fallback when no other result found", func(t *testing.T) {
		t.Parallel()
		// Test that fallback behavior works correctly
		graph := map[string][]string{
			"A": {"B", "C"},
			"B": {"D"},
			"C": {"D"},
			"D": {},
		}

		children := func(node string) []string {
			return graph[node]
		}

		var visited collections.SyncSet[string]
		result := core.BreadthFirstSearchParallelEx("A", children, func(node string) (bool, bool) {
			return node == "A", false // Record A as a fallback, but do not stop
		}, core.BreadthFirstSearchOptions[string, string]{
			Visited: &visited,
		},
			core.Identity)

		assert.Equal(t, result.Stopped, false, "Expected search to not stop early")
		assert.DeepEqual(t, result.Path, []string{"A"})
		assert.Assert(t, visited.Has("B"), "Expected to visit B")
		assert.Assert(t, visited.Has("C"), "Expected to visit C")
		assert.Assert(t, visited.Has("D"), "Expected to visit D")
	})

	t.Run("returns a stop result over a fallback", func(t *testing.T) {
		t.Parallel()
		// Test that a stop result is preferred over a fallback
		graph := map[string][]string{
			"A": {"B", "C"},
			"B": {"D"},
			"C": {"D"},
			"D": {},
		}

		children := func(node string) []string {
			return graph[node]
		}

		result := core.BreadthFirstSearchParallel("A", children, func(node string) (bool, bool) {
			switch node {
			case "A":
				return true, false // Record fallback
			case "D":
				return true, true // Stop at D
			default:
				return false, false
			}
		})

		assert.Equal(t, result.Stopped, true, "Expected search to stop at D")
		assert.DeepEqual(t, result.Path, []string{"D", "B", "A"})
	})
}
