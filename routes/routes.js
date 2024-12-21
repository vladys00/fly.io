//just a try
const router = require ('express').Router()

const upload = require('../config/multer.config')

const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth.middleware')

// miscellaneous controllers
const miscControllers = require('../controllers/misc.controllers')
// user controllers
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')
// island controllers
const islandController = require('../controllers/islands.controller')
//Creatures controllers
const creaturesController = require('../controllers/creatures.controller')

//Home 
router.get('/', miscControllers.renderHome);

// Welcome
router.get('/welcome', miscControllers.welcome);


//Play (priority 2)
router.get('/play', miscControllers.renderGame)
router.post('/savepoints', miscControllers.endGame)

//Islands 
router.get('/island-search', islandController.getIslands)
router.get('/island-main', islandController.renderMainIsland )
router.get('/island-form', islandController.formCreate)
router.post('/island-form', islandController.doFormCreate)
router.get('/island-explore/:id', islandController.exploreIsland)
router.get('/my-island', islandController.myIsland )
router.get("/my-island/:id/edit",islandController.editMyIsland)
router.post("/my-island/:id/edit",islandController.doEditMyIsland)

//Creatures 

router.get("/creature/list", creaturesController.list)
router.get("/creature/detail/:id", creaturesController.detail)
router.post("/creature/addToMyIsland/:id", creaturesController.addToMyIsland)
router.get('/creature/edit-my', creaturesController.editMyCreatures )
router.get('/creature/creatures-explore/:id', creaturesController.exploreCreatures )
router.get('/creatures/delete/:id', creaturesController.removeCreature)
//Users subscribe 
router.get('/subscribe', isNotAuthenticated, usersController.create)
router.post('/subscribe', isNotAuthenticated, upload.single('image'), usersController.doCreate)

//Users sign in 
router.get('/signin', isNotAuthenticated, authController.signin)
router.post('/signin', isNotAuthenticated, authController.doSignin)

// //Users log out
 router.get('/logout', isAuthenticated, authController.logout)

// //Users 
router.get('/profile', isAuthenticated, usersController.getCurrentUserProfile)
router.get('/profile-edit', isAuthenticated, usersController.editProfile)
router.post('/profile-edit', isAuthenticated, upload.single('image'),usersController.doEditProfile)
router.get('/top-score', isAuthenticated, usersController.getTopScore)
// router.get('/users/:id', isAuthenticated, usersController.getUserProfile)





module.exports = router 
