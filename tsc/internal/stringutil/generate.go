package stringutil

//go:generate node --experimental-strip-types --no-warnings ./_scripts/generate-unicode-data.mts
//go:generate npx dprint fmt js_case_generated.go identifier_parts_generated.go
