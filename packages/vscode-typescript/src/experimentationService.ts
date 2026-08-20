import * as vscode from "vscode";
import * as tas from "vscode-tas-client";

interface ExperimentTypes {
    // Experiment variables go here.
    suggestNativePreview: boolean;
}

export class ExperimentationService {
    private readonly _experimentationService: tas.IExperimentationService;
    private readonly _telemetryReporter: tas.IExperimentationTelemetry;

    constructor(telemetryReporter: tas.IExperimentationTelemetry, id: string, version: string, globalState: vscode.Memento) {
        this._telemetryReporter = telemetryReporter;
        this._experimentationService = createTasExperimentationService(this._telemetryReporter, id, version, globalState);
    }

    public async getTreatmentVariable<K extends keyof ExperimentTypes>(name: K, defaultValue: ExperimentTypes[K]): Promise<ExperimentTypes[K]> {
        const experimentationService = this._experimentationService;
        try {
            const treatmentVariable = await experimentationService.getTreatmentVariableAsync("vscode", name, /*checkCache*/ true) as ExperimentTypes[K];
            return treatmentVariable ?? defaultValue;
        }
        catch {
            return defaultValue;
        }
    }
}

function createTasExperimentationService(
    reporter: tas.IExperimentationTelemetry,
    id: string,
    version: string,
    globalState: vscode.Memento,
): tas.IExperimentationService {
    let targetPopulation: tas.TargetPopulation;
    switch (vscode.env.uriScheme) {
        case "vscode":
            targetPopulation = tas.TargetPopulation.Public;
            break;
        case "vscode-insiders":
            targetPopulation = tas.TargetPopulation.Insiders;
            break;
        case "vscode-exploration":
            targetPopulation = tas.TargetPopulation.Internal;
            break;
        case "code-oss":
            targetPopulation = tas.TargetPopulation.Team;
            break;
        default:
            targetPopulation = tas.TargetPopulation.Public;
            break;
    }

    const experimentationService = tas.getExperimentationService(id, version, targetPopulation, reporter, globalState);
    return experimentationService;
}
