const router = require('express').Router();
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateNewMovie, validateDelMovieID } = require('../middlewares/celebrate');

router.get('/', getUserMovies);
router.post('/', validateNewMovie, createMovie);
router.delete('/:movieID', validateDelMovieID, deleteMovie);

module.exports = router;
