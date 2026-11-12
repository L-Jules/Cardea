# Rapport de rétro engineering et développement d'une solution d'indexage pour une médiathèques

```table-of-contents
````

## Contexte

L'achat d'un scanner NFC longue portée spécialisé est une dépense considérable, surtout au vu de la faible utilisation (1 fois tous les 5 ans)
Ce rapport vient décrire la réflexion, le choix de la solution.

## Vocabulaire 

NFC : https://fr.wikipedia.org/wiki/Near-field_communication
Hexadécimal : système de notation d'un nombre en base 16 (0-9, A-F)
Octet : nombre composé de 8 bits

## Rétro engineering de l'existant

### Lecture d'une puce NFC

Sur la puce NFC-V d'un livre, nous venons lire les données, 
Les informations lues ne décrivent aucune sécurité de lecture, nous pouvons lire l'intégralité des données sans zone cachée/ protégée.

Le tag NFC-V est de type SLIX.

```
Security Status: 00 -> pas de verrou
Password Read: 00 00 00 00
Password Write: 00 00 00 00
Privacy Mode: false
Protection Pointer: 00
Protection Condition: 00
Lock DSFID: false
Lock AFI: false
Lock EAS: false
Lock PPL: false
```

#### Analyse des données

Le numéro sur le livre est `53001'91132` (53001 étant la partie commune représentant la bibliothèque). Ce numéro en hexadécimal nous donne : `13BEA7F9C`, sur le tag NFC-V, nous lisons en hexadécimal:

```
11 05 [01 3B 
EA 7F 9C] 02 
01 80 03 07 
34 81 E7 62 
31 62 01 00 
00 00 00 00 
```
(le reste de la mémoire est à zéro)

Nous retrouvons donc notre numéro à partir du 3ème octet.

Cette hypothèse a été confirmée avec 3 livres / DVD de numéros différents, c'est toujours le 3ème octet.

### Code bar

Le code bar disponnible sur l'étiquette qui fait redondance avec le tag NFC-V est de type `MSI Plessey`
https://en.wikipedia.org/wiki/MSI_Barcode

ses données de vérification (parité) sont en `1010`

## Choix d'une solution adapté à l'inventaire

### Limitations technologiques

Dans le cas d'une gestion de l'inventaire par une médiathèque, il serait optimal de ne pas avoir à sortir les livres/ DVD de leurs étagères, cependant, même avec du matériel spécialisé, il est difficile de gérer la collision de plusieurs tags NFC-V collés entre eux, par exemple sur des livres de moins de 50 pages.
### Solutions aux limitations technologiques

Au vu des ressources disponibles et des contraintes budgétaires, il est envisageable de sortir partiellement les livres de leurs étagères, juste pour scanner le tag NFC-V.
### Contraintes de circulation

Il est préférable que le scanneur ne soit pas connecté de manière filaire à un ordinateur portable, pour circuler dans la médiathèque, entre les rayons. Il est préférable de ne pas tenir un ordinateur portable à bout de bras, cela accentuerait la fatigue de cette tâche qui est déjà répétitive.
### Contraintes d'extraction

Le protocole utilisé dans le stockage du numéro unique n'est pas révélé, donc nous ne pouvons pas acheter un scanner gérant ce protocole, donc à l'utilisation, le numéro unique ne serait pas extrait. 
Cela constitue un traitement à réaliser une fois l'extraction des données faite, mais cela rend impossible une vérification des données au moment du scan.
### Contraintes d'accumulation

La cumulation des numéros scannés n'est pas disponible sur tous les modèles de scanner disponibles en ligne et la limite de 50 000 numéro peut facilement dépasser les capacités de l'appareil choisi. 
### Contraintes de regroupement

L'appareil choisi doit pouvoir se connecter à un ordinateur après que l'inventaire soit fait pour extraire ses données.
### Solution choisit pour répondre au différentes contraintes

Les smartphones modernes possèdent tous un système de scan NFC, le prix d'un téléphone d'occasion reste très abordable.
Point de vue extraction et traitement des numéros uniques, le développement d'une application spécifique est tout à fait réalisable sur les plateformes Android (l'écosystème Apple demandant un achat supplémentaire pour un compte développeur), de plus sur Android l'application est facile à distribuer, un simple fichier suffit.

Le développement d'une application spécifique Android répond à toutes les contraintes.