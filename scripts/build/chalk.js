// @ts-check

// this just fixes the incorrect types for chalk :/
const chalk = /**@type {import("chalk").Chalk}*/(require("chalk").default || require("chalk"));
module.exports = chalk;