# eval-api Mathieu GESLIN

## Stack Technique

- **node** express
- **mongoose** as odm
- **jwt** for auth
- **joi** for validation
- **MongoCompass** as local DB
- **Postman** to test requests
- **swagger** for doc (only if there is time) 
- **emailing** nodemailer

## Modélisation de la DB

Comme j'allais utiliser mongo, afin de tirer parti du potentiel de la techno, j'ai décidé de ne pas mettre "Freelance" et "Entreprise" en tant qu'entité.  
Ces informations passeront par le biais d'un champs contenant un objet (avec toutes les infos adéquates), ou alors sera inexistant.  
Donc si l'utilisateur est un "Freelance", il aura un champs "freelance":{} contenant les infos concernant son statut.

## Fin d'éval

### Travail non effectué

Quelques routes entreprise, la plupart des routes admin

-> L’entreprise doit pouvoir : 

        - Supprimer sa mission
        - Modifier sa mission


-> L’admin doit pouvoir :

        - Consulter/supprimer/modifier des utilisateurs
        - Consulter/Créer/supprimer/modifier des compétences & des métiers
        - Consulter les missions et la proposition rattachée à un freelance.

### Features a rajouter

Pour une api complète certaines features manquent, en voici une liste non-exhaustive :
- Swagger
- i18n
- protection XSS via html-entities ou autre...