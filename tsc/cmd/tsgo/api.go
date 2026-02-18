package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/microsoft/typescript-go/internal/api"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
)

func runAPI(args []string) int {
	flag := flag.NewFlagSet("api", flag.ContinueOnError)
	cwd := flag.String("cwd", core.Must(os.Getwd()), "current working directory")
	pipePath := flag.String("pipe", "", "use named pipe or Unix domain socket for communication instead of stdio")
	callbacks := flag.String("callbacks", "", "comma-separated list of FS callbacks to enable (readFile,fileExists,directoryExists,getAccessibleEntries,realpath)")
	async := flag.Bool("async", false, "use JSON-RPC protocol instead of MessagePack (for async API)")
	if err := flag.Parse(args); err != nil {
		return 2
	}

	defaultLibraryPath := bundled.LibPath()

	// Parse callbacks list
	var callbacksList []string
	if *callbacks != "" {
		callbacksList = strings.Split(*callbacks, ",")
	}

	options := &api.StdioServerOptions{
		Err:                os.Stderr,
		Cwd:                *cwd,
		DefaultLibraryPath: defaultLibraryPath,
		Callbacks:          callbacksList,
		Async:              *async,
	}
	if *pipePath != "" {
		options.PipePath = *pipePath
	} else {
		options.In = os.Stdin
		options.Out = os.Stdout
	}

	s := api.NewStdioServer(options)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	if err := s.Run(ctx); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return 1
	}
	return 0
}
