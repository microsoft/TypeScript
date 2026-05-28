/// <reference lib="esnext.temporal" />

interface Date {
    /**
     * Converts a Date object to a Temporal.Instant object.
     * @returns A Temporal.Instant representing the same instant as this Date.
     */
    toTemporalInstant(): Temporal.Instant;
}
