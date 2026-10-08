package linkarena

import (
	"os"
	"strconv"
	"strings"
)

// sysGoHeapRanges returns the address ranges that the Go runtime has set aside for its heap.
// The runtime names its mappings, whi  ch the kernel reports when it supports naming anonymous
// memory; without that support the result is empty. Only Verify uses this.
func sysGoHeapRanges() []addrRange {
	maps, err := os.ReadFile("/proc/self/maps") //nolint:forbidigo
	if err != nil {
		return nil
	}
	var ranges []addrRange
	for line := range strings.Lines(string(maps)) {
		if !strings.Contains(line, "[anon: Go: heap") {
			continue
		}
		addresses, _, _ := strings.Cut(line, " ")
		lo, hi, _ := strings.Cut(addresses, "-")
		start, err1 := strconv.ParseUint(lo, 16, 64)
		end, err2 := strconv.ParseUint(hi, 16, 64)
		if err1 == nil && err2 == nil {
			ranges = append(ranges, addrRange{lo: uintptr(start), hi: uintptr(end)})
		}
	}
	return ranges
}
