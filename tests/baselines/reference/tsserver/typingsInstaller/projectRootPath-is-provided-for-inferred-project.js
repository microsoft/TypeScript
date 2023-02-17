TI:: Creating typing installer
//// [/user/username/projects/san2/x.js]
const aaaaaaav = 1;

//// [/user/username/projects/anotherProject/package.json]
{"devDependencies":{"pkgcurrentdirectory":""}}

//// [/user/username/projects/anotherProject/node_modules/pkgcurrentdirectory/package.json]
{"name":"pkgcurrentdirectory","main":"index.js","typings":"index.d.ts"}

//// [/user/username/projects/anotherProject/node_modules/pkgcurrentdirectory/index.d.ts]
export function foo() { }

//// [/users/username/Library/Caches/typescript/2.7/package.json]
{"devDependencies":{}}

//// [/users/username/Library/Caches/typescript/2.7/package-lock.json]
{"dependencies":{}}


TI:: [00:00:41.000] Global cache location '/users/username/Library/Caches/typescript/2.7', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:42.000] Processing cache location '/users/username/Library/Caches/typescript/2.7'
TI:: [00:00:43.000] Trying to find '/users/username/Library/Caches/typescript/2.7/package.json'...
TI:: [00:00:44.000] Loaded content of '/users/username/Library/Caches/typescript/2.7/package.json': {"devDependencies":{}}
TI:: [00:00:45.000] Loaded content of '/users/username/Library/Caches/typescript/2.7/package-lock.json'
TI:: [00:00:46.000] Finished processing cache location '/users/username/Library/Caches/typescript/2.7'
TI:: [00:00:47.000] Npm config file: /users/username/Library/Caches/typescript/2.7/package.json
TI:: [00:00:48.000] Updating types-registry npm package...
TI:: [00:00:49.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:56.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/users/username/Library/Caches/typescript/2.7/node_modules/types-registry/index.json]
{
 "entries": {
  "pkgcurrentdirectory": {
   "latest": "1.3.0",
   "ts2.0": "1.0.0",
   "ts2.1": "1.0.0",
   "ts2.2": "1.2.0",
   "ts2.3": "1.3.0",
   "ts2.4": "1.3.0",
   "ts2.5": "1.3.0",
   "ts2.6": "1.3.0",
   "ts2.7": "1.3.0"
  }
 }
}


Info 0    [00:00:57.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service

Info 1    [00:00:58.000] Search path: /user/username/projects/san2
Info 2    [00:00:59.000] For info: /user/username/projects/san2/x.js :: No config files found.
Info 3    [00:01:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/san2/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 4    [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/san2/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:01:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:01:06.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:01:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:01:08.000] 	Files (1)
	/user/username/projects/san2/x.js


	x.js
	  Root file specified for compilation

Info 12   [00:01:09.000] -----------------------------------------------
TI:: [00:01:10.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/user/username/projects/san2/x.js"],"compilerOptions":{"module":1,"target":3,"jsx":1,"experimentalDecorators":true,"allowJs":true,"allowSyntheticDefaultImports":true,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/san2","cachePath":"/users/username/Library/Caches/typescript/2.7","kind":"discover"}
TI:: [00:01:11.000] Request specifies cache path '/users/username/Library/Caches/typescript/2.7', loading cached information...
TI:: [00:01:12.000] Processing cache location '/users/username/Library/Caches/typescript/2.7'
TI:: [00:01:13.000] Cache location was already processed...
TI:: [00:01:14.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:15.000] Explicitly included types: []
TI:: [00:01:16.000] Inferred typings from unresolved imports: []
TI:: [00:01:17.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/san2/bower_components","/user/username/projects/san2/node_modules"]}
TI:: [00:01:18.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/san2/bower_components","/user/username/projects/san2/node_modules"]}
TI:: [00:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/bower_components
TI:: [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/san2/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:25.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"module":1,"target":3,"jsx":1,"experimentalDecorators":true,"allowJs":true,"allowSyntheticDefaultImports":true,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:26.000] No new typings were requested as a result of typings discovery
Info 13   [00:01:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:01:28.000] 	Files (1)

Info 13   [00:01:29.000] -----------------------------------------------
Info 13   [00:01:30.000] Open files: 
Info 13   [00:01:31.000] 	FileName: /user/username/projects/san2/x.js ProjectRootPath: /user/username/projects/san2
Info 13   [00:01:32.000] 		Projects: /dev/null/inferredProject1*