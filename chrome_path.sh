#!/bin/bash

#Bash script to find the path of a chrome browser in linux
#Writes the output to the chrome_path.txt in the same directory
#Which will be read by a pathToChrome variable in chromePath.js
chrome_path=$(which google-chrome-stable)
script_dir=$(dirname "$0")
echo "$chrome_path" > "$script_dir/chrome_path.txt"
