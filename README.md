## Vocabulaire

## Choix technique

## Architecture

## Materiel nécéssaire

- node
- npm

en option

- expo
- Un telephone android
- Un cable USB
- Java 21
- Pas besoin d'android studio

## Developpement local front

Dans le dossier src, lancer expo, si un telephone n'est pas branché en usb, il va ouvrir un appareil virtuel.

```sh
cd src/front
npx expo run:android
```
## Processus de livraison

1) Copiez les icônes dans le dossier `res`, si elles ont été changé 

Copiez tout le contenu de `rsc/splashscreen/` (sauf l'icône .svg qui n'est pas utilisé)

le coller dans `/src/front/android/app/src/res`,
puis remplacez les dossiers et images existantes.

2) Changez le numéro de version dans `app/build.gradle`

```
android {
    defaultConfig {
        ...
        versionName "2.0.0"
    }
    ...
}
```

3) Changez le numéro de version dans `/front/popUp/Param.jsx`

```
<Modal>
    <Form>
        ...
        <Text style={{fontSize: 18,alignSelf: "center", color: NOIR_CARDEA, marginTop: 20}}>(version: 3.0.8-beta-v5)</Text>
        ...
    </Form>
</Modal>
```

4) Ajoutez les autorisations nécéssaires dans le fichier `app/src/main/AndroidManifest.xml`
```
 <uses-permission android:name="android.permission.NFC" />
 ```

5) Build l'APK

```
./gradlew assembleRelease
```

Le build sera disponnible dans `/src/front/android/app/build/outputs/apk/release/`
