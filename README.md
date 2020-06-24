#####The Newborn - is education project, based on M.E.A.N. stack (Mongo Express Angular Nodejs).
######Udemy course link: https://www.udemy.com/course/mean-stack-full-guide/

##How to install
```
#1. Install npm dependencies:
npm run install:all

#2. Fill the keys of ./src/config/keys.dev.js for possibility ti run project in dev-mode.

#3. Run local in dev-mode (client and server):
# dev build
npm run start:dev
#prod build (Neea actual values of keys: MONGO_URI, JWT_SECRET, JWT_EXPIRIES_IN):
npm run build:client && NODE_ENV=production npm run start
```

##Deploy to Heroku
```
git push heroku master
```

##Project link:
https://serene-spire-30052.herokuapp.com/
