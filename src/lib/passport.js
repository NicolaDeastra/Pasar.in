import passport from 'passport'
import localStrategy from 'passport-local'
import { User } from '../models'

async function authenticate(email, password, done) {
  try {
    const user = await User.authenticate({ email, password })

    return done(null, user)
  } catch (err) {
    return done(null, false, { message: err.message })
  }
}

passport.use(
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    authenticate
  )
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) =>
  done(null, await User.findByPk(id))
)

export default passport
