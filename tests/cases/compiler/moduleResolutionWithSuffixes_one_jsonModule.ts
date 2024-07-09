// moduleSuffixes has one entry and there's a matching file. module name explicitly includes JSON file extension.
// @fullEmitPaths: true
// @filename: /tsconfig.json
{
	"compilerOptions": {
		"esModuleInterop": true,
		"resolveJsonModule": true,
		"outDir": "bin",
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": [".ios"]
	}
}

// @filename: /index.ts
import foo from "./foo.json";
console.log(foo.ios);
// @filename: /foo.ios.json
{
	"ios": "platform ios"
}
// @filename: /foo.json
{
	"base": "platform base"
}
