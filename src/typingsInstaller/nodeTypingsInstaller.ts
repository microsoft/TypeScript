import { spawn } from "child_process";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import { setTimeout as nodeSetTimeout } from "timers";

import {
    combinePaths,
    createGetCanonicalFileName,
    getDirectoryPath,
    MapLike,
    normalizePath,
    normalizeSlashes,
    sys,
    toPath,
    version,
} from "../typescript/typescript.js";
import * as ts from "../typescript/typescript.js";

// Configuration interfaces
interface InstallerConfig {
    readonly throttleLimit: number;
    readonly registryPackageName: string;
    readonly cacheTimeoutMs: number;
    readonly maxRetries: number;
    readonly npmTimeoutMs: number;
    readonly maxCacheSize: number;
}

interface CommandResult {
    readonly success: boolean;
    readonly stdout: string;
    readonly stderr: string;
    readonly duration: number;
}

interface CacheEntry {
    readonly timestamp: number;
    readonly success: boolean;
    readonly version: string;
}

interface TypesRegistryFile {
    readonly entries: MapLike<MapLike<string>>;
}

interface InstallationMetrics {
    installationsAttempted: number;
    installationsSucceeded: number;
    totalInstallTime: number;
    registryUpdates: number;
    cacheHits: number;
}

// Custom error types
class RegistryError extends Error {
    constructor(
        message: string,
        public readonly filePath: string,
    ) {
        super(message);
        this.name = "RegistryError";
    }
}

/** Enhanced logger with structured logging support */
class StructuredFileLog implements ts.server.typingsInstaller.Log {
    private logFile: string | undefined;

    constructor(logFilePath?: string) {
        this.logFile = logFilePath || undefined;
    }

    isEnabled = (): boolean => this.logFile !== undefined;

    writeLine = (text: string): void => {
        if (!this.logFile) return;

        try {
            const timestamp = ts.server.nowString();
            const logEntry = `[${timestamp}] ${text}${sys.newLine}`;
            fsSync.appendFileSync(this.logFile, logEntry);
        } catch (error) {
            // Disable logging on error to prevent infinite loops
            this.logFile = undefined;
            console.error("Failed to write to log file:", error);
        }
    };

    logStructured(
        level: string,
        event: string,
        data: Record<string, unknown>,
    ): void {
        if (!this.isEnabled()) return;

        const logData = {
            timestamp: new Date().toISOString(),
            level,
            event,
            pid: process.pid,
            ...data,
        };

        this.writeLine(`STRUCTURED: ${JSON.stringify(logData)}`);
    }

    logMetrics(metrics: InstallationMetrics): void {
        this.logStructured("INFO", "metrics", {
            ...metrics,
            averageInstallTime:
                metrics.installationsAttempted > 0
                    ? metrics.totalInstallTime / metrics.installationsAttempted
                    : 0,
        });
    }
}

/** NPM client abstraction for better testability and error handling */
class NpmClient {
    private readonly config: InstallerConfig;
    private readonly log: StructuredFileLog;

    constructor(
        private readonly npmPath: string,
        config: InstallerConfig,
        log: StructuredFileLog,
    ) {
        this.config = config;
        this.log = log;
    }

    static create(
        processName: string,
        npmLocation: string | undefined,
        validateDefault: boolean,
        host: ts.server.InstallTypingHost,
        config: InstallerConfig,
        log: StructuredFileLog,
    ): NpmClient {
        const npmPath =
            npmLocation ||
            NpmClient.getDefaultNPMLocation(processName, validateDefault, host);
        const quotedPath =
            npmPath.includes(" ") && !npmPath.startsWith('"')
                ? `"${npmPath}"`
                : npmPath;

        return new NpmClient(quotedPath, config, log);
    }

    private static getDefaultNPMLocation(
        processName: string,
        validate: boolean,
        host: ts.server.InstallTypingHost,
    ): string {
        if (path.basename(processName).indexOf("node") === 0) {
            const npmPath = path.join(path.dirname(process.argv[0]), "npm");
            if (!validate || host.fileExists(npmPath)) {
                return npmPath;
            }
        }
        return "npm";
    }

    async install(packages: readonly string[], cwd: string): Promise<boolean> {
        const sanitizedPackages = packages.map((pkg) =>
            this.sanitizePackageName(pkg),
        );
        const command = [
            this.npmPath,
            "install",
            "--ignore-scripts",
            "--no-audit",
            "--no-fund",
            "--silent",
            ...sanitizedPackages,
        ];

        const result = await this.executeCommand(command, { cwd });
        return result.success;
    }

    async updatePackage(packageName: string, cwd: string): Promise<boolean> {
        const sanitizedName = this.sanitizePackageName(packageName);
        const command = [
            this.npmPath,
            "install",
            "--ignore-scripts",
            "--no-audit",
            "--no-fund",
            "--silent",
            `${sanitizedName}@latest`,
        ];

        const result = await this.executeCommand(command, { cwd });
        return result.success;
    }

    private sanitizePackageName(name: string): string {
        // Allow scoped packages (@scope/name) and regular packages
        // See: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name
        const validPattern =
            /^(?:@([a-z0-9-]+)\/)?[a-z0-9][a-z0-9.-]{0,213}$/;
        if (!validPattern.test(name)) {
            throw new Error(`Invalid package name: ${name}`);
        }

        return name;
    }

    private async executeCommand(
        command: readonly string[],
        options: { cwd: string },
    ): Promise<CommandResult> {
        const startTime = Date.now();
        const commandString = command.join(" ");

        this.log.logStructured("DEBUG", "npm_command_start", {
            command: commandString,
            cwd: options.cwd,
        });

        return new Promise<CommandResult>((resolve) => {
            const child = spawn(command[0], command.slice(1), {
                cwd: options.cwd,
                stdio: ["ignore", "pipe", "pipe"],
                timeout: this.config.npmTimeoutMs,
            });

            let stdout = "";
            let stderr = "";

            if (child.stdout) {
                child.stdout.on("data", (data: Buffer) => {
                    stdout += data.toString();
                });
            }

            if (child.stderr) {
                child.stderr.on("data", (data: Buffer) => {
                    stderr += data.toString();
                });
            }

            child.on("close", (code: number | undefined) => {
                const duration = Date.now() - startTime;
                const success = code === 0;

                const result: CommandResult = {
                    success,
                    stdout,
                    stderr,
                    duration,
                };

                this.log.logStructured(
                    success ? "DEBUG" : "ERROR",
                    "npm_command_complete",
                    {
                        command: commandString,
                        success,
                        duration,
                        code,
                        stdout: success ? stdout : undefined,
                        stderr: success ? undefined : stderr,
                    },
                );

                if (!success && code !== undefined) {
                    this.log.writeLine(`NPM command failed: ${commandString}`);
                    this.log.writeLine(`  Exit code: ${code}`);
                    this.log.writeLine(`  stderr: ${stderr}`);
                }

                resolve(result);
            });

            child.on("error", (error: Error) => {
                const duration = Date.now() - startTime;
                this.log.logStructured("ERROR", "npm_command_error", {
                    command: commandString,
                    error: error.message,
                    duration,
                });

                resolve({
                    success: false,
                    stdout,
                    stderr: error.message,
                    duration,
                });
            });
        });
    }
}

/** Types registry management with caching and error recovery */
class TypingsRegistry {
    private registry: Map<string, MapLike<string>> = new Map();
    private lastLoadTime = 0;

    constructor(
        private readonly config: InstallerConfig,
        private readonly log: StructuredFileLog,
    ) {}

    async load(
        filePath: string,
        host: ts.server.InstallTypingHost,
        maxAge: number = this.config.cacheTimeoutMs,
    ): Promise<Map<string, MapLike<string>>> {
        const now = Date.now();

        // Return cached registry if still valid
        if (this.registry.size > 0 && now - this.lastLoadTime < maxAge) {
            this.log.logStructured("DEBUG", "registry_cache_hit", { filePath });
            return this.registry;
        }

        try {
            this.registry = await this.loadFromFile(filePath, host);
            this.lastLoadTime = now;

            this.log.logStructured("INFO", "registry_loaded", {
                filePath,
                entriesCount: this.registry.size,
            });

            return this.registry;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            this.log.logStructured("ERROR", "registry_load_failed", {
                filePath,
                error: errorMessage,
            });

            // Return existing registry if available, otherwise empty
            return this.registry.size > 0 ? this.registry : new Map();
        }
    }

    private async loadFromFile(
        filePath: string,
        host: ts.server.InstallTypingHost,
    ): Promise<Map<string, MapLike<string>>> {
        if (!host.fileExists(filePath)) {
            throw new RegistryError(
                `Registry file does not exist: ${filePath}`,
                filePath,
            );
        }

        try {
            const content = host.readFile(filePath);
            if (!content) {
                throw new RegistryError(
                    `Failed to read registry file: ${filePath}`,
                    filePath,
                );
            }

            const parsed = JSON.parse(content) as TypesRegistryFile;

            if (!parsed.entries || typeof parsed.entries !== "object") {
                throw new RegistryError(
                    `Invalid registry file format: ${filePath}`,
                    filePath,
                );
            }

            return new Map(Object.entries(parsed.entries));
        } catch (error) {
            if (error instanceof RegistryError) {
                throw error;
            }

            const message =
                error instanceof Error
                    ? error.message
                    : "Unknown parsing error";
            throw new RegistryError(
                `Failed to parse registry file: ${message}`,
                filePath,
            );
        }
    }

    async update(
        globalCache: string,
        npmClient: NpmClient,
        packageName: string,
    ): Promise<void> {
        this.log.logStructured("INFO", "registry_update_start", {
            globalCache,
            packageName,
        });

        const success = await npmClient.updatePackage(packageName, globalCache);

        if (!success) {
            throw new Error(
                `Failed to update registry package: ${packageName}`,
            );
        }

        // Clear cache to force reload
        this.registry.clear();
        this.lastLoadTime = 0;

        this.log.logStructured("INFO", "registry_update_complete", {
            packageName,
        });
    }

    getPackageInfo(packageName: string): MapLike<string> | undefined {
        return this.registry.get(packageName);
    }
}

/** Installation cache with LRU eviction */
class InstallationCache {
    private readonly cache = new Map<string, CacheEntry>();
    private readonly accessOrder = new Set<string>();

    constructor(private readonly config: InstallerConfig) {}

    isRecentlyInstalled(packageName: string): boolean {
        const entry = this.cache.get(packageName);

        if (!entry) {
            return false;
        }

        const isExpired =
            Date.now() - entry.timestamp > this.config.cacheTimeoutMs;

        if (isExpired) {
            this.cache.delete(packageName);
            this.accessOrder.delete(packageName);
            return false;
        }

        // Update access order
        this.accessOrder.delete(packageName);
        this.accessOrder.add(packageName);

        return entry.success;
    }

    recordInstallation(
        packageName: string,
        success: boolean,
        version = "latest",
    ): void {
        // Ensure cache size limit
        if (this.cache.size >= this.config.maxCacheSize) {
            this.evictOldest();
        }

        const entry: CacheEntry = {
            timestamp: Date.now(),
            success,
            version,
        };

        this.cache.set(packageName, entry);
        this.accessOrder.delete(packageName);
        this.accessOrder.add(packageName);
    }

    private evictOldest(): void {
        const oldest = this.accessOrder.values().next().value;
        if (oldest) {
            this.cache.delete(oldest);
            this.accessOrder.delete(oldest);
        }
    }

    getCacheStats(): { size: number; maxSize: number } {
        return {
            size: this.cache.size,
            maxSize: this.config.maxCacheSize,
        };
    }

    clear(): void {
        this.cache.clear();
        this.accessOrder.clear();
    }
}

/** Main typings installer with improved architecture */
class NodeTypingsInstaller extends ts.server.typingsInstaller.TypingsInstaller {
    private readonly npmClient: NpmClient;
    private readonly typingsRegistryManager: TypingsRegistry;
    private readonly installationCache: InstallationCache;
    private readonly config: InstallerConfig;
    private readonly metrics: InstallationMetrics;
    private delayedInitializationError:
        | ts.server.InitializationFailedResponse
        | undefined = undefined;

    // Implement the abstract typesRegistry property from base class
    readonly typesRegistry: Map<string, MapLike<string>> = new Map();

    constructor(
        globalTypingsCache: string,
        log: StructuredFileLog,
        safeListLocation?: string,
        typesMapLocation?: string,
        npmLocation?: string,
        validateDefaultNpmLocation = true,
        config: Partial<InstallerConfig> = {},
    ) {
        const libDirectory = getDirectoryPath(
            normalizePath(sys.getExecutingFilePath()),
        );

        // Create canonical file name function
        const getCanonicalFileName = createGetCanonicalFileName(
            sys.useCaseSensitiveFileNames,
        );

        // Resolve paths
        const resolvedSafeListLocation = safeListLocation
            ? toPath(safeListLocation, "", getCanonicalFileName)
            : toPath("typingSafeList.json", libDirectory, getCanonicalFileName);

        const resolvedTypesMapLocation = typesMapLocation
            ? toPath(typesMapLocation, "", getCanonicalFileName)
            : toPath("typesMap.json", libDirectory, getCanonicalFileName);

        // Initialize with validated config
        const validatedConfig = NodeTypingsInstaller.validateConfig(config);

        super(
            sys,
            globalTypingsCache,
            resolvedSafeListLocation,
            resolvedTypesMapLocation,
            validatedConfig.throttleLimit,
            log,
        );

        this.config = validatedConfig;
        this.metrics = {
            installationsAttempted: 0,
            installationsSucceeded: 0,
            totalInstallTime: 0,
            registryUpdates: 0,
            cacheHits: 0,
        };

        // Initialize components
        this.npmClient = NpmClient.create(
            process.argv[0],
            npmLocation,
            validateDefaultNpmLocation,
            this.installTypingHost,
            this.config,
            log,
        );

        this.typingsRegistryManager = new TypingsRegistry(this.config, log);
        this.installationCache = new InstallationCache(this.config);

        // Log initialization
        if (log.isEnabled()) {
            log.logStructured("INFO", "installer_initialized", {
                pid: process.pid,
                globalCache: globalTypingsCache,
                config: this.config,
                validateDefaultNpm: validateDefaultNpmLocation,
            });
        }

        // Initialize asynchronously
        this.initializeAsync(globalTypingsCache, log).catch((error) => {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown initialization error";
            const errorStack = error instanceof Error ? error.stack : undefined;

            log.logStructured("ERROR", "initialization_failed", {
                error: errorMessage,
                stack: errorStack,
            });

            this.delayedInitializationError = {
                kind: "event::initializationFailed",
                message: errorMessage,
                stack: errorStack,
            };
        });
    }

    private static validateConfig(
        partial: Partial<InstallerConfig>,
    ): InstallerConfig {
        return {
            throttleLimit: Math.max(
                1,
                Math.min(20, partial.throttleLimit ?? 5),
            ),
            registryPackageName:
                partial.registryPackageName ?? "types-registry",
            cacheTimeoutMs: Math.max(
                60000,
                partial.cacheTimeoutMs ?? 24 * 60 * 60 * 1000,
            ), // min 1 minute
            maxRetries: Math.max(1, Math.min(5, partial.maxRetries ?? 3)),
            npmTimeoutMs: Math.max(
                30000,
                partial.npmTimeoutMs ?? 5 * 60 * 1000,
            ), // min 30 seconds
            maxCacheSize: Math.max(
                100,
                Math.min(10000, partial.maxCacheSize ?? 1000),
            ),
        };
    }

    private async initializeAsync(
        globalTypingsCache: string,
        log: StructuredFileLog,
    ): Promise<void> {
        // Ensure package directory exists
        await this.createDirectoryIfNotExists(globalTypingsCache);

        // Update types registry
        await this.retryOperation(
            () =>
                this.typingsRegistryManager.update(
                    globalTypingsCache,
                    this.npmClient,
                    this.config.registryPackageName,
                ),
            this.config.maxRetries,
        );

        this.metrics.registryUpdates++;

        // Load registry
        const registryPath =
            this.getTypesRegistryFileLocation(globalTypingsCache);
        const loadedRegistry = await this.typingsRegistryManager.load(
            registryPath,
            this.installTypingHost,
        );

        // Update the base class typesRegistry property
        this.typesRegistry.clear();
        loadedRegistry.forEach((value, key) => {
            this.typesRegistry.set(key, value);
        });

        log.logStructured("INFO", "initialization_complete", {
            registryPackage: this.config.registryPackageName,
        });
    }

    private async createDirectoryIfNotExists(dirPath: string): Promise<void> {
        try {
            await fs.access(dirPath);
        } catch {
            await fs.mkdir(dirPath, { recursive: true });
        }
    }

    private async retryOperation<T>(
        operation: () => Promise<T>,
        maxRetries: number,
        delay = 1000,
    ): Promise<T> {
        let lastError: Error | undefined;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError =
                    error instanceof Error ? error : new Error("Unknown error");

                if (attempt === maxRetries) {
                    break;
                }

                // Exponential backoff
                const backoffDelay = delay * Math.pow(2, attempt - 1);
                await new Promise<void>((resolve) => {
                    const timeoutId = nodeSetTimeout(() => {
                        resolve();
                    }, backoffDelay);
                    timeoutId.unref?.();
                });

                if (this.log.isEnabled()) {
                    (this.log as StructuredFileLog).logStructured(
                        "WARN",
                        "operation_retry",
                        {
                            attempt,
                            maxRetries,
                            error: lastError.message,
                            nextDelay: backoffDelay,
                        },
                    );
                }
            }
        }

        throw lastError || new Error("Operation failed after retries");
    }

    private getTypesRegistryFileLocation(globalCache: string): string {
        return combinePaths(
            normalizeSlashes(globalCache),
            `node_modules/${this.config.registryPackageName}/index.json`,
        );
    }

    override handleRequest(req: ts.server.TypingInstallerRequestUnion): void {
        // Handle delayed initialization error
        if (this.delayedInitializationError) {
            this.sendResponse(this.delayedInitializationError);
            this.delayedInitializationError = undefined;
            return;
        }

        // Log metrics periodically
        if (
            this.metrics.installationsAttempted % 10 === 0 &&
            this.log.isEnabled()
        ) {
            (this.log as StructuredFileLog).logMetrics(this.metrics);
        }

        super.handleRequest(req);
    }

    override sendResponse(
        response: ts.server.TypingInstallerResponseUnion,
    ): void {
        if (this.log.isEnabled()) {
            (this.log as StructuredFileLog).logStructured(
                "DEBUG",
                "response_sent",
                {
                    responseKind: response.kind,
                },
            );
        }

        if (process.send) {
            process.send(response);
        }
    }

    override installWorker(
        requestId: number,
        packageNames: string[],
        cwd: string,
        onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction,
    ): void {
        this.installWorkerAsync(
            requestId,
            packageNames,
            cwd,
            onRequestCompleted,
        ).catch((error) => {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown installation error";

            if (this.log.isEnabled()) {
                (this.log as StructuredFileLog).logStructured(
                    "ERROR",
                    "install_worker_error",
                    {
                        requestId,
                        packages: packageNames,
                        error: errorMessage,
                    },
                );
            }

            onRequestCompleted(/*success*/ false);
        });
    }

    private async installWorkerAsync(
        requestId: number,
        packageNames: string[],
        cwd: string,
        onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction,
    ): Promise<void> {
        const startTime = Date.now();
        this.metrics.installationsAttempted++;

        if (this.log.isEnabled()) {
            (this.log as StructuredFileLog).logStructured(
                "INFO",
                "install_start",
                {
                    requestId,
                    packages: packageNames,
                    cwd,
                },
            );
        }

        try {
            // Filter packages that are already successfully installed
            const packagesToInstall = packageNames.filter((pkg) => {
                const isCached =
                    this.installationCache.isRecentlyInstalled(pkg);
                if (isCached) {
                    this.metrics.cacheHits++;
                }
                return !isCached;
            });

            if (packagesToInstall.length === 0) {
                if (this.log.isEnabled()) {
                    (this.log as StructuredFileLog).logStructured(
                        "INFO",
                        "install_cache_hit",
                        {
                            requestId,
                            packages: packageNames,
                        },
                    );
                }
                onRequestCompleted(/*success*/ true);
                return;
            }

            // Perform installation with retry logic
            const success = await this.retryOperation(
                () => this.npmClient.install(packagesToInstall, cwd),
                this.config.maxRetries,
            );

            // Update cache for all packages
            for (const pkg of packagesToInstall) {
                this.installationCache.recordInstallation(pkg, success);
            }

            const duration = Date.now() - startTime;
            this.metrics.totalInstallTime += duration;

            if (success) {
                this.metrics.installationsSucceeded++;
            }

            if (this.log.isEnabled()) {
                (this.log as StructuredFileLog).logStructured(
                    "INFO",
                    "install_complete",
                    {
                        requestId,
                        packages: packagesToInstall,
                        success,
                        duration,
                        cacheStats: this.installationCache.getCacheStats(),
                    },
                );
            }

            onRequestCompleted(/*success*/ success);
        } catch (error) {
            const duration = Date.now() - startTime;
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            // Record failure in cache
            for (const pkg of packageNames) {
                this.installationCache.recordInstallation(
                    pkg,
                    /*success*/ false,
                );
            }

            if (this.log.isEnabled()) {
                (this.log as StructuredFileLog).logStructured(
                    "ERROR",
                    "install_failed",
                    {
                        requestId,
                        packages: packageNames,
                        error: errorMessage,
                        duration,
                    },
                );
            }

            onRequestCompleted(/*success*/ false);
        }
    }

    // Cleanup method for proper resource management
    cleanup(): void {
        this.installationCache.clear();

        if (this.log.isEnabled()) {
            (this.log as StructuredFileLog).logStructured(
                "INFO",
                "installer_cleanup",
                {
                    finalMetrics: this.metrics,
                },
            );
        }
    }
}

// Process setup and message handling
function createInstaller(
    globalCache: string,
    log: StructuredFileLog,
    safeListLoc?: string,
    typesMapLoc?: string,
    npmLocation?: string,
    validateNpm = true,
): NodeTypingsInstaller {
    return new NodeTypingsInstaller(
        globalCache,
        log,
        safeListLoc,
        typesMapLoc,
        npmLocation,
        validateNpm,
        {
            throttleLimit: 5,
            registryPackageName: "types-registry",
            cacheTimeoutMs: 24 * 60 * 60 * 1000, // 24 hours
            maxRetries: 3,
            npmTimeoutMs: 5 * 60 * 1000, // 5 minutes
            maxCacheSize: 1000,
        },
    );
}

// Initialize from command line arguments
const logFilePath = ts.server.findArgument(ts.server.Arguments.LogFile);
const globalCache = ts.server.findArgument(
    ts.server.Arguments.GlobalCacheLocation,
);
const safeListLoc = ts.server.findArgument(
    ts.server.Arguments.TypingSafeListLocation,
);
const typesMapLoc = ts.server.findArgument(
    ts.server.Arguments.TypesMapLocation,
);
const npmLocation = ts.server.findArgument(ts.server.Arguments.NpmLocation);
const validateNpm = ts.server.hasArgument(
    ts.server.Arguments.ValidateDefaultNpmLocation,
);

const log = new StructuredFileLog(logFilePath);

// Handle uncaught exceptions
if (log.isEnabled()) {
    process.on("uncaughtException", (error: Error) => {
        log.logStructured("FATAL", "uncaught_exception", {
            error: error.message,
            stack: error.stack,
        });
        process.exit(1);
    });

    process.on("unhandledRejection", (reason: unknown) => {
        const errorMessage =
            reason instanceof Error ? reason.message : String(reason);
        const errorStack = reason instanceof Error ? reason.stack : undefined;

        log.logStructured("FATAL", "unhandled_rejection", {
            error: errorMessage,
            stack: errorStack,
        });
        process.exit(1);
    });
}

// Handle parent process disconnect
process.on("disconnect", () => {
    if (log.isEnabled()) {
        log.logStructured("INFO", "parent_disconnect", {
            message: "Parent process disconnected, shutting down",
        });
    }
    process.exit(0);
});

// Handle process termination signals
process.on("SIGTERM", () => {
    if (log.isEnabled()) {
        log.logStructured("INFO", "sigterm_received", {
            message: "SIGTERM received, shutting down gracefully",
        });
    }
    process.exit(0);
});

// Main message handler
let installer: NodeTypingsInstaller | undefined;

process.on("message", (req: ts.server.TypingInstallerRequestUnion) => {
    try {
        if (!installer) {
            if (!globalCache) {
                throw new Error("Global cache location is required");
            }

            installer = createInstaller(
                globalCache,
                log,
                safeListLoc,
                typesMapLoc,
                npmLocation,
                validateNpm,
            );
        }

        installer.handleRequest(req);
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Unknown message handling error";

        if (log.isEnabled()) {
            log.logStructured("ERROR", "message_handler_error", {
                error: errorMessage,
                request: req,
            });
        }

        // Send error response
        if (process.send) {
            process.send({
                kind: "event::initializationFailed",
                message: errorMessage,
                stack: error instanceof Error ? error.stack : undefined,
            });
        }
    }
});

// Graceful shutdown handler
process.on("exit", () => {
    if (installer) {
        installer.cleanup();
    }
});
