/**
 * localStorage polyfill untuk SSR (Server Side Rendering)
 * Polyfill ini memastikan localStorage tersedia di Node.js environment
 * tanpa benar-benar menyimpan data (karena tidak diperlukan di server)
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Create a mock localStorage for SSR
const mockLocalStorage = {
  _data: {} as Record<string, string>,
  
  getItem(key: string): string | null {
    if (isBrowser) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return this._data[key] || null;
  },
  
  setItem(key: string, value: string): void {
    if (isBrowser) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Silently ignore errors in SSR
      }
    } else {
      this._data[key] = value;
    }
  },
  
  removeItem(key: string): void {
    if (isBrowser) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Silently ignore errors in SSR
      }
    } else {
      delete this._data[key];
    }
  },
  
  clear(): void {
    if (isBrowser) {
      try {
        window.localStorage.clear();
      } catch {
        // Silently ignore errors in SSR
      }
    } else {
      this._data = {};
    }
  },
  
  get length(): number {
    if (isBrowser) {
      try {
        return window.localStorage.length;
      } catch {
        return 0;
      }
    }
    return Object.keys(this._data).length;
  },
  
  key(index: number): string | null {
    if (isBrowser) {
      try {
        return window.localStorage.key(index);
      } catch {
        return null;
      }
    }
    const keys = Object.keys(this._data);
    return keys[index] || null;
  }
};

// Only apply polyfill in Node.js environment (SSR)
if (typeof window === 'undefined') {
  // @ts-ignore - We're adding localStorage to globalThis for SSR
  globalThis.localStorage = mockLocalStorage;
}

// Export for potential use
export const localStoragePolyfill = mockLocalStorage;
