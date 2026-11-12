package bib.cardea.back.ctrl;

import android.content.Context;

/**
 * Objet maitre passeur d'information
 */
public class Controller {

    public final ConfigController config ;
    public final DBController     db ;

    public Controller(Context context) {
        this.config = new ConfigController(this);
        this.db = new DBController(this, context);
    }
}
