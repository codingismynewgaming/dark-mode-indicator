# 🚀 Deployment Guide - Push to GitHub

This guide will help you publish your dark mode detection skills repository to GitHub.

---

## Prerequisites

- GitHub account ([Sign up here](https://github.com/signup))
- Git installed on your computer
- (Optional) GitHub CLI installed

---

## Option 1: Using GitHub Website (Recommended)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `dark-mode-indicator`
   - **Description**: "Comprehensive dark mode detection patterns and algorithms for browser extensions and AI agents"
   - **Visibility**: Public (required for skills.sh distribution)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. Click **Create repository**

### Step 2: Push Existing Repository

After creating the repository, GitHub will show you commands to push an existing repository. Run these in your terminal:

```bash
cd D:\personaldata\vibe-coding-projekte\dark-mode-indicator

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dark-mode-indicator.git

# Rename branch to main (if not already done)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify Push

Visit your repository at:
```
https://github.com/YOUR_USERNAME/dark-mode-indicator
```

---

## Option 2: Using GitHub CLI

If you have the GitHub CLI (`gh`) installed:

```bash
cd D:\personaldata\vibe-coding-projekte\dark-mode-indicator

# Create repository and push in one command
gh repo create dark-mode-indicator --public --source=. --remote=origin --push
```

### Install GitHub CLI (if not installed)

**Windows:**
```bash
winget install GitHub.cli
```

**macOS:**
```bash
brew install gh
```

**Linux:**
```bash
sudo apt install gh  # Debian/Ubuntu
sudo dnf install gh  # Fedora
```

Then authenticate:
```bash
gh auth login
```

---

## Option 3: Using Git Bash / Terminal

```bash
cd D:\personaldata\vibe-coding-projekte\dark-mode-indicator

# Check current remotes
git remote -v

# If no remote exists, add it (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dark-mode-indicator.git

# Push to GitHub
git push -u origin main
```

---

## After Pushing to GitHub

### 1. Install Your Skill

Once your repository is public, anyone can install your skill:

```bash
npx skills add YOUR_USERNAME/dark-mode-indicator
```

### 2. Share Your Skill

Share your skill with the community:

- Add it to the [skills.sh directory](https://skills.sh) (if applicable)
- Share on social media
- Add to your portfolio

### 3. Submit to skills.sh Marketplace (Optional)

To make your skill discoverable in the skills.sh marketplace:

1. Ensure your repository is public
2. Has a proper `marketplace.json` file (already included)
3. Has comprehensive documentation (README.md - already included)
4. Submit via the skills.sh website or contact the maintainers

---

## Troubleshooting

### Error: "repository not found"

**Cause:** Repository doesn't exist on GitHub yet.

**Solution:** Create the repository first on https://github.com/new

### Error: "permission denied"

**Cause:** Authentication issue.

**Solution:** 
```bash
# Configure Git with your credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Or use GitHub CLI for authentication
gh auth login
```

### Error: "branch name mismatch"

**Cause:** Default branch name is different.

**Solution:**
```bash
# Check your branch name
git branch

# Rename if needed
git branch -M main

# Push again
git push -u origin main
```

### Error: "remote already exists"

**Cause:** Remote was already added.

**Solution:**
```bash
# Remove existing remote
git remote remove origin

# Add again
git remote add origin https://github.com/YOUR_USERNAME/dark-mode-indicator.git

# Push
git push -u origin main
```

---

## Verify Your Skill Works

After pushing to GitHub, test the installation:

```bash
# Test installation (replace YOUR_USERNAME)
npx skills add YOUR_USERNAME/dark-mode-indicator

# Verify skill is installed
# Check your skills directory:
# - ~/.claude/skills/dark-mode-detection/
# - or .claude/skills/dark-mode-detection/ in current project
```

---

## Next Steps

1. ✅ Push repository to GitHub
2. ✅ Test installation with `npx skills add`
3. ✅ Share with the community
4. ✅ Monitor issues and PRs
5. ✅ Update and improve based on feedback

---

## Repository Structure Checklist

Before publishing, ensure your repository has:

- ✅ `skills/dark-mode-detection/SKILL.md` - Main skill definition
- ✅ `README.md` - Comprehensive documentation
- ✅ `marketplace.json` - Skills.sh marketplace metadata
- ✅ `LICENSE` - Open source license (MIT)
- ✅ `.gitignore` - Git ignore rules
- ✅ `RESEARCH.md` - Research documentation
- ✅ `scripts/` - Example implementation code

All files are already included in your repository! 🎉

---

**Need Help?**

- [GitHub Docs: Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [skills.sh Documentation](https://skills.sh)

---

*Good luck with your dark mode detection skills repository!* 🚀
