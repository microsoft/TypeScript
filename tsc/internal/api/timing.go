package api

import (
	"sync"
	"time"
)

// serverRecentRequestCapacity is the number of most-recent requests retained in
// the server-side timing ring buffer.
const serverRecentRequestCapacity = 5

// serverRequestTiming is a single server-side request's processing-time sample.
type serverRequestTiming struct {
	// Method is the API method that was handled.
	Method string `json:"method"`
	// ProcessingTimeMs is the wall-clock time the server spent handling the
	// request, in milliseconds.
	ProcessingTimeMs float64 `json:"processingTimeMs"`
	// Timestamp is the Unix time in milliseconds when the request completed.
	Timestamp int64 `json:"timestamp"`
}

// serverTimingTotals holds running totals accumulated across every handled request.
type serverTimingTotals struct {
	// RequestCount is the total number of requests measured.
	RequestCount uint64 `json:"requestCount"`
	// TotalProcessingTimeMs is the sum of server processing time, in milliseconds.
	TotalProcessingTimeMs float64 `json:"totalProcessingTimeMs"`
}

// serverTimingInfo is a point-in-time snapshot of collected server timing,
// returned to clients in response to a getServerTiming request.
type serverTimingInfo struct {
	// Enabled reports whether server-side timing collection is active.
	Enabled bool `json:"enabled"`
	// Totals are the running totals across every handled request.
	Totals serverTimingTotals `json:"totals"`
	// RecentRequests are the most recent requests, oldest to newest, up to
	// serverRecentRequestCapacity.
	RecentRequests []serverRequestTiming `json:"recentRequests"`
}

// timingCollector accumulates per-request server processing times into running
// totals and a fixed-size ring buffer of the most recent requests. It is safe
// for concurrent use so the async connection can record from multiple request
// goroutines.
type timingCollector struct {
	mu     sync.Mutex
	totals serverTimingTotals
	// ring holds up to serverRecentRequestCapacity entries; once full, head
	// marks the oldest entry.
	ring []serverRequestTiming
	head int
}

func newTimingCollector() *timingCollector {
	return &timingCollector{}
}

// record adds a single request's processing time to the totals and ring buffer.
func (c *timingCollector) record(method string, d time.Duration) {
	processingMs := durationToMillis(d)

	c.mu.Lock()
	defer c.mu.Unlock()

	c.totals.RequestCount++
	c.totals.TotalProcessingTimeMs += processingMs

	entry := serverRequestTiming{
		Method:           method,
		ProcessingTimeMs: processingMs,
		Timestamp:        time.Now().UnixMilli(),
	}
	if len(c.ring) < serverRecentRequestCapacity {
		c.ring = append(c.ring, entry)
	} else {
		c.ring[c.head] = entry
		c.head = (c.head + 1) % serverRecentRequestCapacity
	}
}

// snapshot returns a copy of the currently collected timing information, with
// recent requests ordered from oldest to newest.
func (c *timingCollector) snapshot() serverTimingInfo {
	c.mu.Lock()
	defer c.mu.Unlock()

	recent := make([]serverRequestTiming, 0, len(c.ring))
	for i := range c.ring {
		recent = append(recent, c.ring[(c.head+i)%len(c.ring)])
	}
	return serverTimingInfo{
		Enabled:        true,
		Totals:         c.totals,
		RecentRequests: recent,
	}
}

// reset clears all accumulated totals and recent-request history.
func (c *timingCollector) reset() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.totals = serverTimingTotals{}
	c.ring = nil
	c.head = 0
}

// serverTimingSnapshot returns the collector's snapshot, or a disabled snapshot
// when timing collection is not enabled (collector is nil).
func serverTimingSnapshot(c *timingCollector) serverTimingInfo {
	if c == nil {
		return disabledServerTimingInfo()
	}
	return c.snapshot()
}

// disabledServerTimingInfo is the snapshot returned when timing collection is
// not enabled.
func disabledServerTimingInfo() serverTimingInfo {
	return serverTimingInfo{
		Enabled:        false,
		RecentRequests: []serverRequestTiming{},
	}
}

// durationToMillis converts a duration to fractional milliseconds, clamped to be
// non-negative. It preserves sub-microsecond precision by converting from the
// full nanosecond duration.
func durationToMillis(d time.Duration) float64 {
	if d < 0 {
		return 0
	}
	return float64(d) / float64(time.Millisecond)
}
