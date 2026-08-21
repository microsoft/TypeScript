// Portions of this file are derived from github.com/anchore/quill v0.7.1.
// The original code is licensed under the Apache License, Version 2.0.
// This version is modified to support only the operations used by TypeScript.

package main

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"

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
	if len(args) != 3 {
		return errors.New("usage: machotool <sign|verify> <entitlements> <binary>")
	}

	entitlements, err := os.ReadFile(args[1])
	if err != nil {
		return fmt.Errorf("read entitlements: %w", err)
	}
	switch args[0] {
	case "sign":
		return signBinary(args[2], string(entitlements))
	case "verify":
		return verifyBinary(args[2], string(entitlements))
	default:
		return fmt.Errorf("unknown command %q", args[0])
	}
}

func verifyBinary(path, expectedEntitlements string) error {
	file, err := blacktopmacho.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	codeSignature := file.CodeSignature()
	if codeSignature == nil || codeSignature.Entitlements == "" {
		return fmt.Errorf("signed file has no macOS entitlements: %s", path)
	}
	if codeSignature.Entitlements != expectedEntitlements {
		return fmt.Errorf("signed file has unexpected macOS entitlements: %s", path)
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
