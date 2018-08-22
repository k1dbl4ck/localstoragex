import { localStoragePrototypeDefintion } from './localStorage.model';
export declare class LocalStorageX {
    cache: any;
    driver: any;
    store: any;
    loaded: boolean;
    defines: localStoragePrototypeDefintion[];
    config: any;
    constructor();
    init(refresh?: boolean): Promise<void>;
    /**
     * Reloads (re-initializes) localstoragex
     */
    private reload;
    /**
     * Waits for cordova to be ready if implemented
     * @returns {Promise<any>}
     */
    private ready;
    /**
     * Sets a value to localStorage by key
     *
     * @param {string} key
     * @param {any} value
     * @returns {Promise<any>}
     */
    setItem(key: string, value: any): Promise<void>;
    /**
     * Gets value from localStorage by key
     *
     * @param {string} key
     * @returns {<any>}
     */
    getItem(key: string): any;
    /**
     * Removes value in localStorage by key
     *
     * @param {string} key
     */
    removeItem(key: string): Promise<void>;
    /**
     * Returns a key name by index
     *
     * @param {number} index
     * @returns {string || null}
     */
    key(index: number): string | null;
    /**
     * Returns the total length of stored values
     *
     * @returns {number || null}
     */
    length(): number | null;
    /**
     * Clears all stored values
     */
    clear(): Promise<void>;
    /**
     * Implicitly indicates if window.localstorage was overwritten (redefined by this class)
     */
    override(): boolean;
}
export declare let storage: LocalStorageX;
