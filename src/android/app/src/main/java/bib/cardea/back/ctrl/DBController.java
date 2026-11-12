package bib.cardea.back.ctrl;

import bib.cardea.back.bridge.ErrorCode;
import android.content.Context;
import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.DatabaseUtils;
import android.database.Cursor;

import java.util.Date;

import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;

import java.io.BufferedWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.FileNotFoundException;
import java.io.IOException;

public class DBController {

    private final Controller ctrl;

	public static final String DB_NAME = "scans.db";
	public static final int    DB_VERSION = 1;
	public static final String CREATE_STATEMENT = 
		"CREATE TABLE SCANS ("                 +
		"    id INTEGER NOT NULL PRIMARY KEY, "+
		"    data BLOB NOT NULL, "             +
		"    date DATE NOT NULL"               +
		");";

	private final SQLiteOpenHelper dbHandler;
	private final Context context;

	public DBController(Controller ctrl, Context context) {
		this.ctrl = ctrl;
		this.context = context;
		this.dbHandler = new SQLiteOpenHelper(context, DB_NAME, null, DB_VERSION){

			@Override
			public void onCreate(SQLiteDatabase db) {
				db.execSQL(CREATE_STATEMENT);
			}

			@Override 
			public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {}
		};
	}

	public void createOrOpenDB() {
		this.dbHandler.getWritableDatabase();
	}

	public String add(long id, byte[] data){

		SQLiteDatabase db = this.dbHandler.getWritableDatabase();
		ContentValues values = new ContentValues(3);

		values.put("id"  , id);
		values.put("data", data);
		values.put("date", new Date().toString());
		
		long result = db.insert("scans", null, values);

		if (result == -1)
			return ErrorCode.DUPLICATE_ID.name();

		return ErrorCode.OK.name();
	}

	public int count() {
		SQLiteDatabase db = this.dbHandler.getReadableDatabase();
		return (int) DatabaseUtils.queryNumEntries(db, "scans");
	}

	public void getAll() {

		SQLiteDatabase db = this.dbHandler.getReadableDatabase();

	    ContentValues values = new ContentValues(3);

	    values.put(MediaStore.Downloads.DISPLAY_NAME, "ids.csv" );
	    values.put(MediaStore.Downloads.MIME_TYPE,    "text/csv");
	    values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);

	    Uri uri = context.getContentResolver().insert(
	            MediaStore.Downloads.EXTERNAL_CONTENT_URI,
	            values
	    );

	    if (uri == null) {
	        throw new RuntimeException(
	                "Impossible de créer le fichier"
	        );
	    }

		try (

        	OutputStream outputStream = context.getContentResolver().openOutputStream(uri);

        	BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(outputStream)
            );

    		Cursor cursor = db.rawQuery("SELECT id FROM scans", null);
    	) {
    		writer.write("id");
    		writer.newLine();

    		while (cursor.moveToNext()) {
        		writer.write(Long.toString(cursor.getLong(0)));
        		writer.newLine();
    		}
		}
		catch(FileNotFoundException e) {
			e.printStackTrace();
		}
		catch(IOException e) {
			e.printStackTrace();
		}
	}
}