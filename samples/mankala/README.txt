===== TypeScript Sample: Mankala =====

=== Overview ===

This sample implements the game logic for the Mankala board game.  The following
features of TypeScript are highlighted:
- Multi-file compilation:  The sample is compiled from several separate files
- SVG:  Geometry
- Class inheritance:  Rectangle and Square in geometry.ts
- Command line:  The game driver can be run as a command-line app using cscript


=== Running ===
tsc Driver.ts -out game.js	
cscript game.js

For web execution use play.htm.

