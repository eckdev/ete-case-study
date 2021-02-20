# Map based pokemon battle game

> Eyupcan Kayadarcin web application built with ReactJS, Redux, Leaflet JS & MongoDB.

I have hosted it by heroku: (https://eyupwebapp.herokuapp.com/)

#API
| Method   | URL                 | Operation                                |
| :------- | :------------------ | :--------------------------              |
| `GET`    | /api/pokemons                     | Fetch all pokemons         |
| `POST`   | /api/pokemons/addPokemon          | Create a new pokemon       |
| `PUT`    | /api/update/:id                   | update pokemon             |
| `PUT`    | /api/updateCoordinates/:id        | Update pokemon coordinates |
| `POST`   | /api/users/register               | Create a new user          |
| `POST`   | /api/users/login                  | Login user       |

#Run
```bash

npm i && npm i --prefix client
npm run dev

```
