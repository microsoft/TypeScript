import { IOptions, RuleSeverity } from "./language/rule/rule";
export interface IConfigurationFile {
    /**
     * @deprecated property is never set
     *
     * The severity that is applied to rules in this config file as well as rules
     * in any inherited config files which have their severity set to "default".
     * Not inherited.
     */
    defaultSeverity?: RuleSeverity;
    /**
     * An array of config files whose rules are inherited by this config file.
     */
    extends: string[];
    /**
     * Rules that are used to lint to JavaScript files.
     */
    jsRules: Map<string, Partial<IOptions>>;
    /**
     * A subset of the CLI options.
     */
    linterOptions?: Partial<{
        exclude: string[];
    }>;
    /**
     * Directories containing custom rules. Resolved using node module semantics.
     */
    rulesDirectory: string[];
    /**
     * Rules that are used to lint TypeScript files.
     */
    rules: Map<string, Partial<IOptions>>;
}
export interface IConfigurationLoadResult {
    path?: string;
    results?: IConfigurationFile;
}
export declare const JSON_CONFIG_FILENAME = "tslint.json";
/** @deprecated use `JSON_CONFIG_FILENAME` or `CONFIG_FILENAMES` instead. */
export declare const CONFIG_FILENAME = "tslint.json";
export declare const CONFIG_FILENAMES: string[];
export declare const DEFAULT_CONFIG: IConfigurationFile;
export declare const EMPTY_CONFIG: IConfigurationFile;
/**
 * Searches for a TSLint configuration and returns the data from the config.
 * @param configFile A path to a config file, this can be null if the location of a config is not known
 * @param inputFilePath A path containing the current file being linted. This is the starting location
 * of the search for a configuration.
 * @returns Load status for a TSLint configuration object
 */
export declare function findConfiguration(configFile: string | null, inputFilePath: string): IConfigurationLoadResult;
export declare function findConfiguration(configFile: string, inputFilePath?: string): IConfigurationLoadResult;
/**
 * Searches for a TSLint configuration and returns the path to it.
 * Could return undefined if not configuration is found.
 * @param suppliedConfigFilePath A path to an known config file supplied by a user. Pass null here if
 * the location of the config file is not known and you want to search for one.
 * @param inputFilePath A path to the current file being linted. This is the starting location
 * of the search for a configuration.
 * @returns An absolute path to a tslint.json or tslint.yml or tslint.yaml file
 * or undefined if neither can be found.
 */
export declare function findConfigurationPath(suppliedConfigFilePath: string | null, inputFilePath: string): string | undefined;
export declare function findConfigurationPath(suppliedConfigFilePath: string, inputFilePath?: string): string | undefined;
/**
 * Used Node semantics to load a configuration file given configFilePath.
 * For example:
 * '/path/to/config' will be treated as an absolute path
 * './path/to/config' will be treated as a relative path
 * 'path/to/config' will attempt to load a to/config file inside a node module named path
 * @param configFilePath The configuration to load
 * @param originalFilePath (deprecated) The entry point configuration file
 * @returns a configuration object for TSLint loaded from the file at configFilePath
 */
export declare function loadConfigurationFromPath(configFilePath?: string, _originalFilePath?: string): IConfigurationFile;
/** Reads the configuration file from disk and parses it as raw JSON, YAML or JS depending on the extension. */
export declare function readConfigurationFile(filepath: string): RawConfigFile;
export declare function extendConfigurationFile(targetConfig: IConfigurationFile, nextConfigSource: IConfigurationFile): IConfigurationFile;
/**
 * returns the absolute path (contrary to what the name implies)
 *
 * @deprecated use `path.resolve` instead
 */
export declare function getRelativePath(directory?: string | null, relativeTo?: string): string | undefined;
export declare function useAsPath(directory: string): boolean;
/**
 * @param directories A path(s) to a directory of custom rules
 * @param relativeTo A path that directories provided are relative to.
 * For example, if the directories come from a tslint.json file, this path
 * should be the path to the tslint.json file.
 * @return An array of absolute paths to directories potentially containing rules
 */
export declare function getRulesDirectories(directories?: string | string[], relativeTo?: string): string[];
export interface RawConfigFile {
    extends?: string | string[];
    linterOptions?: IConfigurationFile["linterOptions"];
    rulesDirectory?: string | string[];
    defaultSeverity?: string;
    rules?: RawRulesConfig;
    jsRules?: RawRulesConfig;
}
export interface RawRulesConfig {
    [key: string]: RawRuleConfig;
}
export declare type RawRuleConfig = null | undefined | boolean | any[] | {
    severity?: RuleSeverity | "warn" | "none" | "default";
    options?: any;
};
/**
 * Parses a config file and normalizes legacy config settings.
 * If `configFileDir` and `readConfig` are provided, this function will load all base configs and reduce them to the final configuration.
 *
 * @param configFile The raw object read from the JSON of a config file
 * @param configFileDir The directory of the config file
 * @param readConfig Will be used to load all base configurations while parsing. The function is called with the resolved path.
 */
export declare function parseConfigFile(configFile: RawConfigFile, configFileDir?: string, readConfig?: (path: string) => RawConfigFile): IConfigurationFile;
/**
 * Fills in default values for `IOption` properties and outputs an array of `IOption`
 */
export declare function convertRuleOptions(ruleConfiguration: Map<string, Partial<IOptions>>): IOptions[];
