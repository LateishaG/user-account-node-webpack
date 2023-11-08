import express from 'express';
const app = express.Router();
import { User } from '../db/index.js';
import isLoggedIn from './middleware.js';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

export default app;

app.post('/', async (req, res, next) => {
  try {
    res.status(200).send(await User.authenticate(req.body));
  } catch (err) {
    next(err);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    //create email token to use in confirmation url
    const emailToken = jwt.sign({ id: user.id }, process.env.EMAILJWT, {
      expiresIn: '10m'
    });
    const url = `http://localhost:3000/confirmation/${emailToken}`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email, // Change to your recipient
      from: process.env.EMAILSENDER, // Change to your verified sender
      subject: 'Email Confirmation',
      text: 'please click the confirmation link',
      html: `<p> please click the confirmation link: <a href= "${url}"> ${url} </a></p>` //conformation url
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch(error => {
        console.error(error);
      });
    res.send(user.generateToken());
  } catch (err) {
    next(err);
  }
});

//add a confirmation route
app.put('/confirmation/email/', async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.EMAILJWT);

    const user = await User.findByPk(id);
    if (user.id === id) {
      await user.update({ emailVerification: true });
      res.send({ verification: 'confirmed' });
    } else {
      res.send({ verification: 'invalid' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/', isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

app.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
