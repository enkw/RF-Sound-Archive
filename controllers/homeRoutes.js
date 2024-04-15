const router = require('express').Router();
const { Audio, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all audio files and JOIN with user data
    const audioData = await Audio.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const audiofiles = audioData.map((audio) => audio.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      audiofiles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.search;
  if (searchQuery) {
    // Perform the search using the search query
    const searchResults = await Audio.findAll({
      where: {
        // Your search condition here
      },
      include: [{ model: User, attributes: ['name'] }],
    });

    const audiofiles = searchResults.map((audio) => audio.get({ plain: true }));

    // Render the 'results' template with the search results
    res.render('results', { 
      audiofiles,
      searchQuery,
      logged_in: req.session.logged_in
    });
  } else {
    // Redirect back to homepage or render an error message
    res.redirect('/');
  }
});

router.get('/audio/:id', async (req, res) => {
  try {
    const audioData = await Audio.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const audio = audioData.get({ plain: true });

    res.render('audio', {
      ...audio,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Audio }],
    });
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the home page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/upload', (req, res) => {
  res.render('upload');
})

module.exports = router;
