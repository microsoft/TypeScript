// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60979

export interface FilesCleanupCliFlags {
  readonly dryRun?: boolean;
  readonly outputPath?: string;
}

function checkCliFlags(
  flags: FilesCleanupCliFlags,
): flags is
  | { readonly dryRun: true; readonly outputPath: string }
  | { readonly dryRun?: false } {
  if (flags.dryRun && !flags.outputPath) {
    throw new Error(
      "The --outputPath option is required in dry-run mode and must specify the full file path.",
    );
  }
  return true;
}

function main() {
  const options: FilesCleanupCliFlags = {};

  if (checkCliFlags(options)) {
    const { dryRun, outputPath } = options;
  }
}

function checkCliFlagsWithAsserts(
  flags: FilesCleanupCliFlags,
): asserts flags is
  | { readonly dryRun: true; readonly outputPath: string }
  | { readonly dryRun?: false } {
  if (flags.dryRun && !flags.outputPath) {
    throw new Error(
      "The --outputPath option is required in dry-run mode and must specify the full file path.",
    );
  }
}

function mainWithAsserts() {
  const options: FilesCleanupCliFlags = {};

  checkCliFlagsWithAsserts(options);

  const { dryRun, outputPath } = options;
}
