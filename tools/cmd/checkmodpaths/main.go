package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"golang.org/x/mod/module"
)

func main() {
	os.Exit(run())
}

func run() int {
	if len(os.Args) != 2 {
		fmt.Println("Usage: checkmodpaths <path>")
		return 1
	}
	path, err := filepath.Abs(os.Args[1])
	if err != nil {
		fmt.Println("Error getting absolute path:", err)
		return 1
	}

	var errors []error
	err = fs.WalkDir(os.DirFS(path), ".", func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if p == "." {
			return nil
		}

		if p[0] == '.' || p[0] == '_' {
			if d.IsDir() {
				return fs.SkipDir
			}
			return nil
		}

		if err := module.CheckFilePath(p); err != nil {
			errors = append(errors, fmt.Errorf("%s: %w", p, err))
		}

		return nil
	})
	if err != nil {
		fmt.Println("Error walking the directory:", err)
		return 1
	}

	if len(errors) > 0 {
		for _, err := range errors {
			fmt.Println(err)
		}
		return 1
	}

	fmt.Println("All module paths are valid.")
	return 0
}
