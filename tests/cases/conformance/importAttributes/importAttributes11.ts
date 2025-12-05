// @strict: true
// @target: esnext
// @module: nodenext
// @moduleResolution: nodenext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62590

// @filename: ./a.json
{ "key": "value" }

// @filename: ./b.mts
declare global {
    interface ImportAttributes {
        type: "json"
    }
}

import a
	from "./a.json"
	with {type: "json"}
