---
name: dark-mode-detection
description: Comprehensive dark mode detection patterns and algorithms for browser extensions. Use when analyzing websites for dark mode implementations, detecting theme switchers, identifying CSS/JavaScript dark mode patterns, or building browser extensions that need to detect dark mode. Triggers on dark mode, theme detection, prefers-color-scheme, data-theme, class toggling, and related queries.
license: MIT
metadata:
  author: dark-mode-indicator
  version: "1.0.0"
  category: web-development
  tags: [dark-mode, theme, detection, browser-extension, css, javascript]
compatibility: Works with all AI agents. No special dependencies required.
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
---

# Dark Mode Detection

Comprehensive patterns, algorithms, and detection strategies for identifying dark mode implementations in websites. This skill provides actionable detection rules for browser extensions and automated analysis tools.

---

## When to Apply

Use this skill when:

- ✅ Building a browser extension that detects dark mode
- ✅ Analyzing a website's theme implementation
- ✅ Identifying dark mode patterns (CSS, JavaScript, frameworks)
- ✅ Creating theme detection algorithms
- ✅ Auditing websites for accessibility compliance
- ✅ Reverse-engineering theme switcher implementations
- ✅ Working with `prefers-color-scheme`, `data-theme`, or class-based toggling

---

## Detection Priority Levels

| Priority | Category | Impact | Confidence |
|----------|----------|--------|------------|
| **CRITICAL** | localStorage Keys | Very High | 95%+ |
| **CRITICAL** | DOM Attributes | Very High | 90%+ |
| **HIGH** | Library Signatures | Very High | 95%+ |
| **HIGH** | Class Names on html/body | High | 85%+ |
| **MEDIUM** | Toggle Buttons | High | 80%+ |
| **MEDIUM** | CSS Custom Properties | Medium | 70%+ |
| **LOW** | Computed Styles | Medium | 60%+ |
| **LOW** | matchMedia Queries | Low | 40%+ |

---

## Detection Categories

### 1. localStorage Keys (CRITICAL - 95%+ Confidence)

The most reliable signal for JavaScript-based dark mode implementations.

```javascript
const themeKeys = [
  'theme',                    // Most common (next-themes, custom)
  'darkMode',                 // Common variant
  'dark-mode',                // Kebab-case variant
  'color-scheme',             // Standard name
  'theme-preference',         // Explicit naming
  'vueuse-color-scheme',      // VueUse library
  'my-theme',                 // Custom (configurable)
  'vite-ui-theme',            // Vite projects
  'darkModeEnabled',          // Boolean-style
  'dark_mode_pref',           // Snake-case variant
  'user-theme',               // User-specific
  'preferred-theme',          // Preference-based
  'app-theme',                // App-specific
  'site-theme',               // Site-specific
  'colorMode',                // CamelCase variant
  'color-mode'                // Kebab-case variant
];

// Detection Algorithm
function checkLocalStorage() {
  const signals = [];
  const keys = ['theme', 'darkMode', 'dark-mode', 'color-scheme'];
  
  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);
      if (value === 'dark' || value === 'enabled' || value === 'true') {
        signals.push({
          type: 'localStorage',
          key,
          value,
          confidence: 'very-high',
          implementation: 'javascript'
        });
      }
    } catch (e) {
      // Cross-origin restriction
    }
  }
  
  return signals;
}
```

**Common Values:**
- `'dark'` / `'light'` (most common)
- `'enabled'` / `'disabled'`
- `'true'` / `'false'`
- `'dark-theme'` / `'light-theme'`

---

### 2. DOM Attributes (CRITICAL - 90%+ Confidence)

Direct attributes on `<html>` or `<body>` elements.

#### data-theme Attribute

```html
<!-- Most Common Pattern -->
<html data-theme="dark">
<html data-theme="light">

<!-- Detection -->
const html = document.documentElement;
if (html.getAttribute('data-theme') === 'dark') {
  // Dark mode active
}
```

#### data-bs-theme Attribute (Bootstrap 5.3+)

```html
<!-- Bootstrap 5.3+ Pattern -->
<html data-bs-theme="dark">
<html data-bs-theme="light">

<!-- Detection -->
if (html.getAttribute('data-bs-theme') === 'dark') {
  // Bootstrap dark mode active
}
```

#### data-mui-color-scheme (Material UI)

```html
<!-- Material UI Pattern -->
<html data-mui-color-scheme="dark">
<html data-mui-color-scheme="light">
```

#### Alternative Attributes

```html
<html data-mode="dark">
<html color-mode="dark">
<html theme="dark">
<body data-theme="dark">
```

#### Detection Algorithm

```javascript
function checkDOMAttributes() {
  const html = document.documentElement;
  const body = document.body;
  const signals = [];
  
  const attributeChecks = [
    { element: html, attribute: 'data-theme', value: 'dark' },
    { element: html, attribute: 'data-theme', value: 'light' },
    { element: html, attribute: 'data-mode', value: 'dark' },
    { element: html, attribute: 'color-mode', value: 'dark' },
    { element: html, attribute: 'data-bs-theme', value: 'dark' },
    { element: html, attribute: 'data-mui-color-scheme', value: 'dark' },
    { element: body, attribute: 'data-theme', value: 'dark' },
  ];
  
  attributeChecks.forEach(({ element, attribute, value }) => {
    if (element.getAttribute(attribute) === value) {
      signals.push({
        type: 'dom-attribute',
        attribute: `${attribute}="${value}"`,
        element: element.tagName.toLowerCase(),
        confidence: 'high',
        implementation: 'custom'
      });
    }
  });
  
  return signals;
}
```

---

### 3. Class Names on html/body (HIGH - 85%+ Confidence)

Class-based toggling is extremely common, especially with Tailwind CSS.

#### Common Class Patterns

```css
/* Tailwind CSS Pattern */
<html class="dark">
<html class="light">
<body class="dark">

/* Custom Implementations */
<html class="dark-mode">
<html class="light-mode">
<html class="dark-theme">
<html class="light-theme">
<html class="theme-dark">
<html class="theme-light">
```

#### Detection Algorithm

```javascript
function checkClassNames() {
  const html = document.documentElement;
  const body = document.body;
  const signals = [];
  
  const classNames = [
    'dark', 'light',
    'dark-mode', 'light-mode',
    'dark-theme', 'light-theme',
    'theme-dark', 'theme-light'
  ];
  
  [html, body].forEach(element => {
    classNames.forEach(className => {
      if (element.classList.contains(className)) {
        signals.push({
          type: 'class-name',
          className,
          element: element.tagName.toLowerCase(),
          confidence: 'high',
          implementation: element === html ? 'tailwind-or-custom' : 'custom'
        });
      }
    });
  });
  
  return signals;
}
```

#### Tailwind CSS Specific Detection

```javascript
// Detect Tailwind's dark: prefix classes
function checkTailwindDarkClasses() {
  const allElements = document.querySelectorAll('*');
  const tailwindDarkClasses = [];
  
  allElements.forEach(el => {
    const classes = el.classList;
    classes.forEach(cls => {
      if (cls.startsWith('dark:')) {
        tailwindDarkClasses.push(cls);
      }
    });
  });
  
  return {
    hasTailwindDark: tailwindDarkClasses.length > 0,
    classes: tailwindDarkClasses.slice(0, 10), // Sample
    confidence: tailwindDarkClasses.length > 0 ? 'very-high' : 'none'
  };
}
```

---

### 4. Library Signatures (VERY HIGH - 95%+ Confidence)

Popular dark mode libraries leave distinct signatures.

#### darkmode.js

```javascript
// Detection Signatures
const darkmodeSignatures = {
  elements: ['.darkmode-layer', '.darkmode-toggle', '.darkmode--activated'],
  class: 'darkmode--activated',
  method: () => typeof Darkmode === 'function'
};

function checkDarkmodeJS() {
  const layer = document.querySelector('.darkmode-layer');
  const toggle = document.querySelector('.darkmode-toggle');
  const activated = document.body.classList.contains('darkmode--activated');
  
  return {
    detected: !!(layer || toggle || activated),
    confidence: layer && toggle ? 'very-high' : 'high',
    signatures: { layer: !!layer, toggle: !!toggle, activated }
  };
}
```

#### Dark Reader

```javascript
// Detection Signatures
const darkReaderSignatures = {
  api: () => typeof window.DarkReader !== 'undefined',
  classes: '[class*="darkreader"]',
  filters: 'filter: invert()',
  styleTags: 'style[data-darkreader]'
};

function checkDarkReader() {
  const hasAPI = typeof window.DarkReader !== 'undefined';
  const hasClasses = document.querySelector('[class*="darkreader"]');
  const hasInlineFilters = Array.from(document.querySelectorAll('*'))
    .some(el => el.style.filter?.includes('invert'));
  
  return {
    detected: hasAPI || hasClasses || hasInlineFilters,
    confidence: hasAPI ? 'very-high' : hasClasses ? 'high' : 'medium',
    signatures: { api: hasAPI, classes: !!hasClasses, filters: hasInlineFilters }
  };
}
```

#### next-themes (Next.js)

```javascript
// Detection Signatures
const nextThemesSignatures = {
  provider: 'ThemeProvider',
  hook: 'useTheme',
  localStorage: 'theme',
  htmlClass: 'dark',
  suppressHydrationWarning: true
};

function checkNextThemes() {
  // Check for next-themes patterns
  const html = document.documentElement;
  const hasClass = html.classList.contains('dark') || html.classList.contains('light');
  const hasStyle = html.style.colorScheme;
  const localStorageTheme = (() => {
    try {
      return localStorage.getItem('theme');
    } catch { return null; }
  })();
  
  return {
    detected: hasClass && localStorageTheme,
    confidence: hasClass && localStorageTheme === 'dark' ? 'very-high' : 'medium',
    currentTheme: localStorageTheme
  };
}
```

#### VueUse (Vue 3)

```javascript
function checkVueUse() {
  try {
    const vueUseTheme = localStorage.getItem('vueuse-color-scheme');
    const html = document.documentElement;
    const hasDarkClass = html.classList.contains('dark');
    
    return {
      detected: vueUseTheme || hasDarkClass,
      confidence: vueUseTheme === 'dark' ? 'very-high' : 'medium',
      currentTheme: vueUseTheme
    };
  } catch {
    return { detected: false, confidence: 'none' };
  }
}
```

---

### 5. Toggle Buttons (HIGH - 80%+ Confidence)

Theme toggle buttons are strong indicators of dark mode capability.

#### Common Selectors

```javascript
const toggleSelectors = [
  // Data attributes
  '[data-theme-toggle]',
  '[data-toggle-theme]',
  '[data-theme-switcher]',
  
  // Class names
  '.theme-toggle',
  '.theme-switch',
  '.theme-switcher',
  '.dark-mode-toggle',
  '.dark-mode-switch',
  '.mode-toggle',
  
  // Aria labels
  '[aria-label*="dark"]',
  '[aria-label*="light"]',
  '[aria-label*="theme"]',
  '[aria-label*="mode"]',
  
  // onclick handlers
  '[onclick*="theme"]',
  '[onclick*="dark"]',
  '[onclick*="toggle"]',
  
  // ID patterns
  'button[id*="theme"]',
  'button[id*="dark"]',
  'input[id*="theme"]',
  
  // Icon patterns (common in toggles)
  '.sun-icon',
  '.moon-icon',
  '[class*="sun"]',
  '[class*="moon"]'
];

function checkToggleButtons() {
  const signals = [];
  
  toggleSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      signals.push({
        type: 'toggle-button',
        selector,
        count: elements.length,
        confidence: selector.includes('data-') ? 'high' : 'medium'
      });
    }
  });
  
  return signals;
}
```

---

### 6. CSS Custom Properties (MEDIUM - 70%+ Confidence)

CSS variables with theme-related names.

```javascript
function checkCSSCustomProperties() {
  const styles = getComputedStyle(document.documentElement);
  const signals = [];
  
  const themeProperties = [
    '--background', '--background-color', '--bg', '--bg-color',
    '--foreground', '--text-color', '--text', '--color-text',
    '--theme-bg', '--theme-text', '--theme-background',
    '--color-background', '--color-foreground',
    '--primary', '--secondary', '--accent',
    '--mui-palette-background-default',  // Material UI
    '--bs-body-bg', '--bs-body-color'    // Bootstrap
  ];
  
  themeProperties.forEach(prop => {
    const value = styles.getPropertyValue(prop).trim();
    if (value && isDarkColor(value)) {
      signals.push({
        type: 'css-custom-property',
        property: prop,
        value,
        confidence: 'medium'
      });
    }
  });
  
  return signals;
}

function isDarkColor(color) {
  // Parse RGB/HSL/Hex and determine if dark
  if (!color) return false;
  
  // Hex: #121212, #1a1a1a, etc.
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      // Luminance formula
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  }
  
  // RGB: rgb(18, 18, 18)
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  }
  
  return false;
}
```

---

### 7. prefers-color-scheme Media Query (LOW - 40%+ Confidence)

CSS-only or system preference detection.

```css
/* CSS Detection */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #121212;
    --text: #ffffff;
  }
}
```

```javascript
// JavaScript Detection
function checkPrefersColorScheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  return {
    systemPrefersDark: isDark,
    systemPrefersLight: isLight,
    hasMediaQuerySupport: isDark !== undefined,
    confidence: 'low'  // Alone, doesn't prove site has dark mode
  };
}

// Check CSS for media queries
function checkCSSForMediaQueries() {
  const stylesheets = document.styleSheets;
  const signals = [];
  
  try {
    for (const sheet of stylesheets) {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSMediaRule) {
          if (rule.media.mediaText.includes('prefers-color-scheme')) {
            signals.push({
              type: 'media-query',
              media: rule.media.mediaText,
              confidence: 'medium'
            });
          }
        }
      }
    }
  } catch (e) {
    // Cross-origin stylesheet
  }
  
  return signals;
}
```

---

### 8. color-scheme CSS Property (MEDIUM - 70%+ Confidence)

Modern CSS property for theme indication.

```css
:root {
  color-scheme: light dark;
}

[data-theme="dark"] {
  color-scheme: dark;
}
```

```javascript
function checkColorSchemeProperty() {
  const html = document.documentElement;
  const style = getComputedStyle(html);
  
  return {
    colorScheme: style.colorScheme,
    hasDarkSupport: style.colorScheme?.includes('dark'),
    inlineStyle: html.style.colorScheme,
    confidence: style.colorScheme?.includes('dark') ? 'medium' : 'low'
  };
}
```

---

## Complete Detection Algorithm

### DarkModeDetector Class

```javascript
class DarkModeDetector {
  constructor() {
    this.signals = [];
    this.observer = null;
  }

  detect() {
    this.signals = [];
    
    // Run all detection methods
    this.checkLocalStorage();
    this.checkDOMAttributes();
    this.checkClassNames();
    this.checkLibrarySignatures();
    this.checkToggleButtons();
    this.checkCSSCustomProperties();
    this.checkPrefersColorScheme();
    this.checkColorSchemeProperty();
    this.checkTailwindDarkClasses();
    
    return {
      hasDarkMode: this.signals.length > 0,
      confidence: this.calculateConfidence(),
      currentTheme: this.getCurrentTheme(),
      implementation: this.detectImplementationType(),
      signals: this.signals,
      summary: this.generateSummary()
    };
  }

  checkLocalStorage() {
    const keys = ['theme', 'darkMode', 'dark-mode', 'color-scheme', 'vueuse-color-scheme'];
    
    keys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value === 'dark' || value === 'enabled' || value === 'true') {
          this.signals.push({
            type: 'localStorage',
            key,
            value,
            confidence: 'very-high',
            weight: 4
          });
        }
      } catch (e) {}
    });
  }

  checkDOMAttributes() {
    const html = document.documentElement;
    const body = document.body;
    
    const checks = [
      { element: html, attribute: 'data-theme', value: 'dark' },
      { element: html, attribute: 'data-bs-theme', value: 'dark' },
      { element: html, attribute: 'data-mui-color-scheme', value: 'dark' },
      { element: html, attribute: 'data-mode', value: 'dark' },
      { element: html, attribute: 'color-mode', value: 'dark' },
      { element: body, attribute: 'data-theme', value: 'dark' },
    ];
    
    checks.forEach(({ element, attribute, value }) => {
      if (element.getAttribute(attribute) === value) {
        this.signals.push({
          type: 'dom-attribute',
          attribute: `${attribute}="${value}"`,
          element: element.tagName.toLowerCase(),
          confidence: 'high',
          weight: 3
        });
      }
    });
  }

  checkClassNames() {
    const html = document.documentElement;
    const body = document.body;
    const classNames = ['dark', 'dark-mode', 'dark-theme', 'theme-dark'];
    
    [html, body].forEach(element => {
      classNames.forEach(className => {
        if (element.classList.contains(className)) {
          this.signals.push({
            type: 'class-name',
            className,
            element: element.tagName.toLowerCase(),
            confidence: 'high',
            weight: 3
          });
        }
      });
    });
  }

  checkLibrarySignatures() {
    // darkmode.js
    if (document.querySelector('.darkmode-layer, .darkmode-toggle')) {
      this.signals.push({
        type: 'library',
        name: 'darkmode.js',
        confidence: 'very-high',
        weight: 4
      });
    }
    
    // Dark Reader
    if (window.DarkReader || document.querySelector('[class*="darkreader"]')) {
      this.signals.push({
        type: 'library',
        name: 'darkreader',
        confidence: 'very-high',
        weight: 4
      });
    }
  }

  checkToggleButtons() {
    const selectors = [
      '[data-theme-toggle]',
      '.theme-toggle',
      '.dark-mode-toggle',
      '[aria-label*="theme"]'
    ];
    
    selectors.forEach(selector => {
      if (document.querySelector(selector)) {
        this.signals.push({
          type: 'toggle-button',
          selector,
          confidence: 'high',
          weight: 3
        });
      }
    });
  }

  checkCSSCustomProperties() {
    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue('--background').trim();
    
    if (bg && this.isDarkColor(bg)) {
      this.signals.push({
        type: 'css-custom-property',
        property: '--background',
        value: bg,
        confidence: 'medium',
        weight: 2
      });
    }
  }

  checkPrefersColorScheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Low confidence alone, but useful context
    this.signals.push({
      type: 'system-preference',
      prefersDark: isDark,
      confidence: 'low',
      weight: 1
    });
  }

  checkColorSchemeProperty() {
    const style = getComputedStyle(document.documentElement);
    if (style.colorScheme?.includes('dark')) {
      this.signals.push({
        type: 'color-scheme-property',
        value: style.colorScheme,
        confidence: 'medium',
        weight: 2
      });
    }
  }

  checkTailwindDarkClasses() {
    const allElements = document.querySelectorAll('*');
    let hasDarkClasses = false;
    
    allElements.forEach(el => {
      el.classList.forEach(cls => {
        if (cls.startsWith('dark:')) hasDarkClasses = true;
      });
    });
    
    if (hasDarkClasses) {
      this.signals.push({
        type: 'tailwind-dark-classes',
        confidence: 'very-high',
        weight: 4
      });
    }
  }

  isDarkColor(color) {
    if (!color) return false;
    
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
    }
    
    if (color.startsWith('rgb')) {
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
    }
    
    return false;
  }

  calculateConfidence() {
    const weights = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
    const totalWeight = this.signals.reduce((sum, s) => sum + (s.weight || 0), 0);
    
    if (totalWeight >= 12) return 'very-high';
    if (totalWeight >= 8) return 'high';
    if (totalWeight >= 4) return 'medium';
    return 'low';
  }

  getCurrentTheme() {
    // Check localStorage first
    const themeKeys = ['theme', 'darkMode', 'color-scheme'];
    for (const key of themeKeys) {
      try {
        const value = localStorage.getItem(key);
        if (value === 'dark' || value === 'light') {
          return value;
        }
      } catch (e) {}
    }
    
    // Check DOM attributes
    const html = document.documentElement;
    if (html.getAttribute('data-theme')) return html.getAttribute('data-theme');
    if (html.classList.contains('dark')) return 'dark';
    if (html.classList.contains('light')) return 'light';
    
    return 'unknown';
  }

  detectImplementationType() {
    const types = new Set();
    
    this.signals.forEach(signal => {
      if (signal.type === 'localStorage') types.add('javascript');
      if (signal.type === 'dom-attribute') types.add('custom');
      if (signal.type === 'class-name') types.add('tailwind-or-custom');
      if (signal.type === 'library') types.add(signal.name);
      if (signal.type === 'tailwind-dark-classes') types.add('tailwind');
    });
    
    return Array.from(types);
  }

  generateSummary() {
    return {
      totalSignals: this.signals.length,
      criticalSignals: this.signals.filter(s => s.confidence === 'very-high').length,
      highSignals: this.signals.filter(s => s.confidence === 'high').length,
      implementationTypes: this.detectImplementationType(),
      detectedLibraries: this.signals
        .filter(s => s.type === 'library')
        .map(s => s.name)
    };
  }

  // Setup MutationObserver for dynamic changes
  setupObserver(callback) {
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById('root'),
      document.getElementById('app'),
      document.getElementById('__next')
    ];
    
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (['class', 'data-theme', 'data-mode', 'color-mode'].includes(mutation.attributeName)) {
            callback({
              type: 'theme-change',
              attribute: mutation.attributeName,
              oldValue: mutation.oldValue,
              newValue: mutation.target.getAttribute(mutation.attributeName)
            });
          }
        }
      });
    });
    
    targets.forEach(target => {
      if (target) {
        this.observer.observe(target, {
          attributes: true,
          attributeFilter: ['class', 'data-theme', 'data-mode', 'color-mode', 'style']
        });
      }
    });
    
    return () => this.observer.disconnect();
  }
}

// Usage Example
const detector = new DarkModeDetector();
const result = detector.detect();
console.log('Dark Mode Detection Result:', result);

// Setup live monitoring
const unobserve = detector.setupObserver((change) => {
  console.log('Theme changed:', change);
  const newResult = detector.detect();
  console.log('Updated detection:', newResult);
});
```

---

## Edge Cases

### 1. Cross-Origin iframes

```javascript
// Cannot access localStorage/CSS from cross-origin iframes
try {
  const iframeStorage = iframe.contentWindow.localStorage;
} catch (e) {
  // Cross-origin restriction
  console.log('Cannot access iframe storage');
}
```

### 2. Shadow DOM

```javascript
// Need to query Shadow DOM separately
function checkShadowDOM(root) {
  const shadowRoots = root.querySelectorAll('*').map(el => el.shadowRoot).filter(Boolean);
  
  shadowRoots.forEach(shadow => {
    const styles = getComputedStyle(shadow);
    // Check shadow DOM styles
  });
}
```

### 3. Server-Side Rendering (SSR)

```javascript
// SSR may render initial theme without JavaScript
// Check for hydration markers
const hasHydration = document.querySelector('[data-hydration]') || 
                     document.querySelector('[data-reactroot]');
```

### 4. Multiple Theme Systems

```javascript
// Some sites use both system preference AND manual toggle
// Detect both and report accurately
const hasSystemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
const hasManualToggle = localStorage.getItem('theme') !== null;
```

---

## Output Format

### Detection Result Schema

```typescript
interface DetectionResult {
  hasDarkMode: boolean;
  confidence: 'very-high' | 'high' | 'medium' | 'low';
  currentTheme: 'dark' | 'light' | 'unknown';
  implementation: string[];  // ['javascript', 'tailwind', 'darkmode.js']
  signals: Signal[];
  summary: {
    totalSignals: number;
    criticalSignals: number;
    highSignals: number;
    implementationTypes: string[];
    detectedLibraries: string[];
  };
}

interface Signal {
  type: 'localStorage' | 'dom-attribute' | 'class-name' | 'library' | 
        'toggle-button' | 'css-custom-property' | 'system-preference' |
        'color-scheme-property' | 'tailwind-dark-classes';
  confidence: 'very-high' | 'high' | 'medium' | 'low';
  weight: number;
  [key: string]: any;  // Additional signal-specific data
}
```

### Example Output

```json
{
  "hasDarkMode": true,
  "confidence": "very-high",
  "currentTheme": "dark",
  "implementation": ["javascript", "tailwind"],
  "signals": [
    {
      "type": "localStorage",
      "key": "theme",
      "value": "dark",
      "confidence": "very-high",
      "weight": 4
    },
    {
      "type": "class-name",
      "className": "dark",
      "element": "html",
      "confidence": "high",
      "weight": 3
    },
    {
      "type": "tailwind-dark-classes",
      "confidence": "very-high",
      "weight": 4
    }
  ],
  "summary": {
    "totalSignals": 3,
    "criticalSignals": 2,
    "highSignals": 1,
    "implementationTypes": ["javascript", "tailwind"],
    "detectedLibraries": []
  }
}
```

---

## Quick Reference

| Detection Method | Confidence | Implementation | Code Pattern |
|-----------------|------------|----------------|--------------|
| localStorage | Very High | JavaScript | `getItem('theme') === 'dark'` |
| data-theme | High | Custom | `getAttribute('data-theme')` |
| .dark class | High | Tailwind/Custom | `classList.contains('dark')` |
| Library signatures | Very High | Library | `.darkmode-layer`, `DarkReader` |
| Toggle buttons | High | JavaScript | `[data-theme-toggle]` |
| CSS variables | Medium | CSS | `--background: #121212` |
| color-scheme | Medium | CSS | `color-scheme: dark` |
| prefers-color-scheme | Low | CSS/JS | `@media (prefers-color-scheme: dark)` |

---

## Resources

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [darkmode.js](https://github.com/sandoche/Darkmode.js)
- [Dark Reader](https://github.com/darkreader/darkreader)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Bootstrap 5.3 Dark Mode](https://getbootstrap.com/docs/5.3/customize/color-modes/)

---

*Dark Mode Detection Skill v1.0.0 - For browser extension development and website analysis*
