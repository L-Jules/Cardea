package bib.cardea.back.config;

import java.util.Map;
import java.util.Objects;

public final class Lang {
    private final Map<String, Object> file;

    public Lang(Map<String, Object> file) {
        this.file = file;
    }

    public static final class Sentence {
        private final String sentence;

        public Sentence(String sentence) {
            this.sentence = sentence;
        }

            public String interpolate(Object... elements) {

                String result = sentence;

                for (Object element : elements) {
                    result = result.replaceFirst("\\$", element.toString());
                }

                return result;
            }

            public String get() {
                return sentence;
            }

        public String sentence() {
            return sentence;
        }

        @Override
        public boolean equals(Object obj) {
            if (obj == this) return true;
            if (obj == null || obj.getClass() != this.getClass()) return false;
            Sentence that = (Sentence) obj;
            return Objects.equals(this.sentence, that.sentence);
        }

        @Override
        public int hashCode() {
            return Objects.hash(sentence);
        }

        @Override
        public String toString() {
            return "Sentence[" +
                    "sentence=" + sentence + ']';
        }

        }

    private static Object getValue(Map<String, Object> yamlObject, String path) {
        String[] keys = path.split("\\.");
        Object current = yamlObject;

        for (String key : keys) {
            if (!(current instanceof Map)) {
                return null;
            }

            Map<?, ?> map = (Map<?, ?>) current;
            current = map.get(key);

            if (current == null) {
                return null;
            }
        }

        return current;
    }

    public Sentence get(String name) {

        return new Sentence("" + getValue(this.file, name));
    }

    public Map<String, Object> file() {
        return file;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        Lang that = (Lang) obj;
        return Objects.equals(this.file, that.file);
    }

    @Override
    public int hashCode() {
        return Objects.hash(file);
    }

    @Override
    public String toString() {
        return "Lang[" +
                "file=" + file + ']';
    }

}
