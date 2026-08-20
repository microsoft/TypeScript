# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

<#
.SYNOPSIS
    Installs Microsoft build of Go
.DESCRIPTION
    Installs the Microsoft build of Go toolset.

    Note that the intended use of this script is for Continuous Integration (CI) scenarios, where:
    - The toolset needs to be installed without user interaction and without admin rights.
    - The toolset installation doesn't need to persist across multiple CI runs.
    Visit https://github.com/microsoft/go for a list of other ways to install Microsoft build of Go.

.PARAMETER Version
    Default: Latest
    Download the specified version. Supports some aliases. Possible values:
    - Latest - the most recent major version.
    - Previous - the second most recent major version.
    - 2-part version in format go1.A - represents a specific major version.
          examples: go1.18, go1.23
    - 3-part version in format go1.A.B - latest revision of a specific release.
          examples: go1.18.0, go1.23.1
    - 4-part version in format go1.A.B-C - a specific revision of Microsoft build of Go, immutable.
          examples: go1.18.0-1, go1.23.1-3
    Microsoft build of Go doesn't publish prereleases, so they are not available.
.PARAMETER InstallDir
    Path to where to install Microsoft build of Go. Note that if a directory is given, GOROOT is placed
    directly in that directory.
    Default: <auto> - a folder automatically selected inside LocalApplicationData as evaluated by PowerShell.
    Example auto on Windows: C:\Users\myself\AppData\Local\microsoft-go\<version>
    Example auto on Linux: /home/myself/.local/share/microsoft-go/<version>
    If OS or Architecture are not <auto>, the path includes OS and Architecture. This avoids
    overlapping installations but still allows for a shorter path for ordinary situations.
.PARAMETER OS
    Default: <auto> - this value represents currently running OS
    Operating system of prebuilt toolset binaries to be installed.
    Possible values are: <auto>, windows, linux, darwin
.PARAMETER Architecture
    Default: <auto> - this value represents currently running OS architecture
    Architecture of prebuilt toolset binaries to be installed.
    Possible values are: <auto>, amd64, x64, 386, x86, arm64, arm
.PARAMETER DryRun
    If set, it will not perform installation. Instead, it displays what command line to use to
    consistently install currently requested version of Microsoft build of Go. For example, if you specify
    Version 'Latest', it will print a command with the specific 4-part version so this command can
    be used deterministicly in a build script.
    It also prints the location the binaries would have been installed to.
.PARAMETER NoPath
    By default, this script will update the environment variable PATH for the current process to
    include the binaries folder inside installation folder.
    If set, it will print the binaries location but not set any environment variable.
.PARAMETER AzurePipelinePath
    If set, it will print an Azure DevOps logging command that causes the Azure DevOps to update the
    PATH environment variable of subsequent build steps to include the binaries folder.
.PARAMETER GitHubActionsPath
    If set, it will append the binaries folder to the GITHUB_PATH environment file, causing GitHub Actions
    to update the PATH environment variable of subsequent build steps to include the binaries folder.
.PARAMETER ProxyAddress
    If set, it will use the proxy when making web requests
.PARAMETER ProxyUseDefaultCredentials
    Default: false
    Use default credentials when using ProxyAddress.
.PARAMETER ProxyBypassList
    If set, when using ProxyAddress, this comma separated url list is passed to the underlying
    HttpClientHandler.
.PARAMETER DownloadTimeout
    Determines timeout duration in seconds for downloading the toolset file.
    Default: 1200 seconds (20 minutes)
.PARAMETER KeepArchive
    If set, the downloaded file is kept.
.PARAMETER ArchivePath
    A path to use to store the toolset archive file, a zip or tar.gz.
    Default: a generated random filename in the system's temporary directory.
.PARAMETER Help
    Displays this help message.
.PARAMETER Verbose
    Displays diagnostics information.
.EXAMPLE
    go-install.ps1
    Installs the latest released Microsoft build of Go version.
.EXAMPLE
    go-install.ps1 -Version Previous
    Installs the latest version of the previous major (1.X) version of Microsoft build of Go.
#>
[cmdletbinding()]
param(
    [string]$Version="Latest",
    [Alias('i')][string]$InstallDir="<auto>",
    [string]$OS="<auto>",
    [string]$Architecture="<auto>",
    [switch]$DryRun,
    [switch]$NoPath,
    [switch]$AzurePipelinePath,
    [switch]$GitHubActionsPath,
    [string]$ProxyAddress,
    [switch]$ProxyUseDefaultCredentials,
    [string[]]$ProxyBypassList=@(),
    [int]$DownloadTimeout=1200,
    [switch]$KeepArchive,
    [string]$ArchivePath,
    [switch]$Help
)

Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"
$ProgressPreference="SilentlyContinue"

$MicrosoftGoInstallScriptVersion = "0.0.1"

function Say($str) {
    try {
        Write-Host "go-install: $str"
    }
    catch {
        # Some platforms cannot utilize Write-Host (Azure Functions, for instance). Fall back to Write-Output
        Write-Output "go-install: $str"
    }
}

function Say-Warning($str) {
    try {
        Write-Warning "go-install: $str"
    }
    catch {
        # Some platforms cannot utilize Write-Warning (Azure Functions, for instance). Fall back to Write-Output
        Write-Output "go-install: Warning: $str"
    }
}

# Writes a line with error style settings.
# Use this function to show a human-readable comment along with an exception.
function Say-Error($str) {
    try {
        # Write-Error is quite oververbose for the purpose of the function, let's write one line with error style settings.
        $Host.UI.WriteErrorLine("go-install: $str")
    }
    catch {
        Write-Output "go-install: Error: $str"
    }
}

function Say-Verbose($str) {
    try {
        Write-Verbose "go-install: $str"
    }
    catch {
        # Some platforms cannot utilize Write-Verbose (Azure Functions, for instance). Fall back to Write-Output
        Write-Output "go-install: $str"
    }
}

function Measure-Action($name, $block) {
    $time = Measure-Command $block
    $totalSeconds = $time.TotalSeconds
    Say-Verbose "⏱ Action '$name' took $totalSeconds seconds"
}

function Get-Remote-File-Size($zipUri) {
    try {
        $response = Invoke-WebRequest -Uri $zipUri -Method Head
        $fileSize = $response.Headers["Content-Length"]
        if ((![string]::IsNullOrEmpty($fileSize))) {
            Say "Remote file $zipUri size is $fileSize bytes."

            return $fileSize
        }
    }
    catch {
        Say-Verbose "Content-Length header was not extracted for $zipUri."
    }

    return $null
}

function Say-Invocation($Invocation) {
    $command = $Invocation.MyCommand;
    $args = (($Invocation.BoundParameters.Keys | foreach { "-$_ `"$($Invocation.BoundParameters[$_])`"" }) -join " ")
    Say-Verbose "$command $args"
}

function Invoke-With-Retry([ScriptBlock]$ScriptBlock, [System.Threading.CancellationToken]$cancellationToken = [System.Threading.CancellationToken]::None, [int]$MaxAttempts = 3, [int]$SecondsBetweenAttempts = 1) {
    $Attempts = 0
    $local:startTime = $(get-date)

    while ($true) {
        try {
            return & $ScriptBlock
        }
        catch {
            $Attempts++
            if (($Attempts -lt $MaxAttempts) -and -not $cancellationToken.IsCancellationRequested) {
                Start-Sleep $SecondsBetweenAttempts
            }
            else {
                $local:elapsedTime = $(get-date) - $local:startTime
                if (($local:elapsedTime.TotalSeconds - $DownloadTimeout) -gt 0 -and -not $cancellationToken.IsCancellationRequested) {
                    throw New-Object System.TimeoutException("Failed to reach the server: connection timeout: default timeout is $DownloadTimeout second(s)");
                }
                throw;
            }
        }
    }
}

function Get-Machine-Architecture() {
    Say-Invocation $MyInvocation

    # Try the .NET API. If we don't get anything, this is probably PowerShell on Windows.
    try {
        $Architecture = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
        if ($Architecture) {
            # Possible values: https://learn.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.architecture
            return $Architecture.ToString().ToLowerInvariant()
        }
    }
    catch {
        Say-Verbose "Failed to get the machine architecture using .NET API. Falling back to environment variables."
    }

    # On PS x86, PROCESSOR_ARCHITECTURE reports x86 even on x64 systems.
    # To get the correct architecture, we need to use PROCESSOR_ARCHITEW6432.
    # PS x64 doesn't define this, so we fall back to PROCESSOR_ARCHITECTURE.
    # Possible values: amd64, x64, x86, arm64, arm
    if( $ENV:PROCESSOR_ARCHITEW6432 -ne $null ) {
        return $ENV:PROCESSOR_ARCHITEW6432
    }

    return $ENV:PROCESSOR_ARCHITECTURE
}

function Get-CLIArchitecture-From-Architecture([string]$Architecture) {
    Say-Invocation $MyInvocation

    if ($Architecture -eq "<auto>") {
        $Architecture = Get-Machine-Architecture
    }

    switch ($Architecture.ToLowerInvariant()) {
        { ($_ -eq "amd64") -or ($_ -eq "x64") } { return "amd64" }
        { ($_ -eq "386") -or ($_ -eq "x86") } { return "386" }
        { $_ -eq "arm" } { return "armv6l" }
        { $_ -eq "arm64" } { return "arm64" }
        default { throw "Architecture '$Architecture' not supported. If you think this is a bug, report it at https://github.com/microsoft/go/issues" }
    }
}

function Get-CLIOS-From-OS([string]$OS) {
    Say-Invocation $MyInvocation

    if (!(Test-Path -LiteralPath 'variable:IsWindows')) {
        # If we don't have IsWindows, this is Windows PowerShell (powershell), not PowerShell Core (pwsh).
        # So, we can't use the variable, but we know we're on Windows.
        $IsWindows = $true
    }

    if ($OS -eq "<auto>") {
        if ($IsWindows -or [System.Environment]::OSVersion.Platform -eq [System.PlatformID]::Win32NT) {
            $OS = "windows"
        }
        elseif ($IsLinux) {
            $OS = "linux"
        }
        elseif ($IsMacOS) {
            $OS = "darwin"
        }
        else {
            throw "Unable to automatically determine the OS."
        }
    }

    switch ($OS.ToLowerInvariant()) {
        { $_ -eq "windows" } { return "windows" }
        { $_ -eq "linux" } { return "linux" }
        { $_ -eq "darwin" } { return "darwin" }
        default { throw "OS '$OS' not supported. If you think this is a bug, report it at https://github.com/microsoft/go/issues" }
    }
}

function Get-GeneratedArchivePath([string]$CLIOS) {
    Say-Invocation $MyInvocation

    $Extension = switch ($CLIOS) {
        "windows" { ".zip" }
        default { ".tar.gz" }
    }

    return [System.IO.Path]::combine([System.IO.Path]::GetTempPath(), [System.IO.Path]::GetRandomFileName()) + $Extension
}

function Fetch-SupportedVersion([string]$StableKey) {
    # Figure out what's latest by querying the list of release branches.
    $ReleaseBranchData = DownloadJson "https://aka.ms/golang/release/latest/release-branch-links.json"

    # Find first thing in the array of objects where the key by name is true.
    foreach ($branch in $ReleaseBranchData) {
        if (Get-OrNull $branch $StableKey) {
            return $branch.version
        }
    }

    throw "Failed to find a branch where '$StableKey' is true."
}

function Get-NormalizedVersion([string]$Version) {
    Say-Invocation $MyInvocation

    if ([string]::IsNullOrEmpty($Version)) {
        return ""
    }
    switch ($Version.ToLowerInvariant()) {
        { $_ -eq "latest" } { return Fetch-SupportedVersion -StableKey "latestStable" }
        { $_ -eq "previous" } { return Fetch-SupportedVersion -StableKey "previousStable" }
        { $_ -like "go1.*" } { return $_ }
        default { throw "Version '$Version' not recognized. Missing 'go' prefix? If you think this is a bug, report it at https://github.com/microsoft/go/issues" }
    }
}

function Load-Assembly([string] $Assembly) {
    try {
        Add-Type -Assembly $Assembly | Out-Null
    }
    catch {
        # On Nano Server, Powershell Core Edition is used. Add-Type is unable to resolve base class assemblies because they are not GAC'd.
        # Loading the base class assemblies is not unnecessary as the types will automatically get resolved.
    }
}

function GetHTTPResponse([Uri] $Uri, [bool]$HeaderOnly, [bool]$DisableRedirect)
{
    $cts = New-Object System.Threading.CancellationTokenSource

    $downloadScript = {

        $HttpClient = $null

        try {
            # HttpClient is used vs Invoke-WebRequest in order to support Nano Server which doesn't support the Invoke-WebRequest cmdlet.
            Load-Assembly -Assembly System.Net.Http

            if (-not $ProxyAddress) {
                try {
                    # Despite no proxy being explicitly specified, we may still be behind a default proxy
                    $DefaultProxy = [System.Net.WebRequest]::DefaultWebProxy;
                    if($DefaultProxy -and (-not $DefaultProxy.IsBypassed($Uri))) {
                        if ($null -ne $DefaultProxy.GetProxy($Uri)) {
                            $ProxyAddress = $DefaultProxy.GetProxy($Uri).OriginalString
                        } else {
                            $ProxyAddress = $null
                        }
                        $ProxyUseDefaultCredentials = $true
                    }
                }
                catch {
                    # Eat the exception and move forward as the above code is an attempt
                    #    at resolving the DefaultProxy that may not have been a problem.
                    $ProxyAddress = $null
                    Say-Verbose("Exception ignored: $_.Exception.Message - moving forward...")
                }
            }

            $HttpClientHandler = New-Object System.Net.Http.HttpClientHandler
            if ($ProxyAddress) {
                $HttpClientHandler.Proxy =  New-Object System.Net.WebProxy -Property @{
                    Address=$ProxyAddress;
                    UseDefaultCredentials=$ProxyUseDefaultCredentials;
                    BypassList = $ProxyBypassList;
                }
            }
            if ($DisableRedirect) {
                $HttpClientHandler.AllowAutoRedirect = $false
            }
            $HttpClient = New-Object System.Net.Http.HttpClient -ArgumentList $HttpClientHandler

            # Default timeout for HttpClient is 100s.  For a 50 MB download this assumes 500 KB/s average, any less will time out
            # Defaulting to 20 minutes allows it to work over much slower connections.
            $HttpClient.Timeout = New-TimeSpan -Seconds $DownloadTimeout

            if ($HeaderOnly){
                $completionOption = [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead
            }
            else {
                $completionOption = [System.Net.Http.HttpCompletionOption]::ResponseContentRead
            }

            $Task = $HttpClient.GetAsync("$Uri", $completionOption).ConfigureAwait("false");
            $Response = $Task.GetAwaiter().GetResult();

            if (($null -eq $Response) -or ((-not $HeaderOnly) -and (-not ($Response.IsSuccessStatusCode)))) {
                # The feed credential is potentially sensitive info. Do not log FeedCredential to console output.
                $DownloadException = [System.Exception] "Unable to download $Uri."

                if ($null -ne $Response) {
                    $DownloadException.Data["StatusCode"] = [int] $Response.StatusCode
                    $DownloadException.Data["ErrorMessage"] = "Unable to download $Uri. Returned HTTP status code: " + $DownloadException.Data["StatusCode"]

                    if (404 -eq [int] $Response.StatusCode) {
                        $cts.Cancel()
                    }
                }

                throw $DownloadException
            }

            return $Response
        }
        catch [System.Net.Http.HttpRequestException] {
            $DownloadException = [System.Exception] "Unable to download $Uri."

            # Pick up the exception message and inner exceptions' messages if they exist
            $CurrentException = $PSItem.Exception
            $ErrorMsg = $CurrentException.Message + "`r`n"
            while ($CurrentException.InnerException) {
                $CurrentException = $CurrentException.InnerException
                $ErrorMsg += $CurrentException.Message + "`r`n"
            }

            # Check if there is an issue concerning TLS.
            if ($ErrorMsg -like "*SSL/TLS*") {
                $ErrorMsg += "Ensure that TLS 1.2 or higher is enabled to use this script.`r`n"
            }

            $DownloadException.Data["ErrorMessage"] = $ErrorMsg
            throw $DownloadException
        }
        finally {
            if ($null -ne $HttpClient) {
                $HttpClient.Dispose()
            }
        }
    }

    try {
        return Invoke-With-Retry $downloadScript $cts.Token
    }
    finally {
        if ($null -ne $cts) {
            $cts.Dispose()
        }
    }
}

function Resolve-Installation-Path([string]$InstallDir) {
    Say-Invocation $MyInvocation

    if ($InstallDir -eq "<auto>") {
        $Dir = Join-Path -Path ([Environment]::GetFolderPath('LocalApplicationData')) -ChildPath "microsoft-go"
        if ($OS -ne "<auto>" -or $Architecture -ne "<auto>") {
            $Dir = Join-Path -Path $Dir -ChildPath "$($CLIOS)_$CLIArchitecture"
        }
        return $Dir
    }
    return $InstallDir
}

function Resolve-Versioned-Installation-Path([string]$InstallRoot, [string]$SpecificVersion) {
    Say-Invocation $MyInvocation

    return Join-Path -Path $InstallRoot -ChildPath "go$SpecificVersion"
}

function Is-ToolsetInstalled([string]$InstallRoot, [string]$SpecificVersion) {
    Say-Invocation $MyInvocation

    $GoToolsetPath = Resolve-Versioned-Installation-Path $InstallRoot $SpecificVersion
    $GoBinPath = (Join-Path $GoToolsetPath "bin")
    Say-Verbose "Is-ToolsetInstalled: GoToolsetPath=$GoToolsetPath"
    # A few basic checks to see if a likely usable toolset is installed.
    # If these fail, it will be reinstalled.
    return (Test-Path $GoToolsetPath -PathType Container) -and
        (
            (Test-Path (Join-Path $GoBinPath "go") -PathType Leaf) -or
            (Test-Path (Join-Path $GoBinPath "go.exe") -PathType Leaf)
        )
}

function Get-Absolute-Path([string]$RelativeOrAbsolutePath) {
    # Too much spam
    # Say-Invocation $MyInvocation

    return $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($RelativeOrAbsolutePath)
}

function Extract-Zip([string]$ArchivePath, [string]$OutPath) {
    Say-Invocation $MyInvocation

    Load-Assembly -Assembly System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($ArchivePath, $OutPath)
}

function Extract-TarGz([string]$ArchivePath, [string]$OutPath) {
    Say-Invocation $MyInvocation

    if (-not (Test-Path $OutPath)) {
        New-Item -ItemType Directory -Force -Path $OutPath
    }

    try {
        & tar -C $OutPath -xzf $ArchivePath
        if ($LASTEXITCODE -ne 0) {
            throw "tar exit code: $LASTEXITCODE"
        }
    }
    catch {
        throw "Failed to extract the tar.gz archive `"$ArchivePath`". Error: $_"
    }
}

function Extract-ToolsetArchive([string]$ArchivePath, [string]$InstallRoot, [string]$SpecificVersion) {
    Say-Invocation $MyInvocation

    $GoRootPath = Resolve-Versioned-Installation-Path $InstallRoot $SpecificVersion
    # First extract to a temporary directory to avoid partial extraction to the final location. This
    # makes it so rerunning the script fixes a problem in case of an interruption. Don't use
    # systemwide temp directory because Move-Item from there has been observed to fail on Linux.
    $TempGoExtractDir = Join-Path $InstallRoot ".tmp-extract"
    $TempGoRootPath = Resolve-Versioned-Installation-Path $TempGoExtractDir $SpecificVersion

    # Clean up directories from a previous attempt.
    if (Test-Path $GoRootPath) {
        Remove-Item $GoRootPath -Recurse -Force
    }
    if (Test-Path $TempGoExtractDir) {
        Remove-Item $TempGoExtractDir -Recurse -Force
    }
    if (Test-Path $TempGoRootPath) {
        Remove-Item $TempGoRootPath -Recurse -Force
    }

    try {
        switch ([System.IO.Path]::GetExtension($ArchivePath).ToLowerInvariant()) {
            ".zip" { Extract-Zip $ArchivePath $TempGoRootPath }
            ".gz" { Extract-TarGz $ArchivePath $TempGoRootPath }
            default { throw "Unsupported archive type: $ArchivePath" }
        }

        # Move contents of inner "go" dir to the output path to avoid unwanted extra dir.
        Move-Item (Join-Path $TempGoRootPath "go") $GoRootPath

        $GoRootPath = ""
    }
    finally {
        if ($GoRootPath -ne "" -and (Test-Path $GoRootPath)) {
            Remove-Item $GoRootPath -Recurse -Force
        }
        if (Test-Path $TempGoExtractDir) {
            Remove-Item $TempGoExtractDir -Recurse -Force
        }
        if (Test-Path $TempGoRootPath) {
            Remove-Item $TempGoRootPath -Recurse -Force
        }
    }
}

function DownloadJson([string]$Source) {
    $Text = DownloadString $Source

    try {
        return ConvertFrom-Json $Text
    }
    catch {
        Say-Verbose "Failed to parse the JSON response from '$Source': $Text"
        throw $_
    }
}

function DownloadString([string]$Source) {
    $Stream = $null
    $Reader = $null

    # To make sure errors are accurate and useful, attempt to get the target first. This prevents a
    # situation where we succesfully download bing.com after a failed redirect, try to parse the
    # HTML as JSON, and present a confusing error message.
    if ($Source -like "https://aka.ms/*") {
        $DirectSource = Get-AkaMSRedirectTarget $Source
        if (!$DirectSource) {
            throw "Failed to aka.ms redirect for URL: $Source"
        }
        $Source = $DirectSource
    }

    try {
        $Response = GetHTTPResponse -Uri $Source
        $Stream = $Response.Content.ReadAsStreamAsync().Result
        $Reader = New-Object System.IO.StreamReader($Stream)
        return $Reader.ReadToEnd()
    }
    finally {
        if ($null -ne $Stream) {
            $Stream.Dispose()
        }
        if ($null -ne $Reader) {
            $Reader.Dispose()
        }
    }
}

function DownloadFile($Source, [string]$OutPath) {
    if ($Source -notlike "http*") {
        #  Using System.IO.Path.GetFullPath to get the current directory
        #    does not work in this context - $pwd gives the current directory
        if (![System.IO.Path]::IsPathRooted($Source)) {
            $Source = $(Join-Path -Path $pwd -ChildPath $Source)
        }
        $Source = Get-Absolute-Path $Source
        Say "Copying file from $Source to $OutPath"
        Copy-Item $Source $OutPath
        return
    }

    $Stream = $null

    try {
        $Response = GetHTTPResponse -Uri $Source
        $Stream = $Response.Content.ReadAsStreamAsync().Result
        $File = [System.IO.File]::Create($OutPath)
        $Stream.CopyTo($File)
        $File.Close()

        ValidateRemoteLocalFileSizes -LocalFileOutPath $OutPath -SourceUri $Source
    }
    finally {
        if ($null -ne $Stream) {
            $Stream.Dispose()
        }
    }
}

function ValidateRemoteLocalFileSizes([string]$LocalFileOutPath, $SourceUri) {
    try {
        $remoteFileSize = Get-Remote-File-Size -zipUri $SourceUri
        $fileSize = [long](Get-Item $LocalFileOutPath).Length
        Say "Downloaded file $SourceUri size is $fileSize bytes."

        if ((![string]::IsNullOrEmpty($remoteFileSize)) -and !([string]::IsNullOrEmpty($fileSize)) ) {
            if ($remoteFileSize -ne $fileSize) {
                Say "The remote and local file sizes are not equal. Remote file size is $remoteFileSize bytes and local size is $fileSize bytes. The local package may be corrupted."
            }
            else {
                Say "The remote and local file sizes are equal."
            }
        }
        else {
            Say "Either downloaded or local package size can not be measured. One of them may be corrupted."
        }
    }
    catch {
        Say "Either downloaded or local package size can not be measured. One of them may be corrupted."
    }
}

function Remove-FileSafely($Path) {
    try {
        if (Test-Path $Path) {
            Remove-Item $Path
            Say-Verbose "The temporary file `"$Path`" was removed."
        }
        else {
            Say-Verbose "The temporary file `"$Path`" does not exist, therefore is not removed."
        }
    }
    catch {
        Say-Warning "Failed to remove the temporary file: `"$Path`", remove it manually."
    }
}

function Prepend-ToolsetPathEnv([string]$InstallRoot, [string]$SpecificVersion) {
    Say-Invocation $MyInvocation

    $GoRootPath = Resolve-Versioned-Installation-Path $InstallRoot $SpecificVersion
    $BinPath = Get-Absolute-Path (Join-Path -Path $GoRootPath -ChildPath "bin")

    if (-Not $NoPath) {
        $SuffixedBinPath = $BinPath + [System.IO.Path]::PathSeparator
        if (-Not $env:PATH.Contains($SuffixedBinPath)) {
            Say "Adding to current process PATH: $BinPath"
            Say "Note: This change will not be visible if PowerShell was run as a child process."
            $env:PATH = $SuffixedBinPath + $env:PATH
            Say-Verbose "The current process PATH is now `"$env:PATH`"."
        }
        else {
            Say "Current process PATH already contains `"$BinPath`""
        }
    }
    else {
        Say "Binaries can be found in $BinPath"
    }

    if ($AzurePipelinePath) {
        Say "Running an Azure Pipelines logging command to prepend `"$BinPath`" to the PATH."
        Say "##vso[task.prependpath]$BinPath"
    }

    if ($GitHubActionsPath) {
        Say "Appending `"$BinPath`" to the GITHUB_PATH file."
        $BinPath | Out-File -FilePath $env:GITHUB_PATH -Encoding utf8 -Append
    }
}

function PrintDryRunOutput($Invocation) {
    $RepeatableCommand = ".\$ScriptName -Version `"go$SpecificVersion`" -InstallDir `"$InstallRoot`" -OS `"$CLIOS`" -Architecture `"$CLIArchitecture`""

    foreach ($key in $Invocation.BoundParameters.Keys) {
        if (-not (@("Version","InstallDir","OS","Architecture","DryRun") -contains $key)) {
            $RepeatableCommand+=" -$key `"$($Invocation.BoundParameters[$key])`""
        }
    }
    Say "Repeatable invocation: $RepeatableCommand"
}

function Get-AkaMSRedirectTarget([string] $akaMsLink) {
    $akaMsDownloadLink=$null

    for ($maxRedirections = 9; $maxRedirections -ge 0; $maxRedirections--)
    {
        #get HTTP response
        #do not pass credentials as a part of the $akaMsLink and do not apply credentials in the GetHTTPResponse function
        #otherwise the redirect link would have credentials as well
        #it would result in applying credentials twice to the resulting link and thus breaking it, and in echoing credentials to the output as a part of redirect link
        $Response= GetHTTPResponse -Uri $akaMsLink -HeaderOnly $true -DisableRedirect $true -DisableFeedCredential $true
        Say-Verbose "Received response:`n$Response"

        if ([string]::IsNullOrEmpty($Response)) {
            Say-Verbose "The link '$akaMsLink' is not valid: failed to get redirect location. The resource is not available."
            return $null
        }

        #if HTTP code is 301 (Moved Permanently), the redirect link exists
        if  ($Response.StatusCode -eq 301)
        {
            try {
                $akaMsDownloadLink = $Response.Headers.GetValues("Location")[0]

                if ([string]::IsNullOrEmpty($akaMsDownloadLink)) {
                    Say-Verbose "The link '$akaMsLink' is not valid: server returned 301 (Moved Permanently), but the headers do not contain the redirect location."
                    return $null
                }

                Say-Verbose "The redirect location retrieved: '$akaMsDownloadLink'."
                # This may yet be a link to another redirection. Attempt to retrieve the page again.
                $akaMsLink = $akaMsDownloadLink
                continue
            }
            catch {
                Say-Verbose "The link '$akaMsLink' is not valid: failed to get redirect location."
                return $null
            }
        }
        elseif ((($Response.StatusCode -lt 300) -or ($Response.StatusCode -ge 400)) -and (-not [string]::IsNullOrEmpty($akaMsDownloadLink)))
        {
            # Redirections have ended.
            return $akaMsDownloadLink
        }

        Say-Verbose "The link '$akaMsLink' is not valid: failed to retrieve the redirection location."
        return $null
    }

    Say-Verbose "Aka.ms links have redirected more than the maximum allowed redirections. This may be caused by a cyclic redirection of aka.ms links."
    return $null
}

# Strict mode means attempting to access a JSON key that doesn't exist fails harshly.
# This utility helps make JSON access a bit more concise under those rules.
# https://github.com/PowerShell/PowerShell/issues/10875
function Get-OrNull($Target, $Property) {
    if ($Target -and $Target.PSObject.Properties[$Property]) {
        return $Target.PSObject.Properties[$Property].Value
    }
    return $null
}

function Get-AssetInformation([string]$NormalizedVersion, [string]$OS, [string]$Architecture) {
    Say-Invocation $MyInvocation

    #construct aka.ms link like "https://aka.ms/golang/release/latest/go1.23.assets.json"
    $AkaMsLink = "https://aka.ms/golang/release/latest"
    $AkaMsLink +="/$NormalizedVersion.assets.json"
    Say-Verbose  "Constructed assets.json aka.ms link: '$AkaMsLink'."

    $Assets = DownloadJson $AkaMsLink
    $MatchingArches = @($Assets.arches | Where-Object {
        $Env = Get-OrNull $_ 'env'
        return (Get-OrNull $Env 'GOOS') -eq $OS -and
            (Get-OrNull $Env 'GOARCH') -eq $Architecture
    })

    foreach ($arch in $MatchingArches) {
        Say-Verbose "Matching env '$($arch.env)'."
    }

    if ($MatchingArches.Count -ne 1) {
        throw "Failed to find exactly one matching asset for OS '$OS' and architecture '$Architecture'."
    }

    return ($MatchingArches[0], $Assets.version)
}

function Prepare-Install-Directory {
    New-Item -ItemType Directory -Force -Path $InstallRoot | Out-Null
}

# The following marker is used by microsoft/go-infra tests to insert more logic that runs before any
# installation happens and may stop the script before installation. This allows unit testing without
# adding additional inputs and complexity only used by tests.

# [END OF FUNCTIONS]

if ($Help) {
    Get-Help $PSCommandPath -Examples
    exit
}

Say "Microsoft build of Go Install Script version $MicrosoftGoInstallScriptVersion"

Say-Verbose "Note that the intended use of this script is for Continuous Integration (CI) scenarios, where:"
Say-Verbose "- The toolset needs to be installed without user interaction and without admin rights."
Say-Verbose "- The toolset installation doesn't need to persist across multiple CI runs."
Say-Verbose "Visit https://github.com/microsoft/go for a list of other ways to install Microsoft build of Go.`r`n"

Measure-Action "Product discovery" {
    $script:CLIArchitecture = Get-CLIArchitecture-From-Architecture $Architecture
    $script:CLIOS = Get-CLIOS-From-OS $OS
    $script:NormalizedVersion = Get-NormalizedVersion $Version
    Say-Verbose "Normalized version: '$NormalizedVersion'"
}

if ($ArchivePath -eq "") {
    $ArchivePath = Get-GeneratedArchivePath $CLIOS
    Say-Verbose "Generated archive path: $ArchivePath"
}

$InstallRoot = Resolve-Installation-Path $InstallDir
Say-Verbose "InstallRoot: $InstallRoot"

$ScriptName = $MyInvocation.MyCommand.Name

Say "Fetching information for version '$Version'."
($Arch, $SpecificVersion) = Get-AssetInformation $NormalizedVersion $CLIOS $CLIArchitecture

$DownloadLink = $Arch.url
Say-Verbose "Found download link $DownloadLink with version $SpecificVersion"

if (-Not $DryRun) {
    Say-Verbose "Checking if the version $SpecificVersion is already installed"
    if (Is-ToolsetInstalled -InstallRoot $InstallRoot -SpecificVersion $SpecificVersion) {
        Say "Microsoft build of Go version '$SpecificVersion' is already installed."
        Measure-Action "Setting up shell environment" { Prepend-ToolsetPathEnv -InstallRoot $InstallRoot -SpecificVersion $SpecificVersion }
        return
    }
}

if ($DryRun) {
    PrintDryRunOutput $MyInvocation
    return
}

Measure-Action "Installation directory preparation" { Prepare-Install-Directory }

Say-Verbose "Zip path: $ArchivePath"

Say-Verbose "Downloading link $DownloadLink"

try {
    Measure-Action "Package download" { DownloadFile -Source $DownloadLink -OutPath $ArchivePath }
    Say-Verbose "Download succeeded."
}
catch {
    $StatusCode = $null
    $ErrorMessage = $null

    if ($PSItem.Exception.Data.Contains("StatusCode")) {
        $StatusCode = $PSItem.Exception.Data["StatusCode"]
    }

    if ($PSItem.Exception.Data.Contains("ErrorMessage")) {
        $ErrorMessage = $PSItem.Exception.Data["ErrorMessage"]
    } else {
        $ErrorMessage = $PSItem.Exception.Message
    }

    if (-not $KeepArchive) {
        Remove-FileSafely -Path $ArchivePath
    }

    throw "Downloading has failed with error:`nUri: $DownloadLink`nStatusCode: $StatusCode`nError: $ErrorMessage"
}

Say "Extracting the archive."
Measure-Action "Archive extraction" { Extract-ToolsetArchive -ArchivePath $ArchivePath -InstallRoot $InstallRoot -SpecificVersion $SpecificVersion }

Say-Verbose "Checking installation: version = $SpecificVersion"
$isAssetInstalled = Is-ToolsetInstalled -InstallRoot $InstallRoot -SpecificVersion $SpecificVersion

# Version verification failed. More likely something is wrong either with the downloaded content or with the verification algorithm.
if (!$isAssetInstalled) {
    Say-Error "Failed to verify that the toolset was installed.`nInstallation source: $DownloadLink.`nInstallation location: $InstallRoot.`nReport the bug at https://github.com/microsoft/go/issues."
    throw "Toolset with version $SpecificVersion failed to install with an unknown error."
}

if (-not $KeepArchive) {
    Remove-FileSafely -Path $ArchivePath
}

Measure-Action "Setting up environment PATH to find 'go' command" { Prepend-ToolsetPathEnv -InstallRoot $InstallRoot -SpecificVersion $SpecificVersion }

Say "Installed version is $SpecificVersion"
Say "Installation finished"
