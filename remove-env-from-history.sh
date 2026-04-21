#!/bin/bash

# Script to remove .env files from git history using filter-repo

# Check if filter-repo is installed
if ! command -v git-filter-repo &> /dev/null
then
    echo "git-filter-repo could not be found. Please install it first."
    exit 1
fi

# Run filter-repo to remove .env files from history
git filter-repo --path-glob '*.env' --invert-paths

echo "Removed .env files from git history successfully."