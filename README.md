# Dark Mode Detection Skills

Comprehensive dark mode detection patterns and algorithms for AI agents and browser extensions. This skills repository provides actionable detection rules for identifying dark mode implementations in websites.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![skills.sh](https://img.shields.io/badge/powered%20by-skills.sh-000000.svg)](https://skills.sh)

---

## 🚀 Installation

Install this skill using the skills.sh CLI:

```bash
# Install entire repository
npx skills add jmkloetzer/dark-mode-indicator

# Or install specific skill
npx skills add jmkloetzer/dark-mode-indicator --skill dark-mode-detection
```

### Manual Installation

For project-specific usage:

```bash
# Clone the repository
git clone https://github.com/jmkloetzer/dark-mode-indicator.git

# Copy to your project's skills directory
cp -r dark-mode-indicator/skills/dark-mode-detection .claude/skills/
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
dark-mode-indicator/
├── skills/
│   └── dark-mode-detection/
│       ├── SKILL.md              # Main skill definition
│       └── examples/             # Usage examples (optional)
├── RESEARCH.md                   # Comprehensive research documentation
├── README.md                     # This file
├── marketplace.json              # Skills.sh marketplace metadata
└── LICENSE                       # MIT License
```

---

## 🛠️ For AI Agents

This skill is optimized for:

- **Claude Code** - Automatic context loading for relevant tasks
- **Cursor** - Project-level skill installation
- **Warp** - Terminal-based theme analysis
- **GitHub Copilot** - Code review and detection patterns

### Integration Example

```javascript
// The skill provides this detection algorithm:
class DarkModeDetector {
  detect() {
    // 1. Check localStorage (95%+ confidence)
    // 2. Check DOM attributes (90%+ confidence)
    // 3. Check class names (85%+ confidence)
    // 4. Check library signatures (95%+ confidence)
    // 5. Check toggle buttons (80%+ confidence)
    // ... and more
  }
}
```

---

## 📊 Statistics

Based on comprehensive research:

- **~85%** of websites with dark mode use JavaScript-enhanced implementations
- **~60%** use class-based or attribute-based toggling
- **~20%** use framework-specific solutions (React, Vue, etc.)
- **~5%** use third-party libraries (darkmode.js, Dark Reader)
- **~15%** use CSS-only (media queries)

**Key Insight:** JavaScript-based dark modes are **easier to detect** than CSS-only because they leave multiple traces (localStorage, event listeners, DOM mutations).

---

## 🧪 Testing

Test the detection on popular websites:

```javascript
// Run detection on current page
const detector = new DarkModeDetector();
const result = detector.detect();

console.log(`Dark Mode: ${result.hasDarkMode}`);
console.log(`Confidence: ${result.confidence}`);
console.log(`Current Theme: ${result.currentTheme}`);
console.log(`Implementation: ${result.implementation.join(', ')}`);
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding New Detection Patterns

1. Fork the repository
2. Create a new branch: `git checkout -b feature/new-detection-pattern`
3. Add your detection pattern to `skills/dark-mode-detection/SKILL.md`
4. Test thoroughly with real-world websites
5. Submit a pull request

### Reporting Issues

- Report false positives/negatives
- Suggest new detection patterns
- Request support for new frameworks/libraries

---

## 📚 Documentation

- **[Full Research Report](RESEARCH.md)** - Comprehensive analysis of dark mode implementation patterns
- **[SKILL.md](skills/dark-mode-detection/SKILL.md)** - Complete skill definition with algorithms

---

## 🔗 Related Resources

- [skills.sh Documentation](https://skills.sh)
- [Agent Skills Specification](https://agentskills.io/specification)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Bootstrap Color Modes](https://getbootstrap.com/docs/5.3/customize/color-modes/)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Research based on analysis of 100+ popular websites and frameworks
- Patterns validated against real-world implementations
- Inspired by the open [skills.sh](https://skills.sh) ecosystem

---

**Built with ❤️ for the AI agent community**

*Last updated: February 2026*
