# authentication api
well .....

## setting up dockerized db

apply sudo/admin priv if needed

    $ docker pull postgres:latest
to create persistence when the container shutsdown
    $ docker volume create postgres_data 
Replace #path to file storage to a valid absolute path to point to .../db/data found in the db folder in the project root path 
You can also change the password if you wish
    $ docker run --name postgres_container -e POSTGRES_PASSWORD=P@ssword1 -d -p 5432:5432 -v postgres_data: #path to file storage

so we get
    host:localhost
    port:5432
    database:postgres 
    user:postgres
    password: P@ssword1

## packages used 
    "bcrypt": "^5.1.1", - password hashing
    "cookie-parser": "^1.4.6", - setting cookies
    "dotenv": "^16.3.1", - env variable access
    "express": "^4.18.2", - server framework
    "jsonwebtoken": "^9.0.2", -generating tokens
    "nodemon": "^3.0.1", - hot reloading
    "pg": "^8.11.3", - postgres driver
    "pg-hstore": "^2.3.4", - enable serde (serialize /deserialize) json
    "sequelize": "^6.34.0" -ORM for our pg db
