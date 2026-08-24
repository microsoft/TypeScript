//go:build !noembed

package diagnostics

import (
	"embed"
)

//go:embed loc/*.generated.json
var localeFiles embed.FS

func readLocaleFile(localeName string) (string, error) {
	filename := "loc/" + localeName + ".generated.json"
	data, err := localeFiles.ReadFile(filename)
	if err != nil {
		return "", err
	}
	return string(data), nil
}
