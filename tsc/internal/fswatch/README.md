# fswatch

A filesystem watcher for Go. Pure Go, no cgo.

A Go port of the C++
[`@parcel/watcher`](https://github.com/parcel-bundler/watcher), with substantial
modifications. See [`CHANGES.md`](CHANGES.md) for the list of differences and
bugfixes.

| GOOS                                        | Watcher                                    |
| ------------------------------------------- | ------------------------------------------ |
| `linux`                                     | fanotify (default, kernel ≥ 5.13), inotify |
| `darwin`                                    | FSEvents (default), kqueue                 |
| `windows`                                   | `ReadDirectoryChangesW`                    |
| `freebsd`, `openbsd`, `netbsd`, `dragonfly` | kqueue                                     |

## Usage

```go
package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/microsoft/typescript-go/internal/fswatch"
)

func main() {
	dir, _ := os.Getwd()

	sub, err := fswatch.Default().WatchDirectory(dir, func(events []fswatch.Event, err error) {
		if err != nil {
			log.Println("watch error:", err)
			return
		}
		for _, e := range events {
			fmt.Printf("%s %s\n", e.Kind, e.Path)
		}
	})
	if err != nil {
		log.Fatal(err)
	}
	defer sub.Close()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c
}
```

### Picking a watcher

`Default()` picks the best watcher for the current OS. To use a specific one:

```go
sub, err := fswatch.Inotify().WatchDirectory(dir, callback, fswatch.WithRecursive())
```

All watchers exist on every platform. Use `Available()` to check support at
runtime, or just call `WatchDirectory`; it returns `ErrUnavailable` if the
watcher isn't supported.

### Error handling

Errors are delivered through the callback. Use `errors.Is` to distinguish them:

- **`ErrOverflow`**: some events were lost (kernel queue overflow). The watch is
  still active; rescan the directory to catch up.
- **`ErrWatchTerminated`**: the watch is dead (e.g. directory deleted). No
  further events will arrive. Call `Close` to clean up.

```go
if errors.Is(err, fswatch.ErrOverflow) {
    rescanDir(dir)
    return
}
if errors.Is(err, fswatch.ErrWatchTerminated) {
    log.Println("watch terminated:", err)
    sub.Close()
    return
}
```

### Behavior notes

- Events arriving in quick succession are **batched** before delivery.
- Event order within a batch is **not guaranteed**.
- The callback runs on a library goroutine, not the caller's. Each watch's
  callback is serialized (never concurrent with itself).
- Paths in events are absolute. **Resolve symlinks before subscribing**;
  backends report canonical paths:

  ```go
  realDir, err := filepath.EvalSymlinks(dir)
  ```
