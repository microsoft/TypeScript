//// [tests/cases/compiler/mediaTrackPanTiltZoom.ts] ////

//// [mediaTrackPanTiltZoom.ts]
declare const capabilities: MediaTrackCapabilities;
declare const constraints: MediaTrackConstraintSet;
declare const settings: MediaTrackSettings;
declare const supported: MediaTrackSupportedConstraints;

capabilities.pan;
capabilities.tilt;
capabilities.zoom;

constraints.pan;
constraints.tilt;
constraints.zoom;

settings.pan;
settings.tilt;
settings.zoom;

supported.pan;
supported.tilt;
supported.zoom;


//// [mediaTrackPanTiltZoom.js]
"use strict";
capabilities.pan;
capabilities.tilt;
capabilities.zoom;
constraints.pan;
constraints.tilt;
constraints.zoom;
settings.pan;
settings.tilt;
settings.zoom;
supported.pan;
supported.tilt;
supported.zoom;
