export async function selectWebModuleExtensionUri<T>(
    builtinUri: T,
    nightlyUri: T | undefined,
    hasWasmPayload: (uri: T) => Promise<boolean>,
): Promise<T> {
    return nightlyUri && await hasWasmPayload(nightlyUri) ? nightlyUri : builtinUri;
}
