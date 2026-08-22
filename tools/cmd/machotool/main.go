// Portions of this file are derived from github.com/anchore/quill v0.7.1.
// The original code is licensed under the Apache License, Version 2.0.
// This version is modified to support only the operations used by TypeScript.

package main

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"regexp"

	"github.com/anchore/quill/quill/macho"
	"github.com/anchore/quill/quill/pki"
	"github.com/anchore/quill/quill/sign"
	blacktopmacho "github.com/blacktop/go-macho"
)

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func run(args []string) error {
	if len(args) == 0 {
		return errors.New("usage: machotool sign <entitlements> <binary> | machotool verify <binary> <entitlement>...")
	}

	switch args[0] {
	case "sign":
		if len(args) != 3 {
			return errors.New("usage: machotool sign <entitlements> <binary>")
		}
		entitlements, err := os.ReadFile(args[1])
		if err != nil {
			return fmt.Errorf("read entitlements: %w", err)
		}
		return signBinary(args[2], string(entitlements))
	case "verify":
		if len(args) < 3 {
			return errors.New("usage: machotool verify <binary> <entitlement>...")
		}
		return verifyBinary(args[1], args[2:])
	default:
		return fmt.Errorf("unknown command %q", args[0])
	}
}

func verifyBinary(path string, requiredEntitlements []string) error {
	file, err := blacktopmacho.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	codeSignature := file.CodeSignature()
	if codeSignature == nil || codeSignature.Entitlements == "" {
		return fmt.Errorf("signed file has no macOS entitlements: %s", path)
	}
	if err := verifyEntitlements(codeSignature.Entitlements, requiredEntitlements); err != nil {
		return fmt.Errorf("verify entitlements in %s: %w", path, err)
	}
	return nil
}

func verifyEntitlements(actual string, required []string) error {
	for _, entitlement := range required {
		pattern := `<key>\s*` + regexp.QuoteMeta(entitlement) + `\s*</key>\s*(<true\s*/>|<true\s*>\s*</true\s*>)`
		if !regexp.MustCompile(pattern).MatchString(actual) {
			return fmt.Errorf("required entitlement %q is not enabled", entitlement)
		}
	}
	return nil
}

func signBinary(path, entitlements string) error {
	file, err := macho.NewFile(path)
	if err != nil {
		return err
	}
	defer file.Close()

	if file.HasCodeSigningCmd() {
		err = file.RemoveSigningContent()
		if err != nil {
			return fmt.Errorf("remove existing signature: %w", err)
		}
	}
	signingMaterial := pki.SigningMaterial{}

	err = file.AddEmptyCodeSigningCmd()
	if err != nil {
		return err
	}
	identity := filepath.Base(path)
	superBlobSize, superBlob, err := sign.GenerateSigningSuperBlob(identity, file, signingMaterial, entitlements, 0)
	if err != nil {
		return fmt.Errorf("generate initial signature: %w", err)
	}
	err = sign.UpdateSuperBlobOffsetReferences(file, uint64(len(superBlob)))
	if err != nil {
		return fmt.Errorf("update signature offsets: %w", err)
	}
	_, superBlob, err = sign.GenerateSigningSuperBlob(identity, file, signingMaterial, entitlements, superBlobSize)
	if err != nil {
		return fmt.Errorf("generate final signature: %w", err)
	}

	command, _, err := file.CodeSigningCmd()
	if err != nil {
		return err
	}
	if err := file.Patch(superBlob, len(superBlob), uint64(command.DataOffset)); err != nil {
		return fmt.Errorf("write signature: %w", err)
	}
	return nil
}
