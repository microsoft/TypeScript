@echo off
setlocal
set LF=^


for /f %%a in ('copy /Z "%~dpf0" nul') do set "CR=%%a"

setlocal enableDelayedExpansion
echo "START"
echo "asdf!CR!asdf"
echo "AASDF!LF!ASDF"
echo "END"
findstr /S /R /M /C:"[^!CR!]!LF!" *
