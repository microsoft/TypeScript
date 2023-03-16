import * as ts from "./_namespaces/ts";

export type IsNodeSourceFileCallback = (sourceFile: ts.SourceFile) => boolean;

let isNodeSourceFile: IsNodeSourceFileCallback = () => false;
let nodeBuiltInModuleNames = new Set<string>();
let nodeOnlyGlobalNames = new Set<ts.__String>();

export function setIsNodeSourceFileCallback(callback: IsNodeSourceFileCallback) {
  isNodeSourceFile = callback;
}

export function setNodeBuiltInModuleNames(names: readonly string[]) {
  nodeBuiltInModuleNames = new Set(names);
}

export function setNodeOnlyGlobalNames(names: readonly string[]) {
  nodeBuiltInModuleNames = new Set(names);
  nodeOnlyGlobalNames = new Set(names) as Set<ts.__String>;
}

// When upgrading:
// Inspect all usages of "globals" and "globalThisSymbol" in checker.ts
//  - Beware that `globalThisType` might refer to the global `this` type
//    and not the global `globalThis` type

export function createDenoForkContext({
  mergeSymbol,
  globals,
  nodeGlobals,
  ambientModuleSymbolRegex,
}: {
  mergeSymbol(target: ts.Symbol, source: ts.Symbol, unidirectional?: boolean): ts.Symbol;
  globals: ts.SymbolTable;
  nodeGlobals: ts.SymbolTable;
  ambientModuleSymbolRegex: RegExp,
}) {
  return {
    hasNodeSourceFile,
    getGlobalsForName,
    mergeGlobalSymbolTable,
    combinedGlobals: createNodeGlobalsSymbolTable(),
  };

  function hasNodeSourceFile(node: ts.Node | undefined) {
    if (!node) return false;
    const sourceFile = ts.getSourceFileOfNode(node);
    return isNodeSourceFile(sourceFile);
  }

  function getGlobalsForName(id: ts.__String) {
    // Node ambient modules are only accessible in the node code,
    // so put them on the node globals
    if (ambientModuleSymbolRegex.test(id as string)) {
      if ((id as string).startsWith('"node:')) {
        // check if it's a node specifier that we support
        const name = (id as string).slice(6, -1);
        if (nodeBuiltInModuleNames.has(name)) {
          return globals;
        }
      }
      return nodeGlobals;
    }
    return nodeOnlyGlobalNames.has(id) ? nodeGlobals : globals;
  }

  function mergeGlobalSymbolTable(node: ts.Node, source: ts.SymbolTable, unidirectional = false) {
    const sourceFile = ts.getSourceFileOfNode(node);
    const isNodeFile = hasNodeSourceFile(sourceFile);
    source.forEach((sourceSymbol, id) => {
      const target = isNodeFile ? getGlobalsForName(id) : globals;
      const targetSymbol = target.get(id);
      target.set(id, targetSymbol ? mergeSymbol(targetSymbol, sourceSymbol, unidirectional) : sourceSymbol);
    });
  }

  function createNodeGlobalsSymbolTable() {
    return new Proxy(globals, {
      get(target, prop: string | symbol, receiver) {
        if (prop === "get") {
          return (key: ts.__String) => {
            return nodeGlobals.get(key) ?? globals.get(key);
          };
        }
        else if (prop === "has") {
          return (key: ts.__String) => {
            return nodeGlobals.has(key) || globals.has(key);
          };
        }
        else if (prop === "size") {
          let i = 0;
          for (const _ignore of getEntries(entry => entry)) {
            i++;
          }
          return i;
        }
        else if (prop === "forEach") {
          return (action: (value: ts.Symbol, key: ts.__String) => void) => {
            for (const [key, value] of getEntries(entry => entry)) {
              action(value, key);
            }
          };
        }
        else if (prop === "entries") {
          return () => {
            return getEntries(kv => kv);
          };
        }
        else if (prop === "keys") {
          return () => {
            return getEntries(kv => kv[0]);
          };
        }
        else if (prop === "values") {
          return () => {
            return getEntries(kv => kv[1]);
          };
        }
        else if (prop === Symbol.iterator) {
          return () => {
            // Need to convert this to an array since typescript targets ES5
            // and providing back the iterator won't work here. I don't want
            // to change the target to ES6 because I'm not sure if that would
            // surface any issues.
            return Array.from(getEntries(kv => kv))[Symbol.iterator]();
          };
        }
        else {
          const value = (target as any)[prop];
          if (value instanceof Function) {
            return function (this: any, ...args: any[]) {
              return value.apply(this === receiver ? target : this, args);
            };
          }
          return value;
        }
      },
    });

    function* getEntries<R>(
      transform: (value: [ts.__String, ts.Symbol]) => R
    ) {
      const foundKeys = new Set<ts.__String>();
      // prefer the node globals over the deno globalThis
      for (const entries of [nodeGlobals.entries(), globals.entries()]) {
        for (const entry of entries) {
          if (!foundKeys.has(entry[0])) {
            yield transform(entry);
            foundKeys.add(entry[0]);
          }
        }
      }
    }
  }
}

export interface NpmPackageReference {
  name: string;
  versionReq: string;
  subPath: string | undefined;
}

export function tryParseNpmPackageReference(text: string) {
  try {
    return parseNpmPackageReference(text);
  }
  catch {
    return undefined;
  }
}

export function parseNpmPackageReference(text: string) {
  if (!text.startsWith("npm:")) {
    throw new Error(`Not an npm specifier: ${text}`);
  }
  text = text.replace(/^npm:\/?/, ""); // todo: remove this regex
  const parts = text.split("/");
  const namePartLen = text.startsWith("@") ? 2 : 1;
  if (parts.length < namePartLen) {
    throw new Error(`Not a valid package: ${text}`);
  }
  const nameParts = parts.slice(0, namePartLen);
  const lastNamePart = nameParts.at(-1)!;
  const lastAtIndex = lastNamePart.lastIndexOf("@");
  let versionReq: string | undefined;
  if (lastAtIndex > 0) {
    versionReq = lastNamePart.substring(lastAtIndex + 1);
    nameParts[nameParts.length - 1] = lastNamePart.substring(0, lastAtIndex);
  }
  const name = nameParts.join("/");
  if (name.length === 0) {
    throw new Error(`Npm specifier did not have a name: ${text}`);
  }
  return {
    name,
    versionReq,
    subPath: parts.length > nameParts.length ? parts.slice(nameParts.length).join("/") : undefined,
  };
}
