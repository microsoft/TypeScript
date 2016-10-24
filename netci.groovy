// Import the utility functionality.
import jobs.generation.Utilities;

// Defines a the new of the repo, used elsewhere in the file
def project = GithubProject
def branch = GithubBranchName

def nodeVersions = ['stable', '4']

nodeVersions.each { nodeVer ->

    def newJobName = "typescript_node.${nodeVer}"
    def newJob = job(Utilities.getFullJobName(project, newJobName, true)) {
        steps {
        	shell("./jenkins.sh ${nodeVer}")
        }
    }
    
    Utilities.standardJobSetup(newJob, project, true, "*/${branch}")
    Utilities.setMachineAffinity(newJob, 'Ubuntu', '20161020')
    Utilities.addGithubPRTriggerForBranch(newJob, branch, "TypeScript Test Run ${newJobName}")
}
