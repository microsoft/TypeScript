export const useWorkspaceTsdkStorageKey = "typescript.native-preview.useWorkspaceTsdk";
export const suppressPromptWorkspaceTsdkStorageKey = "typescript.native-preview.suppressPromptWorkspaceTsdk";

export function shouldUseWorkspaceTsdk(isTrusted: boolean, preference: boolean | undefined, promptSuppressed: boolean): boolean {
    return isTrusted && (preference ?? !promptSuppressed);
}
