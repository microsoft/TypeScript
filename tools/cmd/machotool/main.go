// Portions of this file are derived from github.com/anchore/quill v0.7.1.
// The original code is licensed under the Apache License, Version 2.0.
// This version is modified to support only the operations used by TypeScript.

package main

import (
	"encoding/xml"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/anchore/quill/quill/macho"
	"github.com/anchore/quill/quill/pki"
	"github.com/anchore/quill/quill/sign"
	blacktopmacho "github.com/blacktop/go-macho"
)

const typescriptMacEntitlements = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-dyld-environment-variables</key>
    <true/>
    <key>com.apple.security.cs.disable-library-validation</key>
    <true/>
</dict>
</plist>
`

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func run(args []string) error {
	if len(args) != 2 {
		return errors.New("usage: machotool <sign|verify> <binary>")
	}
	switch args[0] {
	case "sign":
		return signBinary(args[1], typescriptMacEntitlements)
	case "verify":
		return verifyBinary(args[1], typescriptMacEntitlements)
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

type plistElement struct {
	XMLName xml.Name `xml:""`
	Value   string   `xml:",chardata"`
}

type entitlementsPlist struct {
	XMLName xml.Name `xml:"plist"`
	Dict    struct {
		Elements []plistElement `xml:",any"`
	} `xml:"dict"`
}

func parseBooleanEntitlements(contents string) (map[string]bool, error) {
	var plist entitlementsPlist
	if err := xml.Unmarshal([]byte(contents), &plist); err != nil {
		return nil, err
	}

	entitlements := map[string]bool{}
	key := ""
	for _, element := range plist.Dict.Elements {
		switch element.XMLName.Local {
		case "key":
			key = strings.TrimSpace(element.Value)
		case "true", "false":
			if key != "" {
				entitlements[key] = element.XMLName.Local == "true"
			}
			key = ""
		default:
			key = ""
		}
	}
	return entitlements, nil
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
