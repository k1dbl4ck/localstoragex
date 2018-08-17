import { storage } from './localStorage';
describe('localStorage', function () {
    it('should create a class', function () {
        expect(storage).toBeDefined();
    });
    it('should be able to initialize', function (done) {
        storage.init().then(function () {
            expect(1).toEqual(1);
            done();
        });
    });
    it('should override localStorage', function (done) {
        storage.init().then(function () {
            expect(window.localStorage.override()).toEqual(true);
            done();
        });
    });
    it('should be able to set a value', function (done) {
        storage.init().then(function () {
            var store = window.localStorage;
            store.setItem('test', 'value').then(function () {
                expect(1).toEqual(1);
                done();
            }).catch(function (err) {
                fail('Could not set a value : ' + err);
                done();
            });
        });
    });
    it('should be able to get a value', function (done) {
        storage.init().then(function () {
            var store = window.localStorage;
            store.setItem('test', 'value').then(function () {
                var result = storage.getItem('test');
                expect(result).toEqual("value");
                done();
            }).catch(function (err) {
                fail('Could not set a value : ' + err);
                done();
            });
        });
    });
    it('should be able to get a key by index', function (done) {
        storage.init().then(function () {
            var store = window.localStorage;
            store.setItem('test', 'value').then(function () {
                var result = storage.key(0);
                expect(result).toEqual("test");
                done();
            }).catch(function (err) {
                fail('Could not set a value : ' + err);
                done();
            });
        });
    });
    it('should be able to return total storage length', function (done) {
        storage.init().then(function () {
            var store = window.localStorage;
            store.setItem('test', 'value').then(function () {
                var result = storage.length();
                expect(result).toEqual(1);
                done();
            }).catch(function (err) {
                fail('Could not set a value : ' + err);
                done();
            });
        });
    });
    it('should be able to remove a value', function (done) {
        storage.init().then(function () {
            var store = window.localStorage;
            store.setItem('test', 'value').then(function () {
                store.removeItem('test').then(function () {
                    var result = store.getItem('test');
                    expect(result).toEqual(null);
                    done();
                }).catch(function (err) {
                    fail('Could not remove value : ' + err);
                    done();
                });
            });
        });
    });
    it('should be able to remove all values', function (done) {
        storage.init().then(function () {
            var store = window.localStorage;
            store.setItem('test', 'value').then(function () {
                store.clear().then(function () {
                    var result = storage.length();
                    expect(result).toEqual(null);
                    done();
                }).catch(function (err) {
                    fail('Could not set a value to remove : ' + err);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=localStorage.spec.js.map