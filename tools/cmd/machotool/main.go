// Portions of this file are derived from github.com/anchore/quill v0.7.1.
// The original code is licensed under the Apache License, Version 2.0.
// This version is modified to support only the operations used by TypeScript.

package main

import (
	"encoding/xml"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

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
	if err := verifyEntitlements(codeSignature.Entitlements, expectedEntitlements); err != nil {
		return fmt.Errorf("verify entitlements in %s: %w", path, err)
	}
	return nil
}

func verifyEntitlements(actual, expected string) error {
	expectedValues, err := parseBooleanEntitlements(expected)
	if err != nil {
		return fmt.Errorf("parse expected entitlements: %w", err)
	}
	if len(expectedValues) == 0 {
		return errors.New("expected plist contains no boolean entitlements")
	}

	actualValues, err := parseBooleanEntitlements(actual)
	if err != nil {
		return fmt.Errorf("parse signed entitlements: %w", err)
	}
	for key, expectedValue := range expectedValues {
		if actualValue, ok := actualValues[key]; !ok || actualValue != expectedValue {
			return fmt.Errorf("entitlement %q does not have expected value %t", key, expectedValue)
		}
	}
	return nil
}

func parseBooleanEntitlements(contents string) (map[string]bool, error) {
	decoder := xml.NewDecoder(strings.NewReader(contents))
	values := map[string]bool{}
	dictDepth := 0
	foundDict := false
	pendingKey := ""

	for {
		token, err := decoder.Token()
		if errors.Is(err, io.EOF) {
			break
		}
		if err != nil {
			return nil, err
		}

		switch token := token.(type) {
		case xml.StartElement:
			switch token.Name.Local {
			case "dict":
				if dictDepth == 0 {
					foundDict = true
				} else if dictDepth == 1 {
					pendingKey = ""
				}
				dictDepth++
			case "key":
				if dictDepth == 1 {
					if err := decoder.DecodeElement(&pendingKey, &token); err != nil {
						return nil, err
					}
				}
			case "true", "false":
				if dictDepth == 1 && pendingKey != "" {
					values[pendingKey] = token.Name.Local == "true"
					pendingKey = ""
				}
			default:
				if dictDepth == 1 {
					pendingKey = ""
				}
			}
		case xml.EndElement:
			if token.Name.Local == "dict" {
				dictDepth--
			}
		}
	}
	if !foundDict {
		return nil, errors.New("plist contains no dictionary")
	}
	return values, nil
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
