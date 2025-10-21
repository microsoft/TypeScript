package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"syscall"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp"
	"github.com/microsoft/typescript-go/internal/pprof"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

func runLSP(args []string) int {
	flag := flag.NewFlagSet("lsp", flag.ContinueOnError)
	stdio := flag.Bool("stdio", false, "use stdio for communication")
	pprofDir := flag.String("pprofDir", "", "Generate pprof CPU/memory profiles to the given directory.")
	pipe := flag.String("pipe", "", "use named pipe for communication")
	_ = pipe
	socket := flag.String("socket", "", "use socket for communication")
	_ = socket
	if err := flag.Parse(args); err != nil {
		return 2
	}

	if !*stdio {
		fmt.Fprintln(os.Stderr, "only stdio is supported")
		return 1
	}

	if *pprofDir != "" {
		fmt.Fprintf(os.Stderr, "pprof profiles will be written to: %v\n", *pprofDir)
		profileSession := pprof.BeginProfiling(*pprofDir, os.Stderr)
		defer profileSession.Stop()
	}

	fs := bundled.WrapFS(osvfs.FS())
	defaultLibraryPath := bundled.LibPath()
	typingsLocation := getGlobalTypingsCacheLocation()

	s := lsp.NewServer(&lsp.ServerOptions{
		In:                 lsp.ToReader(os.Stdin),
		Out:                lsp.ToWriter(os.Stdout),
		Err:                os.Stderr,
		Cwd:                core.Must(os.Getwd()),
		FS:                 fs,
		DefaultLibraryPath: defaultLibraryPath,
		TypingsLocation:    typingsLocation,
		NpmInstall: func(cwd string, args []string) ([]byte, error) {
			cmd := exec.Command("npm", args...)
			cmd.Dir = cwd
			return cmd.Output()
		},
	})

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	if err := s.Run(ctx); err != nil {
		return 1
	}
	return 0
}

func getGlobalTypingsCacheLocation() string {
	switch runtime.GOOS {
	case "windows":
		return tspath.CombinePaths(tspath.CombinePaths(getWindowsCacheLocation(), "Microsoft/TypeScript"), core.VersionMajorMinor())
	case "openbsd", "freebsd", "netbsd", "darwin", "linux", "android":
		return tspath.CombinePaths(tspath.CombinePaths(getNonWindowsCacheLocation(), "typescript"), core.VersionMajorMinor())
	default:
		panic("unsupported platform: " + runtime.GOOS)
	}
}

func getWindowsCacheLocation() string {
	basePath, err := os.UserCacheDir()
	if err != nil {
		if basePath, err = os.UserConfigDir(); err != nil {
			if basePath, err = os.UserHomeDir(); err != nil {
				if userProfile := os.Getenv("USERPROFILE"); userProfile != "" {
					basePath = userProfile
				} else if homeDrive, homePath := os.Getenv("HOMEDRIVE"), os.Getenv("HOMEPATH"); homeDrive != "" && homePath != "" {
					basePath = homeDrive + homePath
				} else {
					basePath = os.TempDir()
				}
			}
		}
	}
	return basePath
}

func getNonWindowsCacheLocation() string {
	if xdgCacheHome := os.Getenv("XDG_CACHE_HOME"); xdgCacheHome != "" {
		return xdgCacheHome
	}
	const platformIsDarwin = runtime.GOOS == "darwin"
	var usersDir string
	if platformIsDarwin {
		usersDir = "Users"
	} else {
		usersDir = "home"
	}
	homePath, err := os.UserHomeDir()
	if err != nil {
		if home := os.Getenv("HOME"); home != "" {
			homePath = home
		} else {
			var userName string
			if logName := os.Getenv("LOGNAME"); logName != "" {
				userName = logName
			} else if user := os.Getenv("USER"); user != "" {
				userName = user
			}
			if userName != "" {
				homePath = "/" + usersDir + "/" + userName
			} else {
				homePath = os.TempDir()
			}
		}
	}
	var cacheFolder string
	if platformIsDarwin {
		cacheFolder = "Library/Caches"
	} else {
		cacheFolder = ".cache"
	}
	return tspath.CombinePaths(homePath, cacheFolder)
}
