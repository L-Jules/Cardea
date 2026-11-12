ce fichier sert juste de recommandation, ce que je préfèrais, mais rien n'est strict.

## Java

### stop vs close

stop => arrête le thread.
close => libère les ressources.

un close est un stop mais pas l'inverse,
de manière générale les closes ne propagent pas d'exception.

### constructeur

Si possible des constructeurs sans effet autres que l'initialisation.

### attribut

`private final` par défaut.
`public final`  pour les objets initialisés qui peuvent être accessibles partout.
`private`       pour le contrôleur, ou des mécanismes internes, ou si le setteur a un effet.
`public`        pour les objets qui n'ont pas d'intérêt à être en readonly.
`protected`     pas de système d'héritage complexe donc pas utilisé.
`package`       pas d'utilité pour l'instant.

`private` + guetteur et setteur sans effet proscrit, puisque fonctionnellement équivalent à `public`, mettre en `public` directement.

### type

utiliser les records pour les objets de communication.

Pour les mécaniques communes entre les objets dont une surcharge est à prévoir, une interface est à privilégier préférence.

Les interfaces possédant une seule méthode peuvent être annotées de @FunctionnalInterface pour simplifier l'usage.

je me sert parfois des interfaces pour "flaguer" des classes.

### indentation

4 espaces, mais ça n'a que très peu d'importance

## GIT

les branches features doivent commencer par feat/... pour faire un folder de branches