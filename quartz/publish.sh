#!/bin/bash
# publish.sh - Script to publish your notes

echo "🚀 Publishing notes to website..."

# Add all changes
git add .

# Commit with timestamp
git commit -m "Update content: $(date)"

# Push to GitHub (triggers Netlify deploy)
git push

echo "✅ Published! Site will update in 2-3 minutes."
