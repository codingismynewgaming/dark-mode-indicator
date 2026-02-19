/**
 * Dark Mode Detection - Browser Extension Content Script
 * 
 * This is an example implementation showing how to use
 * the dark mode detection patterns in a browser extension.
 */

class DarkModeDetector {
  constructor() {
    this.signals = [];
    this.observer = null;
  }

  /**
   * Main detection method - runs all checks
   */
  detect() {
    this.signals = [];
    
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
      summary: this.generateSummary(),
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
  }

  /**
   * Check localStorage for theme keys (CRITICAL - 95%+ confidence)
   */
  checkLocalStorage() {
    const keys = [
      'theme',
      'darkMode',
      'dark-mode',
      'color-scheme',
      'vueuse-color-scheme',
      'vite-ui-theme',
      'my-theme'
    ];
    
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
      } catch (e) {
        // Cross-origin restriction
      }
    });
  }

  /**
   * Check DOM attributes (CRITICAL - 90%+ confidence)
   */
  checkDOMAttributes() {
    const html = document.documentElement;
    const body = document.body;
    
    const checks = [
      { element: html, attribute: 'data-theme', value: 'dark' },
      { element: html, attribute: 'data-theme', value: 'light' },
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

  /**
   * Check class names on html/body (HIGH - 85%+ confidence)
   */
  checkClassNames() {
    const html = document.documentElement;
    const body = document.body;
    const classNames = [
      'dark', 'light',
      'dark-mode', 'light-mode',
      'dark-theme', 'light-theme',
      'theme-dark', 'theme-light'
    ];
    
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

  /**
   * Check for library signatures (VERY HIGH - 95%+ confidence)
   */
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

  /**
   * Check for toggle buttons (HIGH - 80%+ confidence)
   */
  checkToggleButtons() {
    const selectors = [
      '[data-theme-toggle]',
      '[data-toggle-theme]',
      '.theme-toggle',
      '.theme-switch',
      '.theme-switcher',
      '.dark-mode-toggle',
      '.dark-mode-switch',
      '[aria-label*="dark"]',
      '[aria-label*="light"]',
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

  /**
   * Check CSS custom properties (MEDIUM - 70%+ confidence)
   */
  checkCSSCustomProperties() {
    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue('--background').trim();
    const text = styles.getPropertyValue('--text-color').trim();
    
    if (bg && this.isDarkColor(bg)) {
      this.signals.push({
        type: 'css-custom-property',
        property: '--background',
        value: bg,
        confidence: 'medium',
        weight: 2
      });
    }
    
    if (text && this.isLightColor(text)) {
      this.signals.push({
        type: 'css-custom-property',
        property: '--text-color',
        value: text,
        confidence: 'medium',
        weight: 2
      });
    }
  }

  /**
   * Check prefers-color-scheme (LOW - 40%+ confidence)
   */
  checkPrefersColorScheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.signals.push({
      type: 'system-preference',
      prefersDark: isDark,
      confidence: 'low',
      weight: 1
    });
  }

  /**
   * Check color-scheme CSS property (MEDIUM - 70%+ confidence)
   */
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

  /**
   * Check Tailwind dark: classes (VERY HIGH - 95%+ confidence)
   */
  checkTailwindDarkClasses() {
    const allElements = document.querySelectorAll('*');
    let hasDarkClasses = false;
    let darkClasses = [];
    
    allElements.forEach(el => {
      el.classList.forEach(cls => {
        if (cls.startsWith('dark:')) {
          hasDarkClasses = true;
          if (darkClasses.length < 5) {
            darkClasses.push(cls);
          }
        }
      });
    });
    
    if (hasDarkClasses) {
      this.signals.push({
        type: 'tailwind-dark-classes',
        classes: darkClasses,
        confidence: 'very-high',
        weight: 4
      });
    }
  }

  /**
   * Check if color is dark
   */
  isDarkColor(color) {
    return this.getLuminance(color) < 0.5;
  }

  /**
   * Check if color is light
   */
  isLightColor(color) {
    return this.getLuminance(color) > 0.5;
  }

  /**
   * Calculate luminance of a color
   */
  getLuminance(color) {
    if (!color) return 0;
    
    // Hex
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      }
    }
    
    // RGB
    if (color.startsWith('rgb')) {
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      }
    }
    
    return 0;
  }

  /**
   * Calculate overall confidence
   */
  calculateConfidence() {
    const weights = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
    const totalWeight = this.signals.reduce((sum, s) => sum + (s.weight || 0), 0);
    
    if (totalWeight >= 12) return 'very-high';
    if (totalWeight >= 8) return 'high';
    if (totalWeight >= 4) return 'medium';
    return 'low';
  }

  /**
   * Get current theme
   */
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
    if (html.getAttribute('data-bs-theme')) return html.getAttribute('data-bs-theme');
    if (html.classList.contains('dark')) return 'dark';
    if (html.classList.contains('light')) return 'light';
    
    return 'unknown';
  }

  /**
   * Detect implementation type
   */
  detectImplementationType() {
    const types = new Set();
    
    this.signals.forEach(signal => {
      if (signal.type === 'localStorage') types.add('javascript');
      if (signal.type === 'dom-attribute') types.add('custom');
      if (signal.type === 'class-name') types.add('tailwind-or-custom');
      if (signal.type === 'library') types.add(signal.name);
      if (signal.type === 'tailwind-dark-classes') types.add('tailwind');
      if (signal.type === 'dom-attribute' && signal.attribute?.includes('bs-theme')) {
        types.add('bootstrap');
      }
      if (signal.type === 'dom-attribute' && signal.attribute?.includes('mui-color-scheme')) {
        types.add('material-ui');
      }
    });
    
    return Array.from(types);
  }

  /**
   * Generate summary
   */
  generateSummary() {
    return {
      totalSignals: this.signals.length,
      criticalSignals: this.signals.filter(s => s.confidence === 'very-high').length,
      highSignals: this.signals.filter(s => s.confidence === 'high').length,
      mediumSignals: this.signals.filter(s => s.confidence === 'medium').length,
      lowSignals: this.signals.filter(s => s.confidence === 'low').length,
      implementationTypes: this.detectImplementationType(),
      detectedLibraries: this.signals
        .filter(s => s.type === 'library')
        .map(s => s.name)
    };
  }

  /**
   * Setup MutationObserver for dynamic theme changes
   */
  setupObserver(callback) {
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById('root'),
      document.getElementById('app'),
      document.getElementById('__next')
    ].filter(Boolean);
    
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const attr = mutation.attributeName;
          if (['class', 'data-theme', 'data-mode', 'color-mode', 'data-bs-theme'].includes(attr)) {
            callback({
              type: 'theme-change',
              attribute: attr,
              oldValue: mutation.oldValue,
              newValue: mutation.target.getAttribute(attr),
              timestamp: new Date().toISOString()
            });
            
            // Re-run detection
            setTimeout(() => {
              const result = this.detect();
              callback({
                type: 'detection-update',
                result,
                timestamp: new Date().toISOString()
              });
            }, 100);
          }
        }
      });
    });
    
    targets.forEach(target => {
      this.observer.observe(target, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode', 'color-mode', 'data-bs-theme', 'style']
      });
    });
    
    return () => this.observer.disconnect();
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.signals = [];
  }
}

// Export for use in browser extension
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DarkModeDetector;
}

// Auto-run in browser
if (typeof window !== 'undefined') {
  window.DarkModeDetector = DarkModeDetector;
  
  // Example usage
  console.log('🔍 Dark Mode Detector loaded');
  
  // Run initial detection
  const detector = new DarkModeDetector();
  const result = detector.detect();
  console.log('📊 Dark Mode Detection Result:', result);
  
  // Setup live monitoring
  const unobserve = detector.setupObserver((change) => {
    console.log('🔄 Theme change detected:', change);
  });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    unobserve();
    detector.destroy();
  });
}
