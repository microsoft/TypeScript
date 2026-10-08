//go:build !linux

package linkarena

func sysGoHeapRanges() []addrRange { return nil }
