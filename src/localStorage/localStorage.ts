import * as localForage from  "localforage";
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { localStoragePrototypeDefintion } from './localStorage.model'; 

export class LocalStorageX {

    cache:any = {}; 
    driver:any; 
    store:any = false; 
    loaded:boolean = false; 
    defines:localStoragePrototypeDefintion[] = [
        { name: 'setItem', value:this.setItem }, 
        { name: 'getItem', value:this.getItem }, 
        { name: 'removeItem', value:this.removeItem }, 
        { name: 'key', value:this.key }, 
        { name: 'clear', value:this.clear }, 
        { name: 'override', value: this.override }  
    ];
    config:any =  {
        name: 'localStorageX',
        storeName: 'localStorageX',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    } 

    constructor() {}

    public async init() { 

        if(this.loaded) return; 

        try { 

            await this.ready(); 
            
            if((<any>window).cordova) {
              localForage.defineDriver(CordovaSQLiteDriver);
            } else { 
              this.config.driverOrder.splice(0, 1); 
            }
            this.store = localForage.createInstance(this.config);

            await this.store.ready(); 
            this.driver = this.store.driver();

            for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                let key = localStorage.key(i); 
                let value = localStorage.getItem( <any>key );
                if(key) await this.setItem(key, value)
            }

            await this.store.iterate( (value:any, key:string, index:number) => {    
                storage.cache[key] = value; 
            })
            
            this.defines.forEach( define => { 
                (<any>Storage).prototype[define.name] = define.value; 
            });

            console.info("localstoragex ready"); 
            this.loaded = true; 
            return;  

        } catch (error) { 
            throw new Error("localStorageX.init() : "+error.stack); 
        }

    }

    /**
     * Waits for cordova to be ready if implemented
     * @returns {Promise<any>}
     */
    private ready() { 
        return new Promise( (resolve, reject) => { 
            if((<any>window).cordova) document.addEventListener("deviceready", resolve, false); 
            else { 
                (<any>window).readyHandlers = [];
                (<any>window).ready = (handler:any) => {
                  (<any>window).readyHandlers.push(handler);
                  (<any>window).handleState();
                };
                
                (<any>window).handleState = () => {
                  if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
                    while((<any>window).readyHandlers.length > 0) {
                      ((<any>window).readyHandlers.shift())();
                    }
                  }
                };
                document.onreadystatechange = (<any>window).handleState;
                (<any>window).ready( () => { 
                    resolve();  
                }); 
            }
        })
    }
    
    /**
     * Sets a value to localStorage by key
     *
     * @param {string} key
     * @param {any} value
     * @returns {Promise<any>}
     */
    public async setItem(key:string, value:any) { 
        try { 
            let encodedKey = btoa(key); 
            if(JSON.stringify(storage.cache[encodedKey]) == JSON.stringify(value)) return;
            storage.cache[encodedKey] = value; 
            return await storage.store.setItem(encodedKey, value)
        } catch (error) { 
            delete storage.cache[key];  
            throw new Error("localStorageX.setItem() : "+error.stack); 
        }
    }

    /**
     * Gets value from localStorage by key
     *
     * @param {string} key
     * @returns {<any>}
     */
    public getItem(key:string) { 
        let encodedKey = btoa(key); 
        return storage.cache[encodedKey] || null;    
    }

    /**
     * Removes value in localStorage by key
     *
     * @param {string} key
     */
    public async removeItem(key:string) { 
        let encodedKey = btoa(key); 
        if(encodedKey && storage.cache[encodedKey]) { 
         try { 
         await storage.store.removeItem(encodedKey);
         delete storage.cache[encodedKey]; 
         return; 
         } catch (error) { 
            throw new Error("localStorageX.removeItem() : "+error.stack);  
         }
        }
    }

    /**
     * Returns a key name by index
     *
     * @param {number} index
     * @returns {string || null}
     */
    public key(index:number) { 
        let key = Object.keys(storage.cache)[index]; 
        return key ? atob(key) : null; 
    }

    /**
     * Returns the total length of stored values
     *
     * @returns {number || null}
     */
    public length() { 
        return Object.keys(storage.cache).length || null; 
    }

    /**
     * Clears all stored values
     */
    public async clear() {
        try {
          await storage.store.clear();
          storage.cache = {}; 
          return;  
        } catch (error) { 
            throw new Error("localStorageX.clear() : "+error.stack);  
        }     
    }

    /**
     * Implicitly indicates if window.localstorage was overwritten (redefined by this class)
     */
    public override() { 
       return true; 
    }

}


export let storage = new LocalStorageX();