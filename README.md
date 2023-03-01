# Api-social-media-node

This a RESTful API with node for ...

## Built with

- NodeJS (CommonJS)
- Design pattern MVC
- Express
- Cors
- Dotenv
- Moment
- Validator
- Bcrypt
- Jwt-simple
- Mongo Atlas DB
- Mongoose
- Multer

You can check this app with postman in a server running with all endpoints below.

## CRUD and Endpoints User

### Post

Register:  
`https://music-app-node.onrender.com/api/user/register`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/register.png?raw=true)

Login:  
`https://music-app-node.onrender.com/api/user/login`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/login.png?raw=true)

Add token authorization in Headers that is in response login for all routes that need auth:

![alt text](https://github.com/Martin-J-Larre/api-social-media-node/blob/main/public/img/post-3.png?raw=true)

Upload avatar:  
`https://music-app-node.onrender.com/api/user/upload`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/avatar.png?raw=true)

### Get

Get User Profile:

`https://music-app-node.onrender.com/api/user/profile/${user id}`

Get User avatar:

`https://music-app-node.onrender.com/api/user/avatar/${ filename }`

### Put

Update user authorized:

`https://music-app-node.onrender.com/api/user/update`

You can update all these fields

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/register.png?raw=true)

## CRUD and Endpoints Artist

### Post

Save Artist:

`https://music-app-node.onrender.com/api/artist/save`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/save-artist.png?raw=true)

Upload image Artist:

`https://music-app-node.onrender.com/api/artist/upload/${ artist id }`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/avatar.png?raw=true)

### Get

Get one Artist:

`https://music-app-node.onrender.com/api/artist/profile/${ artist id}`

Gell All Artists:

`https://music-app-node.onrender.com/api/artist/profiles/${ number page }`

Get image Artist:

`https://music-app-node.onrender.com/api/artist/image/${ filename }`

### Put

Update Artist:

`https://music-app-node.onrender.com/api/artist/update/${ artist id }`

You can update all these fields

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/save-artist.png?raw=true)

### Delete

Delete Artist (delete artist's album and song too):

`https://music-app-node.onrender.com/api/artist/delete/${ artist id }`

## CRUD and Endpoints Album

### Post

Create Album:

`https://music-app-node.onrender.com/api/album/create`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/create-album.png?raw=true)

Upload Image Album:

`https://music-app-node.onrender.com/api/album/upload/${ album id }`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/avatar.png?raw=true)

### Get

Get One Album:

`https://music-app-node.onrender.com/api/album/name/${ album id }`

Get All Albums:

`https://music-app-node.onrender.com/api/album/names/${ artist id }`

Get Image Album:

`https://music-app-node.onrender.com/api/album/image/${ filename }`

### Put

Update Album:

`hhttps://music-app-node.onrender.com/api/album/update/${ album id }`

You can update all these fields

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/create-album.png?raw=true)

### Delete

Delete Album (delete album's song too):

`https://music-app-node.onrender.com/api/album/delete/${ album id }`

## CRUD and Endpoints Song

### Post

Create Song (Add album id in album key):

`https://music-app-node.onrender.com/api/song/create`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/create-song.png?raw=true)

Upload audio file (Add file mp3 or ogg):

`https://music-app-node.onrender.com/api/song/upload/${ song id }`

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/upload-song.png?raw=true)

### Get

Get One Song:

`https://music-app-node.onrender.com/api/song/name/${ song id }`

Get All Songs:

`https://music-app-node.onrender.com/api/song/names/${ album id }`

Get Audio file:

`https://music-app-node.onrender.com/api/song/audio/${ filename }`

### Put

Update Song (Add album id in album key if update that field):

`https://music-app-node.onrender.com/api/song/update/${ song id}`

You can update all these fields

![alt text](https://github.com/Martin-J-Larre/music-app-node/blob/main/public/img/create-song.png?raw=true)

### Delete

Delete Song:

`https://music-app-node.onrender.com/api/song/delete/${ song id }`

## Server runnig for check

- URL - [https://music-app-node.onrender.com](https://music-app-node.onrender.com)
