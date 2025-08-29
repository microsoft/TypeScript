package core

import (
	"maps"
	"sync"
)

var UnprefixedNodeCoreModules = map[string]bool{
	"assert":              true,
	"assert/strict":       true,
	"async_hooks":         true,
	"buffer":              true,
	"child_process":       true,
	"cluster":             true,
	"console":             true,
	"constants":           true,
	"crypto":              true,
	"dgram":               true,
	"diagnostics_channel": true,
	"dns":                 true,
	"dns/promises":        true,
	"domain":              true,
	"events":              true,
	"fs":                  true,
	"fs/promises":         true,
	"http":                true,
	"http2":               true,
	"https":               true,
	"inspector":           true,
	"inspector/promises":  true,
	"module":              true,
	"net":                 true,
	"os":                  true,
	"path":                true,
	"path/posix":          true,
	"path/win32":          true,
	"perf_hooks":          true,
	"process":             true,
	"punycode":            true,
	"querystring":         true,
	"readline":            true,
	"readline/promises":   true,
	"repl":                true,
	"stream":              true,
	"stream/consumers":    true,
	"stream/promises":     true,
	"stream/web":          true,
	"string_decoder":      true,
	"sys":                 true,
	"test/mock_loader":    true,
	"timers":              true,
	"timers/promises":     true,
	"tls":                 true,
	"trace_events":        true,
	"tty":                 true,
	"url":                 true,
	"util":                true,
	"util/types":          true,
	"v8":                  true,
	"vm":                  true,
	"wasi":                true,
	"worker_threads":      true,
	"zlib":                true,
}

var ExclusivelyPrefixedNodeCoreModules = map[string]bool{
	"node:sea":            true,
	"node:sqlite":         true,
	"node:test":           true,
	"node:test/reporters": true,
}

var NodeCoreModules = sync.OnceValue(func() map[string]bool {
	nodeCoreModules := make(map[string]bool, len(UnprefixedNodeCoreModules)*2+len(ExclusivelyPrefixedNodeCoreModules))
	for unprefixed := range UnprefixedNodeCoreModules {
		nodeCoreModules[unprefixed] = true
		nodeCoreModules["node:"+unprefixed] = true
	}
	maps.Copy(nodeCoreModules, ExclusivelyPrefixedNodeCoreModules)
	return nodeCoreModules
})

func NonRelativeModuleNameForTypingCache(moduleName string) string {
	if NodeCoreModules()[moduleName] {
		return "node"
	}
	return moduleName
}
