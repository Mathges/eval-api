# eval-api Mathieu GESLIN

## Stack Technique

- **node** express
- **mongoose** as odm
- **jwt** for auth
- **yup** for validation
- **MongoCompass** as local DB
- **Postman** to test requests
- **swagger** for doc (only if there is time) 
- **emailing** nodemailer

## Modélisation de la DB

Comme j'allais utiliser mongo, afin de tirer parti du potentiel de la techno, j'ai décidé de ne pas mettre "Freelance" et "Entreprise" en tant qu'entité.  
Ces informations passeront par le biais d'un champs contenant un objet (avec toutes les infos adéquates), ou alors sera inexistant.  
Donc si l'utilisateur est un "Freelance", il aura un champs "freelance":{} contenant les infos concernat son statut.  