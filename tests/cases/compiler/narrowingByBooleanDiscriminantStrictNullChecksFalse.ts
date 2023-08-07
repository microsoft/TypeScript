// @strictNullChecks: false

// https://github.com/microsoft/TypeScript/issues/10564

type Result = { success: true } | { success: false; error: string };

function handleError3(res: Result) {
  if (res.success) {
    return;
  }

  res.error;
}
