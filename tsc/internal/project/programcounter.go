package project

import (
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
)

type programCounter struct {
	refs collections.SyncMap[*compiler.Program, *atomic.Int32]
}

func (c *programCounter) Ref(program *compiler.Program) {
	counter, _ := c.refs.LoadOrStore(program, &atomic.Int32{})
	counter.Add(1)
}

func (c *programCounter) Deref(program *compiler.Program) bool {
	counter, ok := c.refs.Load(program)
	if !ok {
		panic("program not found in counter")
	}
	count := counter.Add(-1)
	if count < 0 {
		panic("program reference count went below zero")
	}
	if count == 0 {
		c.refs.Delete(program)
		return true
	}
	return false
}
