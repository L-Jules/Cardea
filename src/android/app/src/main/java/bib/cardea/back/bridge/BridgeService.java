package bib.cardea.back.bridge;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;

import androidx.annotation.Nullable;

import bib.cardea.back.ctrl.Controller;

import java.util.stream.Stream;

public class BridgeService extends Service {

    private Controller ctrl;

    private final IBinder binder = new BridgeServiceBinder();

    public final class BridgeServiceBinder extends Binder {
        BridgeService getService() {
            return BridgeService.this;
        }
    };

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    @Override
    public void onCreate() {
        this.ctrl = new Controller(this.getApplicationContext());
    }

    public void getAll() {
        this.ctrl.db.getAll();
    }

    public int count() {
        return this.ctrl.db.count();
    }

    public String add(long id, byte[] data) {
        return this.ctrl.db.add(id, data);
    }
}
