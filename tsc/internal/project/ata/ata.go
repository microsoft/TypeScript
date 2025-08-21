package ata

import (
	"context"
	"errors"
	"fmt"
	"slices"
	"sync"
	"sync/atomic"

	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type TypingsInfo struct {
	TypeAcquisition   *core.TypeAcquisition
	CompilerOptions   *core.CompilerOptions
	UnresolvedImports *collections.Set[string]
}

func (ti TypingsInfo) Equals(other TypingsInfo) bool {
	return ti.TypeAcquisition.Equals(other.TypeAcquisition) &&
		ti.CompilerOptions.GetAllowJS() == other.CompilerOptions.GetAllowJS() &&
		ti.UnresolvedImports.Equals(other.UnresolvedImports)
}

type CachedTyping struct {
	TypingsLocation string
	Version         *semver.Version
}

type TypingsInstallerOptions struct {
	TypingsLocation string
	ThrottleLimit   int
}

type NpmExecutor interface {
	NpmInstall(cwd string, args []string) ([]byte, error)
}

type TypingsInstallerHost interface {
	NpmExecutor
	module.ResolutionHost
}

type TypingsInstaller struct {
	typingsLocation string
	host            TypingsInstallerHost

	initOnce sync.Once

	packageNameToTypingLocation collections.SyncMap[string, *CachedTyping]
	missingTypingsSet           collections.SyncMap[string, bool]

	typesRegistry map[string]map[string]string

	installRunCount      atomic.Int32
	concurrencySemaphore chan struct{}
}

func NewTypingsInstaller(options *TypingsInstallerOptions, host TypingsInstallerHost) *TypingsInstaller {
	return &TypingsInstaller{
		typingsLocation:      options.TypingsLocation,
		host:                 host,
		concurrencySemaphore: make(chan struct{}, options.ThrottleLimit),
	}
}

func (ti *TypingsInstaller) IsKnownTypesPackageName(projectID tspath.Path, name string, fs vfs.FS, logger logging.Logger) bool {
	// We want to avoid looking this up in the registry as that is expensive. So first check that it's actually an NPM package.
	validationResult, _, _ := ValidatePackageName(name)
	if validationResult != NameOk {
		return false
	}
	// Strada did this lazily - is that needed here to not waiting on and returning false on first request
	ti.init(string(projectID), fs, logger)
	_, ok := ti.typesRegistry[name]
	return ok
}

// !!! sheetal currently we use latest instead of core.VersionMajorMinor()
const tsVersionToUse = "latest"

type TypingsInstallRequest struct {
	ProjectID        tspath.Path
	TypingsInfo      *TypingsInfo
	FileNames        []string
	ProjectRootPath  string
	CompilerOptions  *core.CompilerOptions
	CurrentDirectory string
	GetScriptKind    func(string) core.ScriptKind
	FS               vfs.FS
	Logger           logging.Logger
}

type TypingsInstallResult struct {
	TypingsFiles []string
	FilesToWatch []string
}

func (ti *TypingsInstaller) InstallTypings(request *TypingsInstallRequest) (*TypingsInstallResult, error) {
	result, err := ti.discoverAndInstallTypings(request)
	if err == nil {
		slices.Sort(result.TypingsFiles)
		slices.Sort(result.FilesToWatch)
		request.Logger.Log("ATA:: Got install request for: " + string(request.ProjectID))
	}
	return result, err
}

func (ti *TypingsInstaller) discoverAndInstallTypings(request *TypingsInstallRequest) (*TypingsInstallResult, error) {
	ti.init(string(request.ProjectID), request.FS, request.Logger)

	cachedTypingPaths, newTypingNames, filesToWatch := DiscoverTypings(
		request.FS,
		request.Logger,
		request.TypingsInfo,
		request.FileNames,
		request.ProjectRootPath,
		&ti.packageNameToTypingLocation,
		ti.typesRegistry,
	)

	requestId := ti.installRunCount.Add(1)
	// install typings
	if len(newTypingNames) > 0 {
		filteredTypings := ti.filterTypings(request.ProjectID, request.Logger, newTypingNames)
		if len(filteredTypings) != 0 {
			typingsFiles, err := ti.installTypings(request.ProjectID, request.TypingsInfo, requestId, cachedTypingPaths, filteredTypings, request.Logger)
			if err != nil {
				return nil, err
			}
			return &TypingsInstallResult{
				TypingsFiles: typingsFiles,
				FilesToWatch: filesToWatch,
			}, nil
		}
		request.Logger.Log("ATA:: All typings are known to be missing or invalid - no need to install more typings")
	} else {
		request.Logger.Log("ATA:: No new typings were requested as a result of typings discovery")
	}

	return &TypingsInstallResult{
		TypingsFiles: cachedTypingPaths,
		FilesToWatch: filesToWatch,
	}, nil
	// !!! sheetal events to send
	// this.event(response, "setTypings");
}

func (ti *TypingsInstaller) installTypings(
	projectID tspath.Path,
	typingsInfo *TypingsInfo,
	requestID int32,
	currentlyCachedTypings []string,
	filteredTypings []string,
	logger logging.Logger,
) ([]string, error) {
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
		scopedTypings[i] = fmt.Sprintf("@types/%s@%s", packageName, tsVersionToUse) // @tscore.VersionMajorMinor) // This is normally @tsVersionMajorMinor but for now lets use latest
	}

	if packageNames, ok := ti.installWorker(projectID, requestID, scopedTypings, logger); ok {
		logger.Log(fmt.Sprintf("ATA:: Installed typings %v", packageNames))
		var installedTypingFiles []string
		resolver := module.NewResolver(ti.host, &core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext}, "", "")
		for _, packageName := range filteredTypings {
			typingFile := ti.typingToFileName(resolver, packageName)
			if typingFile == "" {
				logger.Log(fmt.Sprintf("ATA:: Failed to find typing file for package '%s'", packageName))
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
			newTyping := &CachedTyping{TypingsLocation: typingFile, Version: &newVersion}
			ti.packageNameToTypingLocation.Store(packageName, newTyping)
			installedTypingFiles = append(installedTypingFiles, typingFile)
		}
		logger.Log(fmt.Sprintf("ATA:: Installed typing files %v", installedTypingFiles))

		return append(currentlyCachedTypings, installedTypingFiles...), nil
	}

	// DO we really need these events
	// this.event(response, "setTypings");
	logger.Log(fmt.Sprintf("ATA:: install request failed, marking packages as missing to prevent repeated requests: %v", filteredTypings))
	for _, typing := range filteredTypings {
		ti.missingTypingsSet.Store(typing, true)
	}

	return nil, errors.New("npm install failed")

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
}

func (ti *TypingsInstaller) installWorker(
	projectID tspath.Path,
	requestId int32,
	packageNames []string,
	logger logging.Logger,
) ([]string, bool) {
	logger.Log(fmt.Sprintf("ATA:: #%d with cwd: %s arguments: %v", requestId, ti.typingsLocation, packageNames))
	ctx := context.Background()
	err := installNpmPackages(ctx, packageNames, ti.concurrencySemaphore, func(packageNames []string) error {
		var npmArgs []string
		npmArgs = append(npmArgs, "install", "--ignore-scripts")
		npmArgs = append(npmArgs, packageNames...)
		npmArgs = append(npmArgs, "--save-dev", "--user-agent=\"typesInstaller/"+core.Version()+"\"")
		output, err := ti.host.NpmInstall(ti.typingsLocation, npmArgs)
		if err != nil {
			logger.Log(fmt.Sprintf("ATA:: Output is: %s", output))
			return err
		}
		return nil
	})
	logger.Log(fmt.Sprintf("TI:: npm install #%d completed", requestId))
	return packageNames, err == nil
}

func installNpmPackages(
	ctx context.Context,
	packageNames []string,
	concurrencySemaphore chan struct{},
	installPackages func(packages []string) error,
) error {
	tg := core.NewThrottleGroup(ctx, concurrencySemaphore)

	currentCommandStart := 0
	currentCommandEnd := 0
	currentCommandSize := 100

	for _, packageName := range packageNames {
		currentCommandSize = currentCommandSize + len(packageName) + 1
		if currentCommandSize < 8000 {
			currentCommandEnd++
		} else {
			packages := packageNames[currentCommandStart:currentCommandEnd]
			tg.Go(func() error {
				return installPackages(packages)
			})
			currentCommandStart = currentCommandEnd
			currentCommandSize = 100 + len(packageName) + 1
			currentCommandEnd++
		}
	}

	// Handle the final batch
	if currentCommandStart < len(packageNames) {
		packages := packageNames[currentCommandStart:currentCommandEnd]
		tg.Go(func() error {
			return installPackages(packages)
		})
	}

	return tg.Wait()
}

func (ti *TypingsInstaller) filterTypings(
	projectID tspath.Path,
	logger logging.Logger,
	typingsToInstall []string,
) []string {
	var result []string
	for _, typing := range typingsToInstall {
		typingKey := module.MangleScopedPackageName(typing)
		if _, ok := ti.missingTypingsSet.Load(typingKey); ok {
			logger.Log(fmt.Sprintf("ATA:: '%s':: '%s' is in missingTypingsSet - skipping...", typing, typingKey))
			continue
		}
		validationResult, name, isScopeName := ValidatePackageName(typing)
		if validationResult != NameOk {
			// add typing name to missing set so we won't process it again
			ti.missingTypingsSet.Store(typingKey, true)
			logger.Log("ATA:: " + renderPackageNameValidationFailure(typing, validationResult, name, isScopeName))
			continue
		}
		typesRegistryEntry, ok := ti.typesRegistry[typingKey]
		if !ok {
			logger.Log(fmt.Sprintf("ATA:: '%s':: Entry for package '%s' does not exist in local types registry - skipping...", typing, typingKey))
			continue
		}
		if typingLocation, ok := ti.packageNameToTypingLocation.Load(typingKey); ok && isTypingUpToDate(typingLocation, typesRegistryEntry) {
			logger.Log(fmt.Sprintf("ATA:: '%s':: '%s' already has an up-to-date typing - skipping...", typing, typingKey))
			continue
		}
		result = append(result, typingKey)
	}
	return result
}

func (ti *TypingsInstaller) init(projectID string, fs vfs.FS, logger logging.Logger) {
	ti.initOnce.Do(func() {
		logger.Log("ATA:: Global cache location '" + ti.typingsLocation + "'") //, safe file path '" + safeListPath + "', types map path '" + typesMapLocation + "`")
		ti.processCacheLocation(projectID, fs, logger)

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

		ti.ensureTypingsLocationExists(fs, logger)
		logger.Log("ATA:: Updating types-registry@latest npm package...")
		if _, err := ti.host.NpmInstall(ti.typingsLocation, []string{"install", "--ignore-scripts", "types-registry@latest"}); err == nil {
			logger.Log("ATA:: Updated types-registry npm package")
		} else {
			logger.Log(fmt.Sprintf("ATA:: Error updating types-registry package: %v", err))
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

		ti.typesRegistry = ti.loadTypesRegistryFile(fs, logger)
	})
}

type npmConfig struct {
	DevDependencies map[string]any `json:"devDependencies"`
}

type npmDependecyEntry struct {
	Version string `json:"version"`
}
type npmLock struct {
	Dependencies map[string]npmDependecyEntry `json:"dependencies"`
	Packages     map[string]npmDependecyEntry `json:"packages"`
}

func (ti *TypingsInstaller) processCacheLocation(projectID string, fs vfs.FS, logger logging.Logger) {
	logger.Log("ATA:: Processing cache location " + ti.typingsLocation)
	packageJson := tspath.CombinePaths(ti.typingsLocation, "package.json")
	packageLockJson := tspath.CombinePaths(ti.typingsLocation, "package-lock.json")
	logger.Log("ATA:: Trying to find '" + packageJson + "'...")
	if fs.FileExists(packageJson) && fs.FileExists((packageLockJson)) {
		var npmConfig npmConfig
		npmConfigContents := parseNpmConfigOrLock(fs, logger, packageJson, &npmConfig)
		var npmLock npmLock
		npmLockContents := parseNpmConfigOrLock(fs, logger, packageLockJson, &npmLock)

		logger.Log("ATA:: Loaded content of " + packageJson + ": " + npmConfigContents)
		logger.Log("ATA:: Loaded content of " + packageLockJson + ": " + npmLockContents)

		// !!! sheetal strada uses Node10
		resolver := module.NewResolver(ti.host, &core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext}, "", "")
		if npmConfig.DevDependencies != nil && (npmLock.Packages != nil || npmLock.Dependencies != nil) {
			for key := range npmConfig.DevDependencies {
				npmLockValue, npmLockValueExists := npmLock.Packages["node_modules/"+key]
				if !npmLockValueExists {
					npmLockValue, npmLockValueExists = npmLock.Dependencies[key]
				}
				if !npmLockValueExists {
					// if package in package.json but not package-lock.json, skip adding to cache so it is reinstalled on next use
					continue
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
					logger.Log("ATA:: New typing for package " + packageName + " from " + typingFile + " conflicts with existing typing file " + existingTypingFile.TypingsLocation)
				}
				logger.Log("ATA:: Adding entry into typings cache: " + packageName + " => " + typingFile)
				version := npmLockValue.Version
				if version == "" {
					continue
				}
				newVersion := semver.MustParse(version)
				newTyping := &CachedTyping{TypingsLocation: typingFile, Version: &newVersion}
				ti.packageNameToTypingLocation.Store(packageName, newTyping)
			}
		}
	}
	logger.Log("ATA:: Finished processing cache location " + ti.typingsLocation)
}

func parseNpmConfigOrLock[T npmConfig | npmLock](fs vfs.FS, logger logging.Logger, location string, config *T) string {
	contents, _ := fs.ReadFile(location)
	_ = json.Unmarshal([]byte(contents), config)
	return contents
}

func (ti *TypingsInstaller) ensureTypingsLocationExists(fs vfs.FS, logger logging.Logger) {
	npmConfigPath := tspath.CombinePaths(ti.typingsLocation, "package.json")
	logger.Log("ATA:: Npm config file: " + npmConfigPath)

	if !fs.FileExists(npmConfigPath) {
		logger.Log(fmt.Sprintf("ATA:: Npm config file: '%s' is missing, creating new one...", npmConfigPath))
		err := fs.WriteFile(npmConfigPath, "{ \"private\": true }", false)
		if err != nil {
			logger.Log(fmt.Sprintf("ATA:: Npm config file write failed: %v", err))
		}
	}
}

func (ti *TypingsInstaller) typingToFileName(resolver *module.Resolver, packageName string) string {
	result, _ := resolver.ResolveModuleName(packageName, tspath.CombinePaths(ti.typingsLocation, "index.d.ts"), core.ModuleKindNone, nil)
	return result.ResolvedFileName
}

func (ti *TypingsInstaller) loadTypesRegistryFile(fs vfs.FS, logger logging.Logger) map[string]map[string]string {
	typesRegistryFile := tspath.CombinePaths(ti.typingsLocation, "node_modules/types-registry/index.json")
	typesRegistryFileContents, ok := fs.ReadFile(typesRegistryFile)
	if ok {
		var entries map[string]map[string]map[string]string
		err := json.Unmarshal([]byte(typesRegistryFileContents), &entries)
		if err == nil {
			if typesRegistry, ok := entries["entries"]; ok {
				return typesRegistry
			}
		}
		logger.Log(fmt.Sprintf("ATA:: Error when loading types registry file '%s': %v", typesRegistryFile, err))
	} else {
		logger.Log(fmt.Sprintf("ATA:: Error reading types registry file '%s'", typesRegistryFile))
	}
	return map[string]map[string]string{}
}
