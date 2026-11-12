package bib.cardea.back.bridge;

import static androidx.core.content.ContextCompat.startForegroundService;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import android.widget.Toast;

package bib.cardea.back.bridge.ErrorCode;

public class Bridge extends ReactContextBaseJavaModule {

    private BridgeService bridgeService;
    private final ReactApplicationContext reactContext;
    private boolean bound = false;

    public Bridge(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "Bridge"; // nom utilisé côté JS
    }

    private final ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder binder) {
            BridgeService.BridgeServiceBinder localBinder = (BridgeService.BridgeServiceBinder) binder;
            bridgeService = localBinder.getService();
            bound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            bridgeService = null;
            bound = false;
        }
    };

    @ReactMethod
    public void launchBind() {
        Intent intent = new Intent(reactContext, BridgeService.class);
        reactContext.bindService(intent, connection, Context.BIND_AUTO_CREATE);
    }

    @ReactMethod
    public void unbindService() {
        if (bound) {
            reactContext.unbindService(connection);
            bound = false;
        }
    }

    @ReactMethod
    public void getAll() {
        if (bound && bridgeService != null) {
            bridgeService.getAll();
            Toast.makeText(reactContext, "Téléchargement terminé", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public int count() {
        if (bound && bridgeService != null) {
            return bridgeService.count();
        }
        return 0;
    }

    //long impossible pour l'id
    @ReactMethod
    public String add(String id, ReadableArray data) {
        if (bound && bridgeService != null) {

            byte[] dataInByte = new byte[data.size()];

            for (int i = 0; i < data.size(); i++) {
                dataInByte[i] = (byte) data.getInt(i);
            }

            return bridgeService.add(Long.parseLong(id), dataInByte);
        }
        return ErrorCode.NO_BRIDGE.name();
    }

    @ReactMethod
    public boolean isReadyToStart() {
        return bound && bridgeService != null;
    }
}
