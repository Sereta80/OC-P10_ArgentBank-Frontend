# Argent Bank – Front-end

Application bancaire en React réalisée dans le cadre du projet 10 de la formation **Intégrateur web** d'OpenClassrooms.

**Phase 1 – Authentification de l'utilisateur** : connexion, accès au profil, modification du nom d'utilisateur et déconnexion, en communiquant avec l'API Argent Bank.

## Fonctionnalités

- Page d'accueil (`/`)
- Connexion de l'utilisateur (`/login`) avec authentification par token JWT et message d'erreur en cas d'identifiants incorrects
- Page de profil protégée (`/profile`), accessible uniquement aux utilisateurs connectés
- Modification du nom d'utilisateur (*userName*), mis à jour à la fois sur la page profil et dans la barre de navigation
- Déconnexion avec retour à la page d'accueil
- Page 404 pour les URL inconnues
- Interface responsive

## Technologies

- [React](https://react.dev/) 19 et [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) et React Redux (gestion du state global)
- [React Router](https://reactrouter.com/) (navigation et route protégée)
- [Axios](https://axios-http.com/) (appels à l'API)
- Sass (styles)

## Prérequis

- [Node.js](https://nodejs.org/) 20.19 ou supérieur et npm
- Le back-end Argent Bank lancé en local sur `http://localhost:3001` : voir le dépôt [OC-P10_ArgentBank_Backend](https://github.com/Sereta80/OC-P10_ArgentBank_Backend)

## Installation et lancement

1. Lancer d'abord le back-end (MongoDB et API) en suivant le README du dépôt back-end.
2. Cloner ce dépôt et installer les dépendances :

```bash
git clone https://github.com/Sereta80/OC-P10_ArgentBank-Frontend.git
cd OC-P10_ArgentBank-Frontend
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

4. Ouvrir l'adresse affichée dans le terminal (par défaut `http://localhost:5173`).

## Comptes de test

Ces comptes sont créés par le script `npm run populate-db` du back-end.

| Utilisateur | Email | Mot de passe |
|---|---|---|
| Tony Stark | `tony@stark.com` | `password123` |
| Steve Rogers | `steve@rogers.com` | `password456` |

## Structure du projet

```
src/
├── components/   # Composants réutilisables : Header, Footer, FeatureItem, AccountCard, ProtectedRoute
├── pages/        # Pages : Home, SignIn, User (profil), Error404
├── redux/        # Store et slice d'authentification
├── assets/img/   # Images optimisées (WebP)
└── scss/         # Styles
```

## Gestion du state avec Redux

- **Store** (`src/redux/store.js`) : créé avec `configureStore`, il contient le slice `auth`.
- **Slice** (`src/redux/authSlice.js`) : il stocke le token, l'état de connexion, les informations de l'utilisateur, le statut des requêtes et les erreurs.
- **Actions asynchrones** (`createAsyncThunk`) :
  - `loginUser` : `POST /user/login`, récupère le token JWT ;
  - `fetchUserProfile` : `GET /user/profile`, récupère les informations de l'utilisateur ;
  - `updateUserProfile` : `PUT /user/profile`, modifie le nom d'utilisateur.
- **Action synchrone** : `logout`, qui vide les données d'authentification du store.

## Green Code

- Images converties en WebP et redimensionnées à leur taille d'affichage : de 220 Ko à 50 Ko au total (−77 %).
- Éléments répétés découpés en composants réutilisables : `FeatureItem` pour les 3 colonnes de l'accueil, `AccountCard` pour les comptes bancaires.