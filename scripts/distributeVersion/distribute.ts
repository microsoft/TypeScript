// Update TypeScript Version
/// <reference path="../../src/harness/external/node.d.ts" />
"use strict"
import * as fs from 'fs'
import * as path from 'path'

const versionFilePath = path.join(__dirname, "version.json");

interface ExtensionFormat {
	pattern: RegExp,
	serialize: (version: string[]) => string
}

let formats = new Map();
formats.set(
	'src/compiler/program.ts',
	{
        pattern: /version\s*=\s*"[0-9]+\.[0-9]+\.[0-9]"/g,
        serialize: (version: string[]) => {
			return `version = "${version[0]}.${version[1]}.${version[2]}"`;
        }
    }
);

formats.set(
	'package.json',
	{
		pattern: /"version"\s*:\s*"[0-9]+\.[0-9]+\.[0-9]"/g,
		serialize: (version: string[]) => {
			return `"version": "${version[0]}.${version[1]}.${version[2]}"`;
		}
	}
);

interface FileInformation {
	filePath: string,
	ext: string,
	content: string	
}

function getFileExtension(filePath: string): string {
	let pieces = filePath.split('.');
	return pieces.length < 2? "": pieces[pieces.length - 1];
}

function getFileInformation(filePath: string): Promise<FileInformation> {
	return new Promise<FileInformation>((resolve, reject) => {
		let result: FileInformation;
		fs.readFile(filePath, (err, data) => {
			if (err) {
				reject(new Error("getFileInformation error: " + err));
			}

			resolve({
				filePath,
				content: data.toString(),
				ext: getFileExtension(filePath)
			});
		});
	});
}

function getVersion(): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		fs.readFile(versionFilePath, 'utf8', function (err, data) {
			if (err) {
				reject(new Error("getVersion error: "+ err));
			}
			resolve(JSON.parse(data)["TypeScriptVersion"].split("."));
		});
	});
}

async function distributeVersion() {
	let version = await getVersion();

	for (let filePath of formats.keys()) {
		if (!fs.existsSync(filePath)) {
			continue;
		}
		try {
			let fileInfo = await getFileInformation(filePath);
			let format = formats.get(filePath);
			fs.writeFileSync(fileInfo.filePath, fileInfo.content.replace(format.pattern, format.serialize(version)));
			console.log("Wrote version in "+ fileInfo.filePath);
		} catch (err) {
			console.log(err);
		}
	}
}

distributeVersion();
