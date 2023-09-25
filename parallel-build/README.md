1. Build typescript 
```sh
	cd typescript
	npx hereby local 
```
2. Build external-declarations
```sh
	cd external-declarations
	npm run build
```
3. Build parallel-build
```sh
	cd parallel-build
	npm run build
```
4. Create task dirs in the parallel-build folder 
```sh
	cd parallel-build
	mkdir tasks
	mkdir tasks-stats
	mkdir tasks-times
```

5. Create task files by pointing to one or more composite project tsconfigs (referenced projects will be discovered):
```sh
	cd parallel-build
	node ./build/dep-builder/dep-builder-tsconfig.json.js tsconfig.json
```

The task folder should now contain task configurations for different build types: 
 - `b=T` -  just use `tsc -b` equivalent
 - `isolatedDeclarations=F` - parallel build with topological sort based on dependencies
 - `isolatedDeclarations=T` - parallel build with declaration generation at the beginning
 - `cpus=X` - number of workers to use for each build (for `-b` it makes no difference since it is single threaded, unless there are multiple root projects)

7. Test that build works for all build types.

```sh
# tsc -b
node ./build/main.js ./tasks/clean.json
node ./build/main.js ./tasks/b\=T-isolatedDeclarations\=F-cpus\=6.json

# topological order 
node ./build/main.js ./clean.json
node ./build/main.js ./tasks/b\=F-isolatedDeclarations\=F-cpus\=6.json

# isolated declarations full parallelism
node ./build/main.js ./clean.json
node ./build/main.js ./tasks/b\=F-isolatedDeclarations\=T-cpus\=6.json
```

8. Run the full test suite (will run each task in the task folder 11 times (1st for task ordering times, 10 for perf metrics) )
Each task will run 11 time, with a clean in between and a 1s pause 

```sh
node ./build/run-all-tasks.js
```