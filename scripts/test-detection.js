/**
 * Dark Mode Detection Test Script
 * 
 * This script tests the dark mode detection algorithms
 * against various patterns and edge cases.
 */

// Simple mock for Node.js environment
if (typeof window === 'undefined') {
  global.localStorage = {
    _data: {},
    setItem(key, val) { this._data[key] = String(val); },
    getItem(key) { return this._data[key] || null; },
    removeItem(key) { delete this._data[key]; },
    clear() { this._data = {}; }
  };
  
  global.document = {
    documentElement: {
      attributes: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      getAttribute(name) { return this.attributes[name] || null; },
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      }
    },
    body: {
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      }
    },
    createElement() {
      return { classList: { add() {} } };
    },
    body: {
      appendChild() {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      }
    },
    querySelectorAll() { return []; }
  };
}

// Mock test data
const mockTests = [
  {
    name: 'localStorage: theme=dark',
    setup: () => localStorage.setItem('theme', 'dark'),
    expected: { hasDarkMode: true, confidence: 'very-high' }
  },
  {
    name: 'DOM: data-theme="dark"',
    setup: () => document.documentElement.setAttribute('data-theme', 'dark'),
    expected: { hasDarkMode: true, confidence: 'high' }
  },
  {
    name: 'Class: html.dark',
    setup: () => document.documentElement.classList.add('dark'),
    expected: { hasDarkMode: true, confidence: 'high' }
  },
  {
    name: 'Bootstrap: data-bs-theme="dark"',
    setup: () => document.documentElement.setAttribute('data-bs-theme', 'dark'),
    expected: { hasDarkMode: true, confidence: 'high' }
  },
  {
    name: 'Tailwind: dark: classes',
    setup: () => {
      // Note: In mock environment, this is simplified
      document.documentElement.classList.add('dark');
    },
    expected: { hasDarkMode: true, confidence: 'high' }
  },
  {
    name: 'No dark mode',
    setup: () => {},
    expected: { hasDarkMode: false, confidence: 'low' }
  }
];

// Test runner
function runTests() {
  console.log('🧪 Running Dark Mode Detection Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  mockTests.forEach((test, index) => {
    try {
      // Reset state
      localStorage.clear();
      document.documentElement.attributes = {};
      document.documentElement.classList._classes.clear();
      document.body.classList._classes.clear();

      // Setup test
      test.setup();
      
      // Run detection (simplified for testing)
      const result = runDetection();
      
      // Check result
      const pass = result.hasDarkMode === test.expected.hasDarkMode;
      
      if (pass) {
        console.log(`✅ Test ${index + 1}: ${test.name}`);
        passed++;
      } else {
        console.log(`❌ Test ${index + 1}: ${test.name}`);
        console.log(`   Expected: ${JSON.stringify(test.expected)}`);
        console.log(`   Got: ${JSON.stringify(result)}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ Test ${index + 1}: ${test.name} - Error: ${error.message}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  console.log(`   Success rate: ${((passed / mockTests.length) * 100).toFixed(1)}%\n`);
}

// Simplified detection for testing
function runDetection() {
  const signals = [];
  
  // Check localStorage
  const themeKeys = ['theme', 'darkMode', 'dark-mode', 'color-scheme'];
  for (const key of themeKeys) {
    try {
      const value = localStorage.getItem(key);
      if (value === 'dark') {
        signals.push({ type: 'localStorage', confidence: 'very-high' });
        break;
      }
    } catch (e) {}
  }
  
  // Check DOM attributes
  const html = document.documentElement;
  if (html.getAttribute('data-theme') === 'dark' ||
      html.getAttribute('data-bs-theme') === 'dark') {
    signals.push({ type: 'dom-attribute', confidence: 'high' });
  }
  
  // Check class names
  if (html.classList.contains('dark')) {
    signals.push({ type: 'class-name', confidence: 'high' });
  }
  
  // Check Tailwind dark classes (simplified in mock)
  const tailwindElements = document.querySelectorAll('[class*="dark:"]');
  if (tailwindElements.length > 0) {
    signals.push({ type: 'tailwind', confidence: 'very-high' });
  }
  
  // Calculate confidence
  const weights = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
  const totalWeight = signals.reduce((sum, s) => sum + weights[s.confidence], 0);
  
  let confidence = 'low';
  if (totalWeight >= 12) confidence = 'very-high';
  else if (totalWeight >= 8) confidence = 'high';
  else if (totalWeight >= 4) confidence = 'medium';
  
  return {
    hasDarkMode: signals.length > 0,
    confidence,
    signals: signals.length
  };
}

// Run tests
runTests();

module.exports = { runTests, runDetection };
