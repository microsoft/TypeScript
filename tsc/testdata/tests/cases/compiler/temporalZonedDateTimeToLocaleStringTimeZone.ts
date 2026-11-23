// @target: esnext
// @lib: esnext
// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64227

declare const zdt: Temporal.ZonedDateTime;

// Error: ZonedDateTime always formats in its own time zone
zdt.toLocaleString(undefined, { timeZone: "Europe/Berlin" });
zdt.toLocaleString("de-DE", { timeZone: "Pacific/Auckland", weekday: "long" });

// OK
zdt.toLocaleString();
zdt.toLocaleString("en-US", { month: "long", timeZoneName: "short" });
zdt.withTimeZone("Europe/Berlin").toLocaleString("de-DE", { dateStyle: "full", timeStyle: "long" });

declare const options: Intl.DateTimeFormatOptions;
zdt.toLocaleString("en-US", options);

// OK: other Temporal types still accept a timeZone option
declare const instant: Temporal.Instant;
instant.toLocaleString("en-US", { timeZone: "Europe/Berlin" });
declare const plainDateTime: Temporal.PlainDateTime;
plainDateTime.toLocaleString("en-US", { timeZone: "Europe/Berlin" });
