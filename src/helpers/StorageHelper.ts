import { StorageKey } from '../dto';
import { browser } from 'wxt/browser';
import { StorageItemKey, WxtStorageItem, WxtStorageItemOptions, storage, StorageArea } from 'wxt/storage';

export default class StorageHelper {

  static defineItem<T>(key: StorageItemKey, options: WxtStorageItemOptions<T>): WxtStorageItem<T, {}> {
    const item = storage.defineItem(key, options);
    return item;
  }

  /**
   * Given a key, get related value from storage
   * @param key 
   */
  static async get<T>(key: StorageItemKey): Promise<T | undefined> {
    try {
      const item = await storage.getItem<T>(key);
      return item ?? undefined; // Handle null case
    } catch (error) {
      console.error('Error getting item from storage:', error);
      throw error;
    }
  }

  static async getItems<T>(keys: StorageItemKey[]): Promise<T[]> {
    try {
      const storageItems = await storage.getItems(keys);
      return storageItems.map(storageItem => storageItem.value) as T[];
    } catch (error) {
      return [];
    }
  }

  static async set<T>(key: StorageItemKey, value: T): Promise<void> {
    try {
      await storage.setItem<T>(key, value);
    } catch (error) {
      console.error('Error setting item in storage:', error);
      throw error;
    }
  }

  static async setItems(items: { key: StorageItemKey, value: any }[]): Promise<void> {
    return storage.setItems(items);
  }

  static async remove(key: StorageItemKey): Promise<void> {
    try {
      await storage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from storage:', error);
      throw error;
    }
  }

  //TODO change to handle storage.managed and keep organization
  static async clear(): Promise<void> {
    try {
      const storageValues = await browser.storage.local.get();
      const localStorageKeys = Object.keys(storageValues).map(key => `local:${key}`) as StorageItemKey[];
      await storage.removeItems(localStorageKeys.filter(key => key !== `local:${StorageKey.ORGANIZATION}`));
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  static async watch<T>(key: StorageItemKey, callback: (newValue: T | null, oldValue: T | null) => void): Promise<void> {
    try {
      storage.watch<T>(key, callback);
    } catch (error) {
      console.error('Error watching item in storage:', error);
      throw error;
    }
  }
}
