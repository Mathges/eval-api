# DB conception

## Models

User :
 - ID (string, uuid)
 - LastName (string)
 - FirstName (string)
 - Adress (string)
 - ZipCode (string, must have 5 digits validation)
 - PhoneNumber (string, must start with + and have only digits)
 - Email (string, must have email validation)
 - Password (string, must have password validation)
 - isAdmin (bool)
 - confirmation_token (string)
 - active (bool)
 - freelance: (object, got values or inexistant)
   - DailyTax (number)
   - ExperienceYears (number)
   - Skills (array of ref to Skill)
   - Professions (array of ref to Profession)
   - CurrentTasks (array of ref to Tasks) 
 - company: (object, got values or inexistant)
   - SocialReason (string)
   - Status (string, must have a limit length or enum)
   - Siret (string, must have 9 digits validation)
   - HeadOffice (string, think about a validation here)

Tasks:
 - ID (string, uuid)
 - StartDate (date)
 - EndDate (date)
 - Salary (number)
 - Name (string)
 - Description (string)
 - ProfessionAwaited (ref to Profession)
 - SkillsAwaited (ref to Skill)
 - PendingProposals (array of ref to Freelance)
 - AcceptedProposals (array of ref to Freelance, maximum 3)
 - Status (ref to TaskStatus, only 1 at a time)

Skills:
 - ID (string, uuid)
 - Name (string)

Professions:
 - ID (string, uuid)
 - Name (string)
 - linkedSkills (array of ref to Skills)

!! can only be an enum server side !!
TaskStatus:
 - ID (string, uuid)
 - Name (string, validation with enum)