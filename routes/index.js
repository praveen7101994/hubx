const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Events = require('../models/Events');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Events.find((err, data) => {
    console.log(data);
  

  res.render('dashboard', {
    user: req.user,
    // eventArray = data
    fre : data
  })
});
});

router.post('/dashboard', ensureAuthenticated, (req, res) => {
  console.log('Request: ', req.body);
  const { title, location, date, sponser } = req.body;
  let errors = [];

  if(!title || !location || sponser) {
    errors.push({ msg: 'Please enter all fields' });
  }

  const newEvent = new Events({
    Title: title,
    Location: location,
    eventDate: new Date(date),
    SponseredBy: sponser
  });

  newEvent.save((err, data) => {
    if(err){
        console.log(err);
    } else {
        console.log(data)
    }
});

  if(errors.length > 0) {
    res.render('dashboard', {
      errors,
      title,
      location,
      date,
      sponser
    });
  } else {
    const newEvent = new Events({
      Title: title,
      Location: location,
      eventDate: date,
      SponseredBy: sponser
    });
    console.log(newEvent);

    newEvent.save((err, data) => {
      console.log('error saving')
    }).then(events => {
      req.flash(
        'event_posted',
        'New event posted successfully');
    }).catch(err => console.log(err));
  }
});

router.get('/dashboard/events', (req, res) => {
  Events.find((err, evnts) => {
    if(err){
      res.send('failed fetching events');
    } else {
      res.send({ ev: evnts });
    }
  })
})

module.exports = router;
