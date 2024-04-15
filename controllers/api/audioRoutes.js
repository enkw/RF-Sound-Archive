const router = require('express').Router();
const { Audio } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newAudio = await Audio.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAudio);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/:id', (req, res) => {
  Audio.findByPk(req.params.id).then((audioData) => {
    res.json(audioData);
  });
});

// Commenting out for now, we're going to leave out the ability to allow users to delete audio until I can figure
// out how make that work with S3 better.
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const audioData = await Audio.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!audioData) {
//       res.status(404).json({ message: 'No audio found with this id!' });
//       return;
//     }

//     res.status(200).json(audioData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;