// @noImplicitExtensionName: true

// @Filename: fs/my_file.ts
export default 0

// @Filename: 1.ts
// Should both be okay.
// This check is not applied to non-relative import.
// e.g. Node's ESModule support https://nodejs.org/api/esm.html#esm_package_exports
import num from 'fs/my_file'
import num2 from 'fs/my_file.js'
num + num2
