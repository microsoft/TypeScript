const numericIdentifier = String.raw`(?:0|[1-9]\d*)`;
const nonNumericIdentifier = String.raw`(?:\d*[A-Za-z-][0-9A-Za-z-]*)`;
const prereleaseIdentifier = String.raw`(?:${numericIdentifier}|${nonNumericIdentifier})`;
const prerelease = String.raw`${prereleaseIdentifier}(?:\.${prereleaseIdentifier})*`;
const build = String.raw`[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*`;
const semverPattern = new RegExp(
    String.raw`^(${numericIdentifier})\.(${numericIdentifier})\.(${numericIdentifier})(?:-${prerelease})?(?:\+${build})?$`,
);
const maxUint32 = 0xffff_ffffn;

/**
 * @param {string} value
 */
export function isSemVer(value) {
    const match = semverPattern.exec(value);
    return match !== null && match.slice(1, 4).every(component => BigInt(component) <= maxUint32);
}
