# Dark Mode Detection Skills

Comprehensive dark mode detection patterns and algorithms for AI agents and browser extensions. This skills repository provides actionable detection rules for identifying dark mode implementations in websites.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![skills.sh](https://img.shields.io/badge/powered%20by-skills.sh-000000.svg)](https://skills.sh)
[![GitHub Release](https://img.shields.io/github/v/release/codingismynewgaming/Dark-Mode-Detection-Skills)](https://github.com/codingismynewgaming/Dark-Mode-Detection-Skills/releases)
[![GitHub Stars](https://img.shields.io/github/stars/codingismynewgaming/Dark-Mode-Detection-Skills?style=social)](https://github.com/codingismynewgaming/Dark-Mode-Detection-Skills)

---

## 🚀 Installation

Install this skill using the skills.sh CLI:

```bash
# Install entire repository
npx skills add codingismynewgaming/Dark-Mode-Detection-Skills

# Or install specific skill
npx skills add codingismynewgaming/Dark-Mode-Detection-Skills --skill dark-mode-detection
```

### Manual Installation

For project-specific usage:

```bash
# Clone the repository
git clone https://github.com/codingismynewgaming/Dark-Mode-Detection-Skills.git

# Copy to your project's skills directory
cp -r Dark-Mode-Detection-Skills/skills/dark-mode-detection .claude/skills/
```

Or add to your project's `.claude/skills/` directory:

```
your-project/
└── .claude/
    └── skills/
        └── dark-mode-detection/
            └── SKILL.md
```

---

## 📦 Available Skills

| Skill | Description | Category |
|-------|-------------|----------|
| **[dark-mode-detection](skills/dark-mode-detection/SKILL.md)** | Comprehensive dark mode detection patterns and algorithms for browser extensions | Web Development |

---

## 🎯 Usage

The `dark-mode-detection` skill is automatically triggered when you:

- ✅ Ask about dark mode implementation patterns
- ✅ Request website theme analysis
- ✅ Build browser extensions for theme detection
- ✅ Need to identify CSS/JavaScript dark mode patterns
- ✅ Work with `prefers-color-scheme`, `data-theme`, or class-based toggling
- ✅ Analyze websites for accessibility compliance

### Example Prompts

```
Detect if this website has dark mode enabled
What dark mode implementation does this site use?
Help me build a dark mode detector for my browser extension
Find all localStorage keys related to theme switching
Analyze the theme toggle implementation on this page
```

---

## 🔍 Detection Capabilities

This skill provides detection for:

### Detection Methods (Priority Order)

| Priority | Method | Confidence | Coverage |
|----------|--------|------------|----------|
| **CRITICAL** | localStorage Keys | 95%+ | JavaScript-based |
| **CRITICAL** | DOM Attributes | 90%+ | Custom implementations |
| **HIGH** | Library Signatures | 95%+ | darkmode.js, Dark Reader |
| **HIGH** | Class Names | 85%+ | Tailwind, custom |
| **MEDIUM** | Toggle Buttons | 80%+ | UI indicators |
| **MEDIUM** | CSS Custom Properties | 70%+ | CSS variables |
| **LOW** | System Preferences | 40%+ | prefers-color-scheme |

### Supported Patterns

- ✅ `data-theme` attribute (custom implementations)
- ✅ `data-bs-theme` attribute (Bootstrap 5.3+)
- ✅ `data-mui-color-scheme` (Material UI)
- ✅ `.dark` / `.light` class toggling (Tailwind CSS)
- ✅ localStorage persistence (`theme`, `darkMode`, etc.)
- ✅ `prefers-color-scheme` media queries
- ✅ `color-scheme` CSS property
- ✅ Library signatures (darkmode.js, Dark Reader, next-themes, VueUse)

---

## 📁 Repository Structure

```
Dark-Mode-Detection-Skills/
├── skills/
│   └── dark-mode-detection/
│       ├── SKILL.md              # Main skill definition
│       └── examples/             # Usage examples (optional)
├── RESEARCH.md                   # Comprehensive research documentation
├── README.md                     # This file
├── marketplace.json              # Skills.sh marketplace metadata
└── LICENSE                       # MIT License
```