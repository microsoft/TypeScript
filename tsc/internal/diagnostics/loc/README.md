# Localized diagnostics

Files in this directory are generated. Do not edit them directly.

To add or change an English diagnostic, edit `../diagnosticMessages.json` and
run the diagnostics generator. Translation updates are produced by the
localization pipeline and will overwrite manual changes to the localized JSON.

The readable `*.generated.json` files are the localized inputs used to produce
the corresponding `*.json.gz` runtime files. The generator removes stale
diagnostic translations, sorts the active keys, and compresses the normalized
JSON deterministically.
