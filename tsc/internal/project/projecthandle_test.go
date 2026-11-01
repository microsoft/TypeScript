package project

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestProjectHandleLookup(t *testing.T) {
	t.Parallel()

	p := &Project{id: "/tsconfig.json", handle: Handle(nextProjectHandle.Add(1))}
	clone := p.Clone()
	assert.Equal(t, clone.Handle(), p.Handle())

	first := &ProjectCollection{inferredProject: p}
	second := first.clone()
	second.inferredProject = clone
	assert.Equal(t, first.GetProjectByHandle(p.Handle()), p)
	assert.Equal(t, second.GetProjectByHandle(p.Handle()), clone)
	assert.Assert(t, first.GetProjectByHandle(0) == nil)

	removed := first.clone()
	removed.inferredProject = nil
	assert.Assert(t, removed.GetProjectByHandle(p.Handle()) == nil)

	recreated := &Project{id: p.ID(), handle: Handle(nextProjectHandle.Add(1))}
	assert.Assert(t, recreated.Handle() != p.Handle())
	replacement := &ProjectCollection{inferredProject: recreated}
	assert.Assert(t, replacement.GetProjectByHandle(p.Handle()) == nil)
	assert.Equal(t, replacement.GetProjectByHandle(recreated.Handle()), recreated)
}

func TestConcurrentProjectHandleLookup(t *testing.T) {
	t.Parallel()

	p := &Project{handle: Handle(nextProjectHandle.Add(1))}
	collection := &ProjectCollection{inferredProject: p}
	for range 16 {
		t.Run("lookup", func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, collection.GetProjectByHandle(p.Handle()), p)
		})
	}
}
