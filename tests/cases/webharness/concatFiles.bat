@echo off
FOR /F "delims=" %%A IN (fileList.txt) DO more %%A >> wholecompiler.ts