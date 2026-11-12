import {NativeModules} from 'react-native';

const { Bridge } = NativeModules;

/**
 * lien react avec le bridge java
 */
export default {

    count()       { return Bridge.count(); },
    add(id, data) { return Bridge.add(id, data); },
    getAll()      { Bridge.getAll(); },

    launchBind:   () => Bridge.launchBind(),
    onBindFinish: (f) => setTimeout(function self() {
        if (Bridge.isReadyToStart())
            f();
        else
            setTimeout(self, 300);
    }, 300),
    unbind: () => Bridge.unbindService(),
};