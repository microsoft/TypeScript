// @runExternalCode: true

// The mapper package really lives at /packages/mapper and is symlinked into node_modules, as in a
// monorepo. Content mapper resolution must follow the symlink to find the package's manifest.
// @link: /packages/mapper -> /node_modules/mapper

// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"target": "es2020",
		"module": "esnext",
		"moduleResolution": "bundler",
		"strict": true
	},
	"contentMappers": [
		{ "package": "mapper", "extensions": [".box"] }
	]
}

// @Filename: /packages/mapper/package.json
{
	"name": "mapper",
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["target", "jsx"] } }
}

// @Filename: /app.box
export const version = #{target};

// @Filename: /main.ts
import { version } from "./app.box";

export const twice: number = version * 2;
