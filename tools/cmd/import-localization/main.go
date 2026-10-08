package main

import (
	"bytes"
	"encoding/json/jsontext"
	"encoding/json/v2"
	"encoding/xml"
	"errors"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type localizationFile struct {
	XMLName xml.Name           `xml:"LCX"`
	Items   []localizationItem `xml:"Item"`
}

type localizationItem struct {
	ID       string             `xml:"ItemId,attr"`
	Message  *localizedString   `xml:"Str"`
	Children []localizationItem `xml:"Item"`
}

type localizedString struct {
	Target *localizedTarget `xml:"Tgt"`
}

type localizedTarget struct {
	Status string `xml:"Stat,attr"`
}

func main() {
	source := flag.String("source", "", "English source JSON file")
	handback := flag.String("handback", "", "OneLoc handback JSON file with accompanying .lct metadata")
	output := flag.String("out", "", "Output locale JSON file")
	flag.Parse()
	if *source == "" || *handback == "" || *output == "" || flag.NArg() != 0 {
		fmt.Fprintln(os.Stderr, "Expected -source, -handback, and -out flags with no positional arguments")
		flag.Usage()
		os.Exit(1)
	}
	if err := importLocalization(*source, *handback, *output); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func importLocalization(sourcePath string, handbackPath string, outputPath string) error {
	english, err := readMessages(sourcePath)
	if err != nil {
		return err
	}
	handback, err := readMessages(handbackPath)
	if err != nil {
		return err
	}
	metadata, err := readMetadata(handbackPath + ".lct")
	if err != nil {
		return err
	}
	existing, err := readMessages(outputPath)
	if errors.Is(err, os.ErrNotExist) {
		existing = make(map[string]string)
	} else if err != nil {
		return err
	}
	for key := range existing {
		if _, ok := english[key]; !ok {
			delete(existing, key)
		}
	}
	for key, text := range handback {
		_, ok := english[key]
		if !ok {
			continue
		}
		message, ok := metadata[key]
		if !ok || message.Target == nil {
			return fmt.Errorf("%s: missing localization metadata for %q", handbackPath, key)
		}
		switch message.Target.Status {
		case "Loc":
			existing[key] = text
		case "", "Update":
			// Keep the previous translation until a completed replacement arrives.
		default:
			return fmt.Errorf("%s: unknown localization status %q for %q", handbackPath, message.Target.Status, key)
		}
	}
	data, err := json.Marshal(existing, json.Deterministic(true), jsontext.WithIndent("  "))
	if err != nil {
		return fmt.Errorf("encode %s: %w", outputPath, err)
	}
	data = bytes.ReplaceAll(data, []byte("\n"), []byte("\r\n"))
	if err := os.MkdirAll(filepath.Dir(outputPath), 0o755); err != nil {
		return err
	}
	if err := os.WriteFile(outputPath, data, 0o644); err != nil {
		return err
	}
	return nil
}

func readMessages(path string) (map[string]string, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var messages map[string]string
	if err := json.Unmarshal(bytes.TrimPrefix(data, []byte("\xef\xbb\xbf")), &messages); err != nil {
		return nil, fmt.Errorf("decode %s: %w", path, err)
	}
	if messages == nil {
		return nil, fmt.Errorf("%s: expected a JSON object", path)
	}
	return messages, nil
}

func readMetadata(path string) (map[string]*localizedString, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var file localizationFile
	if err := xml.Unmarshal(data, &file); err != nil {
		return nil, fmt.Errorf("decode %s: %w", path, err)
	}
	messages := make(map[string]*localizedString)
	var visit func([]localizationItem) error
	visit = func(items []localizationItem) error {
		for _, item := range items {
			if item.Message != nil {
				key, ok := strings.CutPrefix(item.ID, ";")
				if !ok || key == "" {
					return fmt.Errorf("%s: invalid resource ID %q", path, item.ID)
				}
				if _, ok := messages[key]; ok {
					return fmt.Errorf("%s: duplicate resource ID %q", path, item.ID)
				}
				messages[key] = item.Message
			}
			if visitErr := visit(item.Children); visitErr != nil {
				return visitErr
			}
		}
		return nil
	}
	if visitErr := visit(file.Items); visitErr != nil {
		return nil, visitErr
	}
	return messages, nil
}
