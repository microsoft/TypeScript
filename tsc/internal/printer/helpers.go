package printer

type Priority struct {
	Value int
}

type EmitHelper struct {
	Name         string                                          // A unique name for this helper.
	Scoped       bool                                            // Indicates whether the helper MUST be emitted in the current scope.
	Text         string                                          // ES3-compatible raw script text
	TextCallback func(makeUniqueName func(string) string) string // A function yielding an ES3-compatible raw script text.
	Priority     *Priority                                       // Helpers with a higher priority are emitted earlier than other helpers on the node.
	Dependencies []*EmitHelper                                   // Emit helpers this helper depends on
	ImportName   string                                          // The name of the helper to use when importing via `--importHelpers`.
}

var importDefaultHelper = &EmitHelper{
	Name:       "typescript:commonjsimportdefault",
	ImportName: "__importDefault",
	Scoped:     false,
	Text: `var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};`,
}

var createBindingHelper = &EmitHelper{
	Name:       "typescript:commonjscreatebinding",
	ImportName: "__createBinding",
	Scoped:     false,
	Priority:   &Priority{1},
	Text: `var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));`,
}

var exportStarHelper = &EmitHelper{
	Name:         "typescript:export-star",
	ImportName:   "__exportStar",
	Scoped:       false,
	Dependencies: []*EmitHelper{createBindingHelper},
	Priority:     &Priority{2},
	Text: `var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};`,
}

var setModuleDefaultHelper = &EmitHelper{
	Name:       "typescript:commonjscreatevalue",
	ImportName: "__setModuleDefault",
	Scoped:     false,
	Priority:   &Priority{1},
	Text: `var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});`,
}

var importStarHelper = &EmitHelper{
	Name:         "typescript:commonjsimportstar",
	ImportName:   "__importStar",
	Scoped:       false,
	Dependencies: []*EmitHelper{createBindingHelper, setModuleDefaultHelper},
	Priority:     &Priority{2},
	Text: `var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};`,
}

var rewriteRelativeImportExtensionsHelper = &EmitHelper{
	Name:       "typescript:rewriteRelativeImportExtensions",
	ImportName: "__rewriteRelativeImportExtension",
	Scoped:     false,
	Text: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};`,
}
