import type { StoragePort } from '../../domain/ports';

export class LocalStorageAdapter implements StoragePort {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // private mode / quota - persistence is optional
    }
  }
}
