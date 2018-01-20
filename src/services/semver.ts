/* @internal */
namespace ts {
    function stringToInt(str: string): number {
        const n = parseInt(str, 10);
        if (isNaN(n)) {
            throw new Error(`Error in parseInt(${JSON.stringify(str)})`);
        }
        return n;
    }

    const isPrereleaseRegex = /^(.*)-next.\d+/;
    const prereleaseSemverRegex = /^(\d+)\.(\d+)\.0-next.(\d+)$/;
    const semverRegex = /^(\d+)\.(\d+)\.(\d+)$/;

    export class Semver {
        static parse(semver: string): Semver {
            const isPrerelease = isPrereleaseRegex.test(semver);
            const result = Semver.tryParse(semver, isPrerelease);
            if (!result) {
                throw new Error(`Unexpected semver: ${semver} (isPrerelease: ${isPrerelease})`);
            }
            return result;
        }

        static fromRaw({ major, minor, patch, isPrerelease }: Semver): Semver {
            return new Semver(major, minor, patch, isPrerelease);
        }

        // This must parse the output of `versionString`.
        private static tryParse(semver: string, isPrerelease: boolean): Semver | undefined {
            // Per the semver spec <http://semver.org/#spec-item-2>:
            // "A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes."
            const rgx = isPrerelease ? prereleaseSemverRegex : semverRegex;
            const match = rgx.exec(semver);
            return match ? new Semver(stringToInt(match[1]), stringToInt(match[2]), stringToInt(match[3]), isPrerelease) : undefined;
        }

        private constructor(
            readonly major: number, readonly minor: number, readonly patch: number,
            /**
             * If true, this is `major.minor.0-next.patch`.
             * If false, this is `major.minor.patch`.
             */
            readonly isPrerelease: boolean) { }

        get versionString(): string {
            return this.isPrerelease ? `${this.major}.${this.minor}.0-next.${this.patch}` : `${this.major}.${this.minor}.${this.patch}`;
        }

        equals(sem: Semver): boolean {
            return this.major === sem.major && this.minor === sem.minor && this.patch === sem.patch && this.isPrerelease === sem.isPrerelease;
        }

        greaterThan(sem: Semver): boolean {
            return this.major > sem.major || this.major === sem.major
                && (this.minor > sem.minor || this.minor === sem.minor
                && (!this.isPrerelease && sem.isPrerelease || this.isPrerelease === sem.isPrerelease
                && this.patch > sem.patch));
        }
    }
}