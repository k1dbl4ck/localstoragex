import {} from 'jasmine';
import { storage } from './localStorage';

describe('localStorage', () => {

  it('should create a class', () => {
    expect(storage).toBeDefined();
  });

  it('should be able to initialize', done => {
    storage.init().then(() => {
      expect(1).toEqual(1);
      done();
    });
  });

  it('should override localStorage', done => {
    storage.init().then(() => {
      expect((<any>window.localStorage).override()).toEqual(true);
      done();
    });
  });

  it('should be able to set a value', done => {
    storage.init().then(() => {
      let store = (<any>window.localStorage); 
      store.setItem('test', 'value').then(() => {
        expect(1).toEqual(1);
        done();
      }).catch((err:any) => {
          fail('Could not set a value : '+err);
          done();
      });    
    });    
  });
 
  it('should be able to get a value', done => {
    storage.init().then(() => {
      let store = (<any>window.localStorage);
      store.setItem('test', 'value').then(() => {
        const result = storage.getItem('test')
        expect(result).toEqual("value");
        done();  
      }).catch((err:any) => {
          fail('Could not set a value : '+err);
          done();
      });
    }); 
  });

  it('should be able to get a key by index', done => {
    storage.init().then(() => {
      let store = (<any>window.localStorage);
      store.setItem('test', 'value').then(() => {
        const result = storage.key(0)
        expect(result).toEqual("test");
        done();  
      }).catch((err:any) => {
          fail('Could not set a value : '+err);
          done();
      });
    });     
  });

  it('should be able to return total storage length', done => {
    storage.init().then(() => {
      let store = (<any>window.localStorage);
      store.setItem('test', 'value').then(() => {
        const result = storage.length(); 
        expect(result).toEqual(1);
        done();  
      }).catch((err:any) => {
          fail('Could not set a value : '+err);
          done();
      });
     
    });   
    
  });

  it('should be able to remove a value', done => {
    storage.init().then(() => {
      let store = (<any>window.localStorage);
      store.setItem('test', 'value').then(() => {
        store.removeItem('test').then( () => { 
          let result = store.getItem('test'); 
          expect(result).toEqual(null);
          done();  
        }).catch( (err:any) => {
          fail('Could not remove value : '+err);
          done(); 
        });
     });   
    });       
  });

  it('should be able to remove all values', done => {
    storage.init().then(() => {
      let store = (<any>window.localStorage);
      store.setItem('test', 'value').then(() => {
          store.clear().then( () => {
          const result = storage.length(); 
          expect(result).toEqual(null);
          done(); 
        }).catch( (err:any) => {
          fail('Could not set a value to remove : '+err);
          done();
        })
       }); 
    }); 
  });
});

