package project

import (
	"fmt"
	"sync"
)

type namer struct {
	mu       sync.Mutex
	counters map[string]int
}

func (n *namer) next(name string) string {
	n.mu.Lock()
	defer n.mu.Unlock()
	if n.counters == nil {
		n.counters = make(map[string]int)
	}
	n.counters[name]++
	return fmt.Sprintf("%s%d*", name, n.counters[name])
}
