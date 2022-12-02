Happy coding ❤️

## 🗃️ Chapter I ~ A table to rule them all

### Pre-requirement
The entry file is `parser.html`

### Requirements
- [X] As a user, I want to upload different people details files and see the data in the page.
- [X] As a system, I want to allow only `.json` files
- [X] As a system, I want to show an error if the file format is not valid.
- [X] As a developer, I want to mark as "partial" a people detail when the information is incomplete
- [X] As a user, I want some sort of visual affordance indicator for "partial" people details

### Restriction
- You should be able to parse and display data from the valid file in the `../fixtures` directory.
- You can use **only** VanillaJs. Es6+ is a valid choice.

## 🤩 Chapter II ~ Improve the UX

### Pre-requirement
The entry file is `index.html`
You have to achieve all the `Chapter I` requirements.
You have to use the same parsing logic from the past chapter.

### Requirements
- As a user, I want to search data by `firstName`. Only the relevant rows should appear.
- As a developer, I want to style the table without the `<table>` tag.

### Restriction
- You have to use *Typescript React* for handling the UI.

### Installation 
Install dependencies
```bash
  $ npm i
```

### Development 
Run and watch for file changes
```bash
  $ npm start
```

## 🚀 Chapter III ~ Get ready for production!

### Pre-requirement
You have to use the same source code from the past chapter.

### Requirements
- As a user, I want to persist the last read file (even if the browser is closed) until a new file is uploaded.
- As a developer, I want the app to be mobile ready and the UX the optimized on small screens.
  - for example, I want to hide some columns automatically on small screens.
- As a developer, I want to unit test the parsing logic that reads people details and tag them as "partial".

### Restriction
- You can use any unit test library (es. [jest](https://jestjs.io/) or similar).

## 👩‍🎤 Bonus Points
- Have a great commit history
- Host and serve the application online
