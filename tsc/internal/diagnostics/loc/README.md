# Localized diagnostics

The `*.generated.json` files are readable localization handbacks produced by
OneLocBuild. They are checked in so translation changes can be reviewed and so
the runtime files can be reproduced without access to the localization service.

The `*.json.gz` files are derived runtime artifacts. Do not edit them directly.
The diagnostics generator:

1. Reads the checked-in JSON handbacks.
2. Discards translations for diagnostics no longer in the English catalog.
3. Sorts the remaining keys and writes canonical compact JSON.
4. Compresses that JSON deterministically.

`tools/pipelines/localization-update.yml` downloads the latest LCL handback
package, asks OneLocBuild to produce native JSON, regenerates the gzip files,
and opens or updates a localization pull request. LCL files are localization
service interchange data and are not checked into this repository.
