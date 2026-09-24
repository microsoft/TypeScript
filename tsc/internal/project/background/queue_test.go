package background_test

import (
	"context"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project/background"
	"gotest.tools/v3/assert"
)

func channelClosed(ch <-chan struct{}) bool {
	select {
	case <-ch:
		return true
	default:
		return false
	}
}

func TestQueue(t *testing.T) {
	t.Parallel()
	t.Run("BasicEnqueue", func(t *testing.T) {
		t.Parallel()
		q := background.NewQueue()
		defer q.Close()

		executed := false
		q.Enqueue(context.Background(), func(ctx context.Context) {
			executed = true
		})

		q.Wait()

		assert.Check(t, executed)
	})

	t.Run("MultipleTasksExecution", func(t *testing.T) {
		t.Parallel()
		q := background.NewQueue()
		defer q.Close()

		var counter atomic.Int64
		numTasks := 10

		for range numTasks {
			q.Enqueue(context.Background(), func(ctx context.Context) {
				counter.Add(1)
			})
		}

		q.Wait()

		assert.Equal(t, counter.Load(), int64(numTasks))
	})

	t.Run("NestedEnqueue", func(t *testing.T) {
		t.Parallel()
		q := background.NewQueue()
		defer q.Close()

		var executed []string
		var mu sync.Mutex

		q.Enqueue(context.Background(), func(ctx context.Context) {
			mu.Lock()
			executed = append(executed, "parent")
			mu.Unlock()

			q.Enqueue(ctx, func(childCtx context.Context) {
				mu.Lock()
				executed = append(executed, "child")
				mu.Unlock()
			})
		})

		q.Wait()

		mu.Lock()
		defer mu.Unlock()

		assert.Equal(t, len(executed), 2)
	})

	t.Run("ClosedQueueRejectsNewTasks", func(t *testing.T) {
		t.Parallel()
		q := background.NewQueue()
		q.Close()

		executed := false
		q.Enqueue(context.Background(), func(ctx context.Context) {
			executed = true
		})

		q.Wait()

		assert.Check(t, !executed, "Task should not execute after queue is closed")
	})

	t.Run("CloseWaitsForActiveTasks", func(t *testing.T) {
		t.Parallel()
		q := background.NewQueue()
		started := make(chan struct{})
		finish := make(chan struct{})
		closed := make(chan struct{})

		q.Enqueue(context.Background(), func(ctx context.Context) {
			close(started)
			<-finish
		})
		<-started

		go func() {
			q.Close()
			close(closed)
		}()

		assert.Check(t, !channelClosed(closed), "Close returned before the active task completed")

		close(finish)
		<-closed
	})
}
