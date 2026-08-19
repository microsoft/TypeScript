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

type apiFlags struct {
	cwd             string
	pipePath        string
	callbacks       string
	async           bool
	timing          bool
	runExternalCode bool
}

func parseAPIFlags(args []string) (apiFlags, error) {
	flags := flag.NewFlagSet("api", flag.ContinueOnError)
	result := apiFlags{}
	flags.StringVar(&result.cwd, "cwd", core.Must(os.Getwd()), "current working directory")
	flags.StringVar(&result.pipePath, "pipe", "", "use named pipe or Unix domain socket for communication instead of stdio")
	flags.StringVar(&result.callbacks, "callbacks", "", "comma-separated list of FS callbacks to enable (readFile,fileExists,directoryExists,getAccessibleEntries,realpath)")
	flags.BoolVar(&result.async, "async", false, "use JSON-RPC protocol instead of MessagePack (for async API)")
	flags.BoolVar(&result.timing, "timing", false, "collect per-request server processing time, folded into the client's timing snapshot")
	flags.BoolVar(&result.runExternalCode, "runExternalCode", false, "allow projects to execute configured external plugins")
	if err := flags.Parse(args); err != nil {
		return apiFlags{}, err
	}
	return result, nil
}

func runAPI(args []string) int {
	flags, err := parseAPIFlags(args)
	if err != nil {
		return 2
	}

	defaultLibraryPath := bundled.LibPath()

	// Parse callbacks list
	var callbacksList []string
	if flags.callbacks != "" {
		callbacksList = strings.Split(flags.callbacks, ",")
	}

	options := &api.StdioServerOptions{
		Err:                  os.Stderr,
		Cwd:                  flags.cwd,
		DefaultLibraryPath:   defaultLibraryPath,
		Callbacks:            callbacksList,
		Async:                flags.async,
		CollectTiming:        flags.timing,
		RunExternalCode:      flags.runExternalCode,
		ContentMapperSpawner: newSystem(),
	}
	if flags.pipePath != "" {
		options.PipePath = flags.pipePath
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
