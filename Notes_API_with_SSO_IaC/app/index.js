const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-openidconnect");

const app = express();

passport.use('oidc', new Strategy({
  issuer: 'http://keycloak.keycloak.svc.cluster.local/auth/realms/test-realm',
  authorizationURL: 'http://keycloak.keycloak.svc.cluster.local/auth/realms/test-realm/protocol/openid-connect/auth',
  tokenURL: 'http://keycloak.keycloak.svc.cluster.local/auth/realms/test-realm/protocol/openid-connect/token',
  userInfoURL: 'http://keycloak.keycloak.svc.cluster.local/auth/realms/test-realm/protocol/openid-connect/userinfo',
  clientID: 'notes-app',
  clientSecret: 'my-client-secret',
  callbackURL: 'http://localhost:3000/auth/callback',
  scope: 'openid profile email'
}, (issuer, sub, profile, done) => done(null, profile)));

app.use(session({ secret: 'notes_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get('/auth', passport.authenticate('oidc'));
app.get('/auth/callback', passport.authenticate('oidc', {
  successRedirect: '/',
  failureRedirect: '/auth'
}));

app.get('/', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/auth');
  res.send(`<h1>Welcome ${req.user.displayName}</h1>`);
});

app.listen(3000, () => console.log("Notes API running with SSO on port 3000"));