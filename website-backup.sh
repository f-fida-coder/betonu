#!/bin/bash
# Script to create a zip backup of the website with all changes

# Navigate to parent directory
cd /Users/mac/Downloads/

# Create backup with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
zip -r "Boy_Backup_${TIMESTAMP}.zip" Boy/

# Print success message
echo "Backup created: Boy_Backup_${TIMESTAMP}.zip in your Downloads folder"