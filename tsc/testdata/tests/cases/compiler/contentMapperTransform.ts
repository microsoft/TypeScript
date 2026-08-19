// @runExternalCode: true

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

// @Filename: /node_modules/mapper/package.json
{
	"name": "mapper",
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["target", "jsx"] } }
}

// @Filename: /app.box
export const label: string = "widget";
export const version = #{target};
export const flavor = #{jsx};

// @Filename: /main.ts
import { label, version, flavor } from "./app.box";

export const upper: string = label;
export const twice: number = version * 2;
export const maybe: undefined = flavor;
