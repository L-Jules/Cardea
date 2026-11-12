package bib.cardea.back.ctrl;

// pas utilisé pour l'instant

/*
import bib.cardea.back.config.Config;
import bib.cardea.back.config.Lang;

import org.yaml.snakeyaml.Yaml;
*/
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/*
import android.content.res.AssetManager;
*/

public class ConfigController {

    private final Controller ctrl;

    //public final Lang lang;
    //public final Config config;

    public ConfigController(Controller ctrl) {
        this.ctrl = ctrl;

        /*

        AssetManager assetManager = startingConfig.context().getAssets();

        Yaml yaml = new Yaml();

        try (InputStream input = assetManager.open("config/config.yaml")) {

            Map<String, Object> file = yaml.load(input);

            config = new Config((Integer) file.get("room_port"));

        } catch (IOException e) {
            throw new RuntimeException(e);
        };

        try (InputStream input = assetManager.open("config/text-"+startingConfig.lang()+".yaml")) {

            Map<String, Object> file = yaml.load(input);

            lang = new Lang(file);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        */
    }
}
