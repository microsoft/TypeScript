package project

import (
	"slices"
	"sync"
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

type ownerCacheTestArgs struct {
	owner uint64
	stack []string
}

func TestOwnerCacheConcurrentlyLoadKeysThatLoadEachOther(t *testing.T) {
	t.Parallel()

	extends := map[string]string{"a": "b", "b": "a"}
	var started sync.WaitGroup
	started.Add(2)
	var cache *OwnerCache[string, string, ownerCacheTestArgs]
	cache = NewOwnerCache(func(key string, args ownerCacheTestArgs) string {
		if len(args.stack) == 0 {
			started.Done()
			started.Wait()
		}
		stack := append(slices.Clone(args.stack), key)
		if !slices.Contains(stack, extends[key]) {
			cache.LoadAndAcquire(extends[key], args.owner, ownerCacheTestArgs{owner: args.owner, stack: stack})
		}
		return key
	}, nil)

	values := make([]string, 2)
	var wg sync.WaitGroup
	for i, key := range []string{"a", "b"} {
		wg.Go(func() {
			values[i] = cache.LoadAndAcquire(key, uint64(i+1), ownerCacheTestArgs{owner: uint64(i + 1)})
		})
	}
	done := make(chan struct{})
	go func() {
		wg.Wait()
		close(done)
	}()
	select {
	case <-done:
		assert.DeepEqual(t, values, []string{"a", "b"})
		assert.Assert(t, cache.Has("a"))
		assert.Assert(t, cache.Has("b"))
	case <-time.After(10 * time.Second):
		t.Fatal("loads of keys that load each other deadlocked")
	}
}

func TestOwnerCacheConcurrentLoadsKeepFirstStoredValue(t *testing.T) {
	t.Parallel()

	parsing := make(chan struct{})
	release := make(chan struct{})
	cache := NewOwnerCache(func(key string, value string) string {
		if value == "slow" {
			close(parsing)
			<-release
		}
		return value
	}, nil)

	slow := make(chan string)
	go func() {
		slow <- cache.LoadAndAcquire("a", 1, "slow")
	}()
	fast := make(chan string)
	select {
	case <-parsing:
		go func() {
			fast <- cache.LoadAndAcquire("a", 2, "fast")
		}()
	case <-time.After(10 * time.Second):
		t.Fatal("the first load never started its parse")
	}
	select {
	case value := <-fast:
		assert.Equal(t, value, "fast")
	case <-time.After(10 * time.Second):
		t.Fatal("a load waited for another load's parse")
	}
	close(release)
	select {
	case value := <-slow:
		assert.Equal(t, value, "fast")
	case <-time.After(10 * time.Second):
		t.Fatal("the first load never returned after its parse finished")
	}
	assert.Equal(t, cache.LoadAndAcquire("a", 3, "other"), "fast")
}
