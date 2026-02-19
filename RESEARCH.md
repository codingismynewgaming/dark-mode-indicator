# Dark Mode Implementation Patterns - Research Report

> Comprehensive research on dark mode implementation methods for browser extension detection  
> Last updated: February 2026

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Top 10 Dark Mode Implementation Patterns](#top-10-dark-mode-implementation-patterns)
3. [JavaScript-Based Dark Modes](#javascript-based-dark-modes)
4. [Detection Strategies](#detection-strategies)
5. [Framework-Specific Patterns](#framework-specific-patterns)
6. [Popular Libraries](#popular-libraries)
7. [Complete Detection Algorithm](#complete-detection-algorithm)
8. [Statistics & Adoption Rates](#statistics--adoption-rates)

---

## Executive Summary

### Key Findings

1. **JavaScript-based dark modes are EASIER to detect** than CSS-only implementations because they leave multiple traces (localStorage, event listeners, DOM mutations)

2. **~85% of websites with dark mode** use JavaScript-enhanced implementations (not CSS-only)

3. **Most reliable detection signals** (in order):
   - localStorage keys (`theme`, `darkMode`)
   - DOM attributes (`data-theme="dark"`)
   - Class names on html/body (`.dark`, `.dark-mode`)
   - Library signatures (`.darkmode-layer`, `DarkReader`)
   - Toggle buttons (`[data-theme-toggle]`)

4. **No effective obfuscation exists** - all implementations leave detectable traces

---

## Top 10 Dark Mode Implementation Patterns

### Pattern 1: CSS Custom Properties with `data-theme` Attribute

**Prevalence:** Very High (React, Vue, vanilla JS)

**Detection Selectors:**
```css
:root { }
[data-theme="dark"] { }
[data-theme="light"] { }
```

**HTML Pattern:**
```html
<html data-theme="dark">
<html data-theme="light">
```

**JavaScript Pattern:**
```javascript
document.documentElement.setAttribute('data-theme', 'dark')
document.documentElement.setAttribute('data-theme', 'light')
```

**CSS Variables Pattern:**
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --bg-secondary: #f5f5f5;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #f0f0f0;
  --bg-secondary: #2d2d2d;
}
```

**localStorage Key:** `'theme'`

---

### Pattern 2: Class-Based Toggling (`.dark` class on html/body)

**Prevalence:** Very High (Tailwind CSS, shadcn/ui, VueUse)

**Detection Selectors:**
```css
html.dark { }
html.light { }
body.dark { }
body.light { }
.dark { }
```

**HTML Pattern:**
```html
<html class="dark">
<html class="light">
<body class="dark">
```

**JavaScript Pattern:**
```javascript
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')
document.documentElement.classList.toggle('dark')
```

**Tailwind CSS Config:**
```javascript
module.exports = {
  darkMode: 'class'
}
```

**Tailwind CSS Selector:**
```css
.dark .dark\:bg-gray-800 { }
```

---

### Pattern 3: `prefers-color-scheme` Media Query (System Preference)

**Prevalence:** Very High (All modern websites)

**Detection Selectors:**
```css
@media (prefers-color-scheme: dark) { }
@media (prefers-color-scheme: light) { }
```

**CSS Pattern:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
  
  body {
    background-color: #121212;
    color: #ffffff;
  }
}
```

**JavaScript Detection:**
```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
window.matchMedia('(prefers-color-scheme: light)').matches
```

---

### Pattern 4: `data-bs-theme` Attribute (Bootstrap 5.3+)

**Prevalence:** High (Bootstrap-based sites)

**Detection Selectors:**
```css
[data-bs-theme="dark"] { }
[data-bs-theme="light"] { }
```

**HTML Pattern:**
```html
<html data-bs-theme="dark">
<html data-bs-theme="light">
<div data-bs-theme="dark">
```

**CSS Variables Pattern:**
```css
[data-bs-theme="dark"] {
  color-scheme: dark;
  --bs-body-color: #dee2e6;
  --bs-body-bg: #212529;
  --bs-body-color-rgb: 222, 226, 230;
  --bs-body-bg-rgb: 33, 37, 41;
  --bs-emphasis-color: #fff;
  --bs-secondary-bg: #343a40;
  --bs-border-color: #495057;
}
```

**JavaScript Pattern:**
```javascript
document.documentElement.setAttribute('data-bs-theme', 'dark')
document.documentElement.setAttribute('data-bs-theme', 'light')
```

---

### Pattern 5: ThemeProvider with Context API (React)

**Prevalence:** Very High (React applications)

**Detection Patterns:**

**Component Names:**
- `ThemeProvider`
- `ThemeContext`
- `useTheme`

**JavaScript Pattern:**
```javascript
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])
}

export const useTheme = () => useContext(ThemeContext)
```

**DOM Indicators:**
- `data-theme` attribute on `<html>`
- `class="dark"` or `class="light"` on `<html>`

---

### Pattern 6: Tailwind CSS `dark:` Prefix Classes

**Prevalence:** Very High (Tailwind-based sites)

**Detection Selectors:**
```css
.dark\:bg-gray-800
.dark\:text-white
.dark\:border-gray-700
.dark\:hover:bg-gray-700
```

**HTML Pattern:**
```html
<div class="bg-white dark:bg-gray-800">
<p class="text-gray-900 dark:text-white">
<button class="dark:hover:bg-gray-700">
```

**Tailwind Config:**
```javascript
module.exports = {
  darkMode: 'class',  // or 'media'
}
```

**Tailwind v4 CSS Pattern:**
```css
@custom-variant dark (&:where(.dark, .dark *));
```

---

### Pattern 7: `color-scheme` CSS Property

**Prevalence:** High (Modern browsers, Chrome, Edge, Firefox)

**Detection Selectors:**
```css
:root {
  color-scheme: light dark;
}

[data-theme="dark"] {
  color-scheme: dark;
}
```

**HTML Meta Tag:**
```html
<meta name="color-scheme" content="light dark">
```

**CSS Pattern:**
```css
:root {
  color-scheme: light dark;
}

header {
  color-scheme: only light;
}

footer {
  color-scheme: only dark;
}
```

**Values:** `light`, `dark`, `light dark`, `only light`, `only dark`, `normal`

---

### Pattern 8: next-themes Library (Next.js)

**Prevalence:** Very High (Next.js applications)

**Detection Patterns:**

**Component Names:**
- `ThemeProvider` (from next-themes)
- `useTheme` hook
- `ThemeToggle`

**HTML Pattern:**
```html
<html class="dark" style="color-scheme: dark;">
<html class="light">
```

**JavaScript Pattern:**
```javascript
import { useTheme } from 'next-themes'

const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
setTheme('dark')
setTheme('light')
setTheme('system')
```

**localStorage Key:** `'theme'`

**Blocking Script (FOUC Prevention):**
```javascript
(function() {
  const theme = localStorage.getItem('theme')
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  if (theme === 'dark' || (!theme && systemTheme === 'dark')) {
    document.documentElement.classList.add('dark')
  }
})()
```

---

### Pattern 9: VueUse `useDark` / `useColorMode` Composables

**Prevalence:** High (Vue 3 applications)

**Detection Patterns:**

**HTML Pattern:**
```html
<html class="dark">
<html class="light">
<html theme="dark">
```

**JavaScript Pattern:**
```javascript
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

// Or useColorMode
const mode = useColorMode({
  selector: 'html',
  attribute: 'class',
  storageKey: 'vueuse-color-scheme'
})
```

**localStorage Key:** `'vueuse-color-scheme'`

**Default Class:** `.dark`

---

### Pattern 10: Material UI (MUI) Theme Provider

**Prevalence:** High (React + Material UI applications)

**Detection Patterns:**

**Component Names:**
- `ThemeProvider` (from @mui/material)
- `useColorScheme` hook
- `CssBaseline`

**CSS Variables Pattern:**
```css
:root {
  --mui-palette-primary-main: #1976d2;
  --mui-palette-background-default: #fff;
}

[data-mui-color-scheme="dark"] {
  --mui-palette-background-default: #121212;
  --mui-palette-primary-main: #90caf9;
}
```

**JavaScript Pattern:**
```javascript
import { createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: { palette: { mode: 'light' } },
    dark: { palette: { mode: 'dark' } }
  }
})

const { mode, setMode } = useColorScheme()
setMode('dark')
```

**HTML Pattern:**
```html
<html data-mui-color-scheme="dark">
<html data-test-scheme-selector="dark">  <!-- custom -->
```

---

## JavaScript-Based Dark Modes

### Why JS-Based Dark Modes Are EASIER to Detect

| Detection Vector | CSS-Only | JavaScript-Based |
|-----------------|----------|------------------|
| DOM attributes/classes | ✅ | ✅ |
| localStorage | ❌ | ✅ **(strong signal!)** |
| Event listeners | ❌ | ✅ **(observable!)** |
| Inline styles | Sometimes | ✅ **(common!)** |
| Script patterns | ❌ | ✅ **(function names!)** |
| MutationObserver targets | ❌ | ✅ **(dynamic changes!)** |

### Implementation Distribution (Estimated)

| Implementation Type | Estimated % | Notes |
|---------------------|-------------|-------|
| **JavaScript + CSS** | ~60% | Most common - toggle + persistence |
| **Framework-based (React, Vue, etc.)** | ~20% | Modern web apps |
| **Library-based (darkmode.js, etc.)** | ~5% | Quick implementations |
| **CSS-only (media query)** | ~15% | Simple sites, blogs |
| **No dark mode** | ~40-60% | Varies by site category |

**Key Insight:** The vast majority of production websites use **JavaScript-enhanced dark mode** (CSS for styling + JS for toggle/persistence) rather than pure CSS-only solutions because:
1. User preference persistence requires localStorage
2. Manual toggle requires JavaScript
3. Framework integration requires JS

---

### Common JavaScript Patterns

#### 1. classList.toggle/add/remove on html/body Elements

**Most Common Pattern:**
```javascript
// Toggle on body
document.body.classList.toggle('dark-mode');

// Toggle on html
document.documentElement.classList.toggle('dark');

// Add/remove pattern
if (isDark) {
  document.body.classList.add('dark-theme');
} else {
  document.body.classList.remove('dark-theme');
}
```

**Detection Signatures:**
- Class names: `dark`, `dark-mode`, `dark-theme`, `light`, `light-mode`
- Target elements: `<html>`, `<body>`, `<div id="root">`

#### 2. setAttribute for data-theme Attributes

**Recommended Modern Pattern:**
```javascript
// Set data-theme on html element
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');

// Get current theme
const currentTheme = document.documentElement.getAttribute('data-theme');
```

**Detection Signatures:**
- Attribute: `data-theme="dark"` or `data-theme="light"`
- Alternative attributes: `data-mode`, `theme`, `color-mode`

#### 3. Inline Style Manipulation

**Direct Style Approach:**
```javascript
// Using document.body.style
document.body.style.backgroundColor = '#121212';
document.body.style.color = '#ffffff';

// Using CSS custom properties at runtime
document.documentElement.style.setProperty('--bg-color', '#121212');
document.documentElement.style.setProperty('--text-color', '#ffffff');

// color-scheme property
document.documentElement.style.colorScheme = 'dark';
```

**Detection Signatures:**
- Inline styles on `<html>` or `<body>`
- CSS custom properties with theme-related names
- `colorScheme` style property

#### 4. localStorage Patterns for Persistence

**Standard Implementation:**
```javascript
// Save theme preference
localStorage.setItem('theme', 'dark');
localStorage.setItem('theme', 'light');

// Read theme preference
const savedTheme = localStorage.getItem('theme');

// Common pattern with fallback
function getTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
```

#### 5. IIFE for FOUC Prevention

**Critical Pattern - Runs Before First Paint:**
```javascript
// Inline script in <head> - blocks rendering
(function() {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
```

**Detection:** Look for inline `<script>` tags in `<head>` containing:
- `localStorage.getItem('theme')`
- `matchMedia` calls
- `setAttribute` on `documentElement`

#### 6. Event Listeners on Toggle Buttons

**Standard Toggle Implementation:**
```javascript
const button = document.querySelector('[data-theme-toggle]');
button.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

#### 7. System Preference Detection with matchMedia

**Standard Detection Pattern:**
```javascript
// Check current preference
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Listen for changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    // Switched to dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    // Switched to light mode
    document.documentElement.setAttribute('data-theme', 'light');
  }
});
```

**Detection:** Search for `matchMedia` calls with `prefers-color-scheme`

---

## Detection Strategies

### The 5 Most Reliable Detection Signals

#### 1. localStorage Keys (Very High Confidence)

```javascript
const themeKeys = [
  'theme',                    // most common
  'darkMode',
  'dark-mode',
  'color-scheme',
  'theme-preference',
  'vueuse-color-scheme',      // VueUse
  'my-theme'                  // custom
];

// Detection
if (localStorage.getItem('theme') === 'dark') {
  // Dark Mode active!
}
```

#### 2. DOM Attributes (High Confidence)

```html
<html data-theme="dark">
<html data-mode="dark">
<html color-mode="dark">
<html class="dark">
<body class="dark-mode">
```

#### 3. Library Signatures (Very High Confidence)

```javascript
// darkmode.js
.darkmode-layer
.darkmode-toggle
.darkmode--activated

// Dark Reader
[class*="darkreader"]
window.DarkReader

// next-themes
ThemeProvider
useTheme Hook
```

#### 4. Toggle Buttons (High Confidence)

```javascript
const selectors = [
  '[data-theme-toggle]',
  '.theme-toggle',
  '.dark-mode-toggle',
  '[aria-label*="dark"]',
  '[aria-label*="theme"]',
  '[onclick*="theme"]'
];
```

#### 5. MutationObserver (Medium-High Confidence)

```javascript
// Observe theme changes live
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'data-theme' ||
        mutation.attributeName === 'class') {
      console.log('Theme change detected!');
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class', 'data-theme', 'data-mode']
});
```

---

### CSS Selectors to Detect (Priority Order)

1. `[data-theme="dark"]` / `[data-theme="light"]`
2. `html.dark` / `html.light`
3. `body.dark` / `body.light`
4. `[data-bs-theme="dark"]` / `[data-bs-theme="light"]`
5. `@media (prefers-color-scheme: dark)`
6. `.dark\:bg-` (Tailwind classes)
7. `[data-mui-color-scheme="dark"]`
8. `color-scheme: dark`

### JavaScript Patterns to Detect

1. `localStorage.getItem('theme')` / `localStorage.setItem('theme'`
2. `localStorage.getItem('vueuse-color-scheme')`
3. `document.documentElement.setAttribute('data-theme'`
4. `document.documentElement.classList.add('dark')`
5. `document.documentElement.classList.remove('dark')`
6. `window.matchMedia('(prefers-color-scheme: dark)'`
7. `useTheme` / `ThemeProvider` / `useColorScheme`

### HTML Attributes to Detect

1. `data-theme="dark"` / `data-theme="light"`
2. `class="dark"` / `class="light"` (on html/body)
3. `data-bs-theme="dark"` / `data-bs-theme="light"`
4. `data-mui-color-scheme="dark"`
5. `<meta name="color-scheme"`

### Common Class Names

- `.dark`
- `.light`
- `.dark-mode`
- `.light-mode`
- `.dark-theme`
- `.light-theme`
- `.theme-dark`
- `.theme-light`

### Common localStorage Keys

- `'theme'`
- `'vueuse-color-scheme'`
- `'vite-ui-theme'`
- `'color-scheme'`
- `'darkMode'`

### Function Names to Look For

```javascript
const functionNames = [
  // Common toggle functions
  'toggleDarkMode',
  'toggleTheme',
  'enableDarkMode',
  'disableDarkMode',
  'setTheme',
  'setDarkMode',
  'switchTheme',
  'changeTheme',
  
  // React hooks
  'useTheme',
  'useDarkMode',
  'useColorScheme',
  
  // Library functions
  'DarkReader.enable',
  'DarkReader.disable',
  'Darkmode.toggle',
  'Darkmode.isActivated',
  
  // Variable names
  'isDark',
  'isDarkMode',
  'darkMode',
  'theme',
  'currentTheme',
  'themePreference'
];
```

### DOM Mutations to Observe

```javascript
// MutationObserver configuration for theme detection
const themeObserverConfig = {
  attributes: true,
  attributeFilter: ['class', 'data-theme', 'data-mode', 'color-mode', 'style'],
  subtree: false,
  childList: false
};

// Target elements
const targets = [
  document.documentElement,
  document.body,
  document.getElementById('root'),
  document.getElementById('app'),
  document.getElementById('__next')
];

// Observe all targets
targets.forEach(target => {
  if (target) {
    observer.observe(target, themeObserverConfig);
  }
});
```

### Event Patterns to Detect

```javascript
// Listen for storage events (cross-tab theme changes)
window.addEventListener('storage', (e) => {
  if (localStorageKeys.includes(e.key)) {
    console.log('Theme changed in another tab:', e.newValue);
  }
});

// Listen for click events on potential toggle buttons
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('[data-theme-toggle]') ||
      target.matches('.theme-toggle') ||
      target.matches('[aria-label*="theme"]') ||
      target.matches('[aria-label*="dark"]')) {
    console.log('Theme toggle clicked');
  }
});
```

---

## Framework-Specific Patterns

### React/Next.js with next-themes

```javascript
// Detection patterns
const nextThemesSignals = {
  // Provider component
  provider: 'ThemeProvider',
  
  // Hook
  hook: 'useTheme',
  
  // localStorage key (default)
  storageKey: 'theme',
  
  // HTML attribute
  attribute: 'class', // or 'data-theme'
  
  // Class names
  classes: ['dark', 'light'],
  
  // SSR script pattern
  ssrScript: 'function(){try{var e=localStorage.getItem("theme")'
};
```

### Material UI (MUI)

```javascript
const muiSignals = {
  // Theme configuration
  paletteMode: 'dark',
  
  // Components
  components: ['ThemeProvider', 'CssBaseline'],
  
  // Hooks
  hooks: ['useTheme', 'useColorScheme', 'useMediaQuery'],
  
  // Data attribute
  attribute: 'data-mui-color-scheme'
};
```

### Tailwind CSS

```javascript
const tailwindSignals = {
  // Config option
  darkMode: 'class', // or 'media'
  
  // Class prefix
  prefix: 'dark:',
  
  // Example classes to look for
  classPatterns: ['dark:bg-', 'dark:text-', 'dark:border-'],
  
  // CSS variables (Tailwind 4)
  cssVariables: ['--color-background', '--color-foreground']
};
```

### Vue.js

```javascript
const vueSignals = {
  // Common composable
  composable: 'useDark',
  
  // VueUse library
  vueUse: 'useColorMode',
  
  // localStorage key
  storageKey: 'color-scheme',
  
  // Attribute
  attribute: 'class'
};
```

---

## Popular Libraries

### darkmode.js

**GitHub:** https://github.com/sandoche/Darkmode.js

**How It Works:**
- Uses CSS `mix-blend-mode: difference` to invert colors
- Creates an overlay layer (`.darkmode-layer`)
- Adds toggle button (`.darkmode-toggle`)
- Stores preference in localStorage/cookies

**Detection Signatures:**
```javascript
// Library creates these elements
.darkmode-layer
.darkmode-toggle
.darkmode--activated (class on body)
.darkmode-ignore (elements to exclude)

// Methods to detect
new Darkmode().isActivated() // returns true/false
```

**Configuration:**
```javascript
const options = {
  bottom: '64px',
  right: 'unset',
  left: '32px',
  time: '0.5s',
  mixColor: '#fff',
  backgroundColor: '#fff',
  buttonColorDark: '#100f2c',
  buttonColorLight: '#fff',
  saveInCookies: false,
  label: '🌓',
  autoMatchOsTheme: true
}
```

### Dark Reader

**GitHub:** https://github.com/darkreader/darkreader  
**NPM:** `darkreader`

**How It Works:**
- Analyzes web pages dynamically
- Generates dark mode CSS using filters
- Applies brightness, contrast, sepia adjustments
- Uses CSS filters: `invert()`, `brightness()`, `contrast()`, `sepia()`

**API Usage:**
```javascript
import { enable as enableDarkMode, disable as disableDarkMode } from 'darkreader';

// Enable dark mode
DarkReader.enable({
  brightness: 100,
  contrast: 90,
  sepia: 10
});

// Disable
DarkReader.disable();

// Auto based on system
DarkReader.auto();

// Export generated CSS
const CSS = await DarkReader.exportGeneratedCSS();

// Check status
const isEnabled = DarkReader.isEnabled();
```

**Detection Signatures:**
- `darkreader` class names
- Inline styles with `filter: invert()`
- Generated `<style>` tags with dark reader comments

### next-themes (Next.js/React)

**GitHub:** https://github.com/pacocoursey/next-themes  
**Size:** < 1 KB gzipped

**How It Works:**
- Injects blocking script in `<head>` to prevent FOUC
- Uses `localStorage` with key `theme` (configurable)
- Supports `class` or `data-theme` attribute strategies
- Syncs across browser tabs

**Detection Signatures:**
```html
<!-- Provider configuration -->
<html class="dark" suppressHydrationWarning>

<!-- localStorage key -->
localStorage.getItem('theme') // 'dark' | 'light'

<!-- Storage key can be customized -->
storageKey="my-theme"
```

### Other Notable Libraries

| Library | Framework | Detection Signature |
|---------|-----------|---------------------|
| `useDarkMode` | React Hook | localStorage key `theme` |
| `next-themes` | Next.js | `ThemeProvider`, `useTheme` hook |
| `@mui/material` | React | `palette.mode`, `useColorScheme` |
| `shadcn/ui` | React | Uses `next-themes` internally |
| `Tailwind CSS` | CSS Framework | `dark:` prefix classes |

---

## Complete Detection Algorithm

### Quick Detection Script

```javascript
function detectDarkMode() {
  const signals = {
    dom: false,
    storage: false,
    library: false,
    styles: false,
    events: false
  };

  // 1. DOM Check
  const html = document.documentElement;
  const body = document.body;
  
  if (html.getAttribute('data-theme') === 'dark' ||
      html.getAttribute('data-mode') === 'dark' ||
      html.classList.contains('dark') ||
      body.classList.contains('dark-mode')) {
    signals.dom = true;
  }

  // 2. localStorage Check
  const themeKeys = ['theme', 'darkMode', 'dark-mode', 'color-scheme'];
  for (const key of themeKeys) {
    try {
      if (localStorage.getItem(key) === 'dark') {
        signals.storage = true;
        break;
      }
    } catch (e) {}
  }

  // 3. Library Check
  if (document.querySelector('.darkmode-layer, .darkmode-toggle') ||
      window.DarkReader ||
      document.querySelector('[class*="darkreader"]')) {
    signals.library = true;
  }

  // 4. Style Check
  const styles = getComputedStyle(document.documentElement);
  const bgColor = styles.getPropertyValue('--background') || 
                  getComputedStyle(body).backgroundColor;
  
  if (bgColor && (bgColor.includes('#1') || bgColor.includes('rgb(1'))) {
    signals.styles = true;
  }

  // 5. Event Listener Check (requires MutationObserver setup)
  // This would be set up separately

  const confidence = Object.values(signals).filter(Boolean).length;
  
  return {
    hasDarkMode: confidence > 0,
    confidence: confidence >= 3 ? 'high' : confidence === 2 ? 'medium' : 'low',
    signals,
    details: {
      currentTheme: html.getAttribute('data-theme') || 
                    (html.classList.contains('dark') ? 'dark' : 'light'),
      implementation: signals.library ? 'library' : 
                      signals.dom ? 'custom' : 'unknown'
    }
  };
}
```

### Comprehensive Detection Class

```javascript
class DarkModeDetector {
  constructor() {
    this.signals = [];
    this.observer = null;
  }

  // 1. Check DOM attributes
  checkDOMAttributes() {
    const html = document.documentElement;
    const body = document.body;
    
    const checks = [
      { element: html, attribute: 'data-theme', value: 'dark' },
      { element: html, attribute: 'data-mode', value: 'dark' },
      { element: html, attribute: 'color-mode', value: 'dark' },
      { element: body, attribute: 'class', contains: 'dark' },
      { element: html, attribute: 'class', contains: 'dark' },
    ];

    checks.forEach(({ element, attribute, value, contains }) => {
      if (contains) {
        if (element.getAttribute(attribute)?.includes(contains) ||
            element.classList?.contains(contains)) {
          this.signals.push({ type: 'dom-attribute', confidence: 'high' });
        }
      } else {
        if (element.getAttribute(attribute) === value) {
          this.signals.push({ type: 'dom-attribute', confidence: 'high' });
        }
      }
    });
  }

  // 2. Check localStorage
  checkLocalStorage() {
    const keys = ['theme', 'darkMode', 'dark-mode', 'theme-preference', 
                  'color-scheme', 'dark_mode_pref'];
    
    keys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value === 'dark' || value === 'enabled' || value === 'true') {
          this.signals.push({ type: 'localStorage', key, value, confidence: 'very-high' });
        }
      } catch (e) {}
    });
  }

  // 3. Check computed styles
  checkComputedStyles() {
    const styles = getComputedStyle(document.documentElement);
    const bodyStyles = getComputedStyle(document.body);
    
    // Check for dark background colors
    const bgColor = styles.getPropertyValue('--background') || 
                    bodyStyles.backgroundColor;
    
    if (this.isDarkColor(bgColor)) {
      this.signals.push({ type: 'computed-style', confidence: 'medium' });
    }
  }

  // 4. Check for library signatures
  checkLibrarySignatures() {
    // darkmode.js
    if (document.querySelector('.darkmode-layer, .darkmode-toggle')) {
      this.signals.push({ type: 'library', name: 'darkmode.js', confidence: 'very-high' });
    }
    
    // Dark Reader
    if (document.querySelector('[class*="darkreader"]')) {
      this.signals.push({ type: 'library', name: 'darkreader', confidence: 'very-high' });
    }
    
    // Check for darkreader API
    if (window.DarkReader) {
      this.signals.push({ type: 'library', name: 'darkreader', confidence: 'very-high' });
    }
  }

  // 5. Check for matchMedia listeners
  checkMatchMedia() {
    try {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // This alone doesn't mean site has dark mode, but combined with other signals...
    } catch (e) {}
  }

  // 6. Monitor for theme toggle buttons
  checkToggleButtons() {
    const selectors = [
      '[data-theme-toggle]',
      '[aria-label*="dark"]',
      '[aria-label*="theme"]',
      '[onclick*="theme"]',
      '[onclick*="dark"]',
      '.theme-toggle',
      '.dark-mode-toggle',
      'button[id*="theme"]',
    ];

    selectors.forEach(selector => {
      if (document.querySelector(selector)) {
        this.signals.push({ type: 'toggle-button', selector, confidence: 'high' });
      }
    });
  }

  isDarkColor(color) {
    // Parse RGB/HSL and determine if dark
    // Simplified check
    return color.includes('121212') || color.includes('#111') || color.includes('#000');
  }

  // Setup MutationObserver for dynamic changes
  setupObserver() {
    const themeObserverConfig = {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-mode', 'color-mode', 'style'],
      subtree: false,
      childList: false
    };

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-theme' || 
              mutation.attributeName === 'class') {
            console.log('Theme change detected!');
          }
        }
      });
    });

    // Target elements
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById('root'),
      document.getElementById('app'),
      document.getElementById('__next')
    ];

    // Observe all targets
    targets.forEach(target => {
      if (target) {
        this.observer.observe(target, themeObserverConfig);
      }
    });
  }

  detect() {
    this.checkDOMAttributes();
    this.checkLocalStorage();
    this.checkComputedStyles();
    this.checkLibrarySignatures();
    this.checkMatchMedia();
    this.checkToggleButtons();
    
    return {
      hasDarkMode: this.signals.length > 0,
      confidence: this.calculateConfidence(),
      signals: this.signals
    };
  }

  calculateConfidence() {
    const weights = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
    const total = this.signals.reduce((sum, s) => sum + weights[s.confidence], 0);
    
    if (total >= 8) return 'very-high';
    if (total >= 5) return 'high';
    if (total >= 2) return 'medium';
    return 'low';
  }
}

// Usage in content script
const detector = new DarkModeDetector();
const result = detector.detect();
console.log('Dark mode detected:', result);
```

---

## Statistics & Adoption Rates

### User Adoption

| Metric | Value | Source |
|--------|-------|--------|
| Smartphone users with dark mode enabled (2025) | **82%** | Thrive Agency |
| Apple users with dark mode | **>50%** | Thrive Agency |
| Dark mode in web design searches | **55%** of all web design searches | eDesign Interactive |
| Email clients using dark mode (2022) | **35%** | Litmus |

### Implementation Distribution

| Implementation Type | Estimated % | Notes |
|---------------------|-------------|-------|
| **JavaScript + CSS** | ~60% | Most common - toggle + persistence |
| **Framework-based (React, Vue, etc.)** | ~20% | Modern web apps |
| **Library-based (darkmode.js, etc.)** | ~5% | Quick implementations |
| **CSS-only (media query)** | ~15% | Simple sites, blogs |
| **No dark mode** | ~40-60% | Varies by site category |

---

## Summary: Key Takeaways

1. **JavaScript-based dark modes are EASIER to detect** than CSS-only because they leave multiple traces (localStorage, event listeners, DOM mutations)

2. **Most reliable detection signals** (in order):
   - localStorage keys (`theme`, `darkMode`)
   - DOM attributes (`data-theme="dark"`)
   - Class names on html/body (`.dark`, `.dark-mode`)
   - Library signatures (`.darkmode-layer`, `DarkReader`)
   - Toggle buttons (`[data-theme-toggle]`)

3. **MutationObserver is essential** for detecting dynamic theme changes

4. **~60-80% of websites with dark mode** use JavaScript-enhanced implementations (not CSS-only)

5. **Popular libraries leave clear signatures** that are easy to detect

6. **No effective obfuscation exists** - all implementations leave detectable traces

---

## Resources

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [darkmode.js](https://github.com/sandoche/Darkmode.js)
- [Dark Reader](https://github.com/darkreader/darkreader)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)

---

*Research compiled for browser extension development - Dark Mode Indicator*
