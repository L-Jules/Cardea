import yaml from "js-yaml";
import { Asset } from "expo-asset"
import * as FileSystem from "expo-file-system"

const frAsset = require("rsrc/config/text-fr.yaml");
const enAsset = require("rsrc/config/text-en.yaml");

const LANG_ASSET = {
    "fr": frAsset,
    "en": enAsset,
}

async function loadYaml(moduleAsset) {
    const asset = Asset.fromModule(moduleAsset)

    let uri = asset.localUri ?? asset.uri;

    let text;

    if (uri.startsWith("http")) {
        // DEV : asset servi par Metro
        const response = await fetch(uri)
        text = await response.text()
    } else {
        // PROD : asset local
        text = await FileSystem.readAsStringAsync(uri)
    }

    return yaml.load(text)
}

class Lang {

    loadedLang = ""
    #yamlObject = {}
    #listeners = new Set()

    constructor() {}

    async load(lang = "fr") {

        if (this.loadedLang !== lang) {

            if (!LANG_ASSET[lang])
                return

            this.loadedLang = lang;

            this.#yamlObject = await loadYaml(LANG_ASSET[lang]);

            this.#notify();
        }
    }

    /**
     * @returns {Sentence}
     */
    get(path) {
        
        const value = path
            .split(".")
            .reduce((obj, key) => obj?.[key], this.#yamlObject) ?? null;

        return new Sentence(value);
    }

    subscribe(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    #notify() {
        for (const listener of this.#listeners) {
            listener();
        }
    }

    getSnapshot() {
        return this.#yamlObject;
    }
}

enum Gender {
    MALE, FEMALE, OTHER
};

class Sentence {

    #sentence

    constructor(sentence) {
        this.#sentence = sentence;
    }

    interpolate(...elements) {

        let result = this.#sentence.toString();

        for (let element of elements) {
            result = result.replace("$", element.toString());
        }

        return new Sentence(result);
    }

    /**
     * @param gender {Gender}
     */
    genderify(gender) {
        //todo
    }

    get() {
        return this.#sentence;
    }

    toString() {
        return this.#sentence;
    }
}

const LANG = new Lang()

export default LANG;