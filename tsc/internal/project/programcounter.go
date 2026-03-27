package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/compiler"
)

type programCounter struct {
	mu   sync.Mutex
	refs map[*compiler.Program]int32
}

// Ref increments the reference count for a program. If the program is not
// yet tracked, it is added with a reference count of 1.
func (c *programCounter) Ref(program *compiler.Program) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.refs == nil {
		c.refs = make(map[*compiler.Program]int32)
	}
	c.refs[program]++
}

func (c *programCounter) Deref(program *compiler.Program) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	count, ok := c.refs[program]
	if !ok {
		return false
	}
	count--
	if count < 0 {
		panic("program reference count went below zero")
	}
	if count == 0 {
		delete(c.refs, program)
		return true
	}
	c.refs[program] = count
	return false
}

func (c *programCounter) Len() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return len(c.refs)
}
