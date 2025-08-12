package project

import (
	"fmt"
	"os/exec"
	"sync"
	"sync/atomic"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type PendingRequest struct {
	requestId              int32
	packageNames           []string
	filteredTypings        []string
	currentlyCachedTypings []string
	p                      *Project
	typingsInfo            *TypingsInfo
}

type NpmInstallOperation func(string, []string) ([]byte, error)

type TypingsInstallerStatus struct {
	RequestId int32
	Project   *Project
	Status    string
}

type TypingsInstallerOptions struct {
	// !!! sheetal strada params to keep or not
	// 	const typingSafeListLocation = ts.server.findArgument(ts.server.Arguments.TypingSafeListLocation);
	// const typesMapLocation = ts.server.findArgument(ts.server.Arguments.TypesMapLocation);
	// const npmLocation = ts.server.findArgument(ts.server.Arguments.NpmLocation);
	// const validateDefaultNpmLocation = ts.server.hasArgument(ts.server.Arguments.ValidateDefaultNpmLocation);
	ThrottleLimit int

	// For testing
	NpmInstall    NpmInstallOperation
	InstallStatus chan TypingsInstallerStatus
}

type TypingsInstaller struct {
	TypingsLocation string
	options         *TypingsInstallerOptions

	initOnce sync.Once

	packageNameToTypingLocation collections.SyncMap[string, *CachedTyping]
	missingTypingsSet           collections.SyncMap[string, bool]

	typesRegistry map[string]map[string]string

	installRunCount      atomic.Int32
	inFlightRequestCount int
	pendingRunRequests   []*PendingRequest
	pendingRunRequestsMu sync.Mutex
}

func (ti *TypingsInstaller) PendingRunRequestsCount() int {
	ti.pendingRunRequestsMu.Lock()
	defer ti.pendingRunRequestsMu.Unlock()
	return len(ti.pendingRunRequests)
}

func (ti *TypingsInstaller) IsKnownTypesPackageName(p *Project, name string) bool {
	// We want to avoid looking this up in the registry as that is expensive. So first check that it's actually an NPM package.
	validationResult, _, _ := ValidatePackageName(name)
	if validationResult != NameOk {
		return false
	}
	// Strada did this lazily - is that needed here to not waiting on and returning false on first request
	ti.init(p)
	_, ok := ti.typesRegistry[name]
	return ok
}

// !!! sheetal currently we use latest instead of core.VersionMajorMinor()
const TsVersionToUse = "latest"

func (ti *TypingsInstaller) InstallPackage(p *Project, fileName string, packageName string) {
	cwd, ok := tspath.ForEachAncestorDirectory(tspath.GetDirectoryPath(fileName), func(directory string) (string, bool) {
		if p.FS().FileExists(tspath.CombinePaths(directory, "package.json")) {
			return directory, true
		}
		return "", false
	})
	if !ok {
		cwd = p.GetCurrentDirectory()
	}
	if cwd != "" {
		go ti.installWorker(p, -1, []string{packageName}, cwd, func(
			p *Project,
			requestId int32,
			packageNames []string,
			success bool,
		) {
			// !!! sheetal events to send
			// const message = success ?
			//
			//	`Package ${packageName} installed.` :
			//	`There was an error installing ${packageName}.`;
			//
			//	const response: PackageInstalledResponse = {
			//		kind: ActionPackageInstalled,
			//		projectName,
			//		id,
			//		success,
			//		message,
			//	};
			//

			// this.sendResponse(response);
			//     // The behavior is the same as for setTypings, so send the same event.
			//     this.event(response, "setTypings"); -- Used same event name - do we need it ?
		})
	} else {
		// !!! sheetal events to send
		// const response: PackageInstalledResponse = {
		// 	kind: ActionPackageInstalled,
		// 	projectName,
		// 	id,
		// 	success: false,
		// 	message: "Could not determine a project root path.",
		// };
		// this.sendResponse(response);
		//     // The behavior is the same as for setTypings, so send the same event.
		//     this.event(response, "setTypings"); -- Used same event name - do we need it ?
	}
}

func (ti *TypingsInstaller) EnqueueInstallTypingsRequest(p *Project, typingsInfo *TypingsInfo) {
	// because we arent using buffers, no need to throttle for requests here
	p.Log("ATA:: Got install request for: " + p.Name())
	go ti.discoverAndInstallTypings(
		p,
		typingsInfo,
		p.GetFileNames( /*excludeFilesFromExternalLibraries*/ true /*excludeConfigFiles*/, true),
		p.GetCurrentDirectory(),
	) //.concat(project.getExcludedFiles()) // !!! sheetal we dont have excluded files in project yet
}

func (ti *TypingsInstaller) discoverAndInstallTypings(p *Project, typingsInfo *TypingsInfo, fileNames []string, projectRootPath string) {
	ti.init(p)

	cachedTypingPaths, newTypingNames, filesToWatch := DiscoverTypings(
		p.FS(),
		p.Log,
		typingsInfo,
		fileNames,
		projectRootPath,
		&ti.packageNameToTypingLocation,
		ti.typesRegistry,
	)

	// start watching files
	p.WatchTypingLocations(filesToWatch)

	requestId := ti.installRunCount.Add(1)
	// install typings
	if len(newTypingNames) > 0 {
		filteredTypings := ti.filterTypings(p, newTypingNames)
		if len(filteredTypings) != 0 {
			ti.installTypings(p, typingsInfo, requestId, cachedTypingPaths, filteredTypings)
			return
		}
		p.Log("ATA:: All typings are known to be missing or invalid - no need to install more typings")
	} else {
		p.Log("ATA:: No new typings were requested as a result of typings discovery")
	}
	p.UpdateTypingFiles(typingsInfo, cachedTypingPaths)
	// !!! sheetal events to send
	// this.event(response, "setTypings");

	if ti.options.InstallStatus != nil {
		ti.options.InstallStatus <- TypingsInstallerStatus{
			RequestId: requestId,
			Project:   p,
			Status:    fmt.Sprintf("Skipped %d typings", len(newTypingNames)),
		}
	}
}

func (ti *TypingsInstaller) installTypings(
	p *Project,
	typingsInfo *TypingsInfo,
	requestId int32,
	currentlyCachedTypings []string,
	filteredTypings []string,
) {
	// !!! sheetal events to send
	// send progress event
	// this.sendResponse({
	// 	kind: EventBeginInstallTypes,
	// 	eventId: requestId,
	// 	typingsInstallerVersion: version,
	// 	projectName: req.projectName,
	// } as BeginInstallTypes);

	// const body: protocol.BeginInstallTypesEventBody = {
	// 	eventId: response.eventId,
	// 	packages: response.packagesToInstall,
	// };
	// const eventName: protocol.BeginInstallTypesEventName = "beginInstallTypes";
	// this.event(body, eventName);

	scopedTypings := make([]string, len(filteredTypings))
	for i, packageName := range filteredTypings {
		scopedTypings[i] = fmt.Sprintf("@types/%s@%s", packageName, TsVersionToUse) // @tscore.VersionMajorMinor) // This is normally @tsVersionMajorMinor but for now lets use latest
	}

	request := &PendingRequest{
		requestId:              requestId,
		packageNames:           scopedTypings,
		filteredTypings:        filteredTypings,
		currentlyCachedTypings: currentlyCachedTypings,
		p:                      p,
		typingsInfo:            typingsInfo,
	}
	ti.pendingRunRequestsMu.Lock()
	if ti.inFlightRequestCount < ti.options.ThrottleLimit {
		ti.inFlightRequestCount++
		ti.pendingRunRequestsMu.Unlock()
		ti.invokeRoutineToInstallTypings(request)
	} else {
		ti.pendingRunRequests = append(ti.pendingRunRequests, request)
		ti.pendingRunRequestsMu.Unlock()
	}
}

func (ti *TypingsInstaller) invokeRoutineToInstallTypings(
	request *PendingRequest,
) {
	go ti.installWorker(
		request.p,
		request.requestId,
		request.packageNames,
		ti.TypingsLocation,
		func(
			p *Project,
			requestId int32,
			packageNames []string,
			success bool,
		) {
			if success {
				p.Logf("ATA:: Installed typings %v", packageNames)
				var installedTypingFiles []string
				resolver := module.NewResolver(p, &core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext}, "", "")
				for _, packageName := range request.filteredTypings {
					typingFile := ti.typingToFileName(resolver, packageName)
					if typingFile == "" {
						ti.missingTypingsSet.Store(packageName, true)
						continue
					}

					// packageName is guaranteed to exist in typesRegistry by filterTypings
					distTags := ti.typesRegistry[packageName]
					useVersion, ok := distTags["ts"+core.VersionMajorMinor()]
					if !ok {
						useVersion = distTags["latest"]
					}
					newVersion := semver.MustParse(useVersion)
					newTyping := &CachedTyping{TypingsLocation: typingFile, Version: newVersion}
					ti.packageNameToTypingLocation.Store(packageName, newTyping)
					installedTypingFiles = append(installedTypingFiles, typingFile)
				}
				p.Logf("ATA:: Installed typing files %v", installedTypingFiles)
				p.UpdateTypingFiles(request.typingsInfo, append(request.currentlyCachedTypings, installedTypingFiles...))
				// DO we really need these events
				// this.event(response, "setTypings");
			} else {
				p.Logf("ATA:: install request failed, marking packages as missing to prevent repeated requests: %v", request.filteredTypings)
				for _, typing := range request.filteredTypings {
					ti.missingTypingsSet.Store(typing, true)
				}
			}

			// !!! sheetal events to send
			// const response: EndInstallTypes = {
			// 	kind: EventEndInstallTypes,
			// 	eventId: requestId,
			// 	projectName: req.projectName,
			// 	packagesToInstall: scopedTypings,
			// 	installSuccess: ok,
			// 	typingsInstallerVersion: version,
			// };
			// this.sendResponse(response);

			// if (this.telemetryEnabled) {
			// 	const body: protocol.TypingsInstalledTelemetryEventBody = {
			// 		telemetryEventName: "typingsInstalled",
			// 		payload: {
			// 			installedPackages: response.packagesToInstall.join(","),
			// 			installSuccess: response.installSuccess,
			// 			typingsInstallerVersion: response.typingsInstallerVersion,
			// 		},
			// 	};
			// 	const eventName: protocol.TelemetryEventName = "telemetry";
			// 	this.event(body, eventName);
			// }

			// const body: protocol.EndInstallTypesEventBody = {
			// 	eventId: response.eventId,
			// 	packages: response.packagesToInstall,
			// 	success: response.installSuccess,
			// };
			// const eventName: protocol.EndInstallTypesEventName = "endInstallTypes";
			// this.event(body, eventName);

			if ti.options.InstallStatus != nil {
				ti.options.InstallStatus <- TypingsInstallerStatus{
					RequestId: requestId,
					Project:   p,
					Status:    core.IfElse(success, "Success", "Fail"),
				}
			}

			ti.pendingRunRequestsMu.Lock()
			pendingRequestsCount := len(ti.pendingRunRequests)
			var nextRequest *PendingRequest
			if pendingRequestsCount == 0 {
				ti.inFlightRequestCount--
			} else {
				nextRequest = ti.pendingRunRequests[0]
				if pendingRequestsCount == 1 {
					ti.pendingRunRequests = nil
				} else {
					ti.pendingRunRequests[0] = nil // ensure the request is GC'd
					ti.pendingRunRequests = ti.pendingRunRequests[1:]
				}
			}
			ti.pendingRunRequestsMu.Unlock()
			if nextRequest != nil {
				ti.invokeRoutineToInstallTypings(nextRequest)
			}
		},
	)
}

func (ti *TypingsInstaller) installWorker(
	p *Project,
	requestId int32,
	packageNames []string,
	cwd string,
	onRequestComplete func(
		p *Project,
		requestId int32,
		packageNames []string,
		success bool,
	),
) {
	p.Logf("ATA:: #%d with cwd: %s arguments: %v", requestId, cwd, packageNames)
	hasError := InstallNpmPackages(packageNames, func(packageNames []string, hasError *atomic.Bool) {
		var npmArgs []string
		npmArgs = append(npmArgs, "install", "--ignore-scripts")
		npmArgs = append(npmArgs, packageNames...)
		npmArgs = append(npmArgs, "--save-dev", "--user-agent=\"typesInstaller/"+core.Version()+"\"")
		output, err := ti.options.NpmInstall(cwd, npmArgs)
		if err != nil {
			p.Logf("ATA:: Output is: %s", output)
			hasError.Store(true)
		}
	})
	p.Logf("TI:: npm install #%d completed", requestId)
	onRequestComplete(p, requestId, packageNames, !hasError)
}

func InstallNpmPackages(
	packageNames []string,
	installPackages func(packages []string, hasError *atomic.Bool),
) bool {
	var hasError atomic.Bool
	hasError.Store(false)

	wg := core.NewWorkGroup(false)
	currentCommandStart := 0
	currentCommandEnd := 0
	currentCommandSize := 100
	for _, packageName := range packageNames {
		currentCommandSize = currentCommandSize + len(packageName) + 1
		if currentCommandSize < 8000 {
			currentCommandEnd++
		} else {
			packages := packageNames[currentCommandStart:currentCommandEnd]
			wg.Queue(func() {
				installPackages(packages, &hasError)
			})
			currentCommandStart = currentCommandEnd
			currentCommandSize = 100 + len(packageName) + 1
			currentCommandEnd++
		}
	}
	wg.Queue(func() {
		installPackages(packageNames[currentCommandStart:currentCommandEnd], &hasError)
	})
	wg.RunAndWait()
	return hasError.Load()
}

func (ti *TypingsInstaller) filterTypings(
	p *Project,
	typingsToInstall []string,
) []string {
	var result []string
	for _, typing := range typingsToInstall {
		typingKey := module.MangleScopedPackageName(typing)
		if _, ok := ti.missingTypingsSet.Load(typingKey); ok {
			p.Logf("ATA:: '%s':: '%s' is in missingTypingsSet - skipping...", typing, typingKey)
			continue
		}
		validationResult, name, isScopeName := ValidatePackageName(typing)
		if validationResult != NameOk {
			// add typing name to missing set so we won't process it again
			ti.missingTypingsSet.Store(typingKey, true)
			p.Log("ATA:: " + RenderPackageNameValidationFailure(typing, validationResult, name, isScopeName))
			continue
		}
		typesRegistryEntry, ok := ti.typesRegistry[typingKey]
		if !ok {
			p.Logf("ATA:: '%s':: Entry for package '%s' does not exist in local types registry - skipping...", typing, typingKey)
			continue
		}
		if typingLocation, ok := ti.packageNameToTypingLocation.Load(typingKey); ok && IsTypingUpToDate(typingLocation, typesRegistryEntry) {
			p.Logf("ATA:: '%s':: '%s' already has an up-to-date typing - skipping...", typing, typingKey)
			continue
		}
		result = append(result, typingKey)
	}
	return result
}

func (ti *TypingsInstaller) init(p *Project) {
	ti.initOnce.Do(func() {
		p.Log("ATA:: Global cache location '" + ti.TypingsLocation + "'") //, safe file path '" + safeListPath + "', types map path '" + typesMapLocation + "`")
		ti.processCacheLocation(p)

		// !!! sheetal handle npm path here if we would support it
		//     // If the NPM path contains spaces and isn't wrapped in quotes, do so.
		//     if (this.npmPath.includes(" ") && this.npmPath[0] !== `"`) {
		//         this.npmPath = `"${this.npmPath}"`;
		//     }
		//     if (this.log.isEnabled()) {
		//         this.log.writeLine(`Process id: ${process.pid}`);
		//         this.log.writeLine(`NPM location: ${this.npmPath} (explicit '${ts.server.Arguments.NpmLocation}' ${npmLocation === undefined ? "not " : ""} provided)`);
		//         this.log.writeLine(`validateDefaultNpmLocation: ${validateDefaultNpmLocation}`);
		//     }

		ti.ensureTypingsLocationExists(p)
		p.Log("ATA:: Updating types-registry@latest npm package...")
		if _, err := ti.options.NpmInstall(ti.TypingsLocation, []string{"install", "--ignore-scripts", "types-registry@latest"}); err == nil {
			p.Log("ATA:: Updated types-registry npm package")
		} else {
			p.Logf("ATA:: Error updating types-registry package: %v", err)
			// !!! sheetal events to send
			//         // store error info to report it later when it is known that server is already listening to events from typings installer
			//         this.delayedInitializationError = {
			//             kind: "event::initializationFailed",
			//             message: (e as Error).message,
			//             stack: (e as Error).stack,
			//         };

			// const body: protocol.TypesInstallerInitializationFailedEventBody = {
			// 	message: response.message,
			// };
			// const eventName: protocol.TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";
			// this.event(body, eventName);
		}

		ti.typesRegistry = ti.loadTypesRegistryFile(p)
	})
}

type NpmConfig struct {
	DevDependencies map[string]any `json:"devDependencies"`
}

type NpmDependecyEntry struct {
	Version string `json:"version"`
}
type NpmLock struct {
	Dependencies map[string]NpmDependecyEntry `json:"dependencies"`
	Packages     map[string]NpmDependecyEntry `json:"packages"`
}

func (ti *TypingsInstaller) processCacheLocation(p *Project) {
	p.Log("ATA:: Processing cache location " + ti.TypingsLocation)
	packageJson := tspath.CombinePaths(ti.TypingsLocation, "package.json")
	packageLockJson := tspath.CombinePaths(ti.TypingsLocation, "package-lock.json")
	p.Log("ATA:: Trying to find '" + packageJson + "'...")
	if p.FS().FileExists(packageJson) && p.FS().FileExists((packageLockJson)) {
		var npmConfig NpmConfig
		npmConfigContents := parseNpmConfigOrLock(p, packageJson, &npmConfig)
		var npmLock NpmLock
		npmLockContents := parseNpmConfigOrLock(p, packageLockJson, &npmLock)

		p.Log("ATA:: Loaded content of " + packageJson + ": " + npmConfigContents)
		p.Log("ATA:: Loaded content of " + packageLockJson + ": " + npmLockContents)

		// !!! sheetal strada uses Node10
		resolver := module.NewResolver(p, &core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext}, "", "")
		if npmConfig.DevDependencies != nil && (npmLock.Packages != nil || npmLock.Dependencies != nil) {
			for key := range npmConfig.DevDependencies {
				npmLockValue, npmLockValueExists := npmLock.Packages["node_modules/"+key]
				if !npmLockValueExists {
					npmLockValue, npmLockValueExists = npmLock.Dependencies[key]
					if !npmLockValueExists {
						// if package in package.json but not package-lock.json, skip adding to cache so it is reinstalled on next use
						continue
					}
				}
				// key is @types/<package name>
				packageName := tspath.GetBaseFileName(key)
				if packageName == "" {
					continue
				}
				typingFile := ti.typingToFileName(resolver, packageName)
				if typingFile == "" {
					ti.missingTypingsSet.Store(packageName, true)
					continue
				}
				if existingTypingFile, existingTypingsFilePresent := ti.packageNameToTypingLocation.Load(packageName); existingTypingsFilePresent {
					if existingTypingFile.TypingsLocation == typingFile {
						continue
					}
					p.Log("ATA:: New typing for package " + packageName + " from " + typingFile + " conflicts with existing typing file " + existingTypingFile.TypingsLocation)
				}
				p.Log("ATA:: Adding entry into typings cache: " + packageName + " => " + typingFile)
				version := npmLockValue.Version
				if version == "" {
					continue
				}

				newTyping := &CachedTyping{
					TypingsLocation: typingFile,
					Version:         semver.MustParse(version),
				}
				ti.packageNameToTypingLocation.Store(packageName, newTyping)
			}
		}
	}
	p.Log("ATA:: Finished processing cache location " + ti.TypingsLocation)
}

func parseNpmConfigOrLock[T NpmConfig | NpmLock](p *Project, location string, config *T) string {
	contents, _ := p.FS().ReadFile(location)
	_ = json.Unmarshal([]byte(contents), config)
	return contents
}

func (ti *TypingsInstaller) ensureTypingsLocationExists(p *Project) {
	npmConfigPath := tspath.CombinePaths(ti.TypingsLocation, "package.json")
	p.Log("ATA:: Npm config file: " + npmConfigPath)

	if !p.FS().FileExists(npmConfigPath) {
		p.Logf("ATA:: Npm config file: '%s' is missing, creating new one...", npmConfigPath)
		err := p.FS().WriteFile(npmConfigPath, "{ \"private\": true }", false)
		if err != nil {
			p.Logf("ATA:: Npm config file write failed: %v", err)
		}
	}
}

func (ti *TypingsInstaller) typingToFileName(resolver *module.Resolver, packageName string) string {
	result, _ := resolver.ResolveModuleName(packageName, tspath.CombinePaths(ti.TypingsLocation, "index.d.ts"), core.ModuleKindNone, nil)
	return result.ResolvedFileName
}

func (ti *TypingsInstaller) loadTypesRegistryFile(p *Project) map[string]map[string]string {
	typesRegistryFile := tspath.CombinePaths(ti.TypingsLocation, "node_modules/types-registry/index.json")
	typesRegistryFileContents, ok := p.FS().ReadFile(typesRegistryFile)
	if ok {
		var entries map[string]map[string]map[string]string
		err := json.Unmarshal([]byte(typesRegistryFileContents), &entries)
		if err == nil {
			if typesRegistry, ok := entries["entries"]; ok {
				return typesRegistry
			}
		}
		p.Logf("ATA:: Error when loading types registry file '%s': %v", typesRegistryFile, err)
	} else {
		p.Logf("ATA:: Error reading types registry file '%s'", typesRegistryFile)
	}
	return map[string]map[string]string{}
}

func NpmInstall(cwd string, npmInstallArgs []string) ([]byte, error) {
	cmd := exec.Command("npm", npmInstallArgs...)
	cmd.Dir = cwd
	return cmd.Output()
}
