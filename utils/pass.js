'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// fake database: ****************
const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
];
// *******************

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email, pass) => {
  const user = users.filter((usr) => {      // filter palauttaa aina taulukon
    if (usr.email === email && usr.password === pass) {
      return usr;
    }
  });
  return user[0];   //palautetaan käyttäjä-objekti
};
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id);
  // serialize user id by adding it to 'done()' callback
  return done(null, id);
});

// deserialize: get user id from session and get all user data
passport.deserializeUser((id, done) => {
  // get user data by id from getUser
  const user = getUser(id);
  console.log('deserialize', user);
  // deserialize user by adding it to 'done()' callback
  return done(null, user);
});

passport.use(new Strategy(
    (username, password, done) => {
      // get user by username and password from getUserLogin
      const user = getUserLogin(username, password);
      // if user is undefined
      if (user === undefined)
        return done(null, false);
      // else
      return done(null, user.user_id);      // seuraavaksi serializeen
    }
));


module.exports = passport;