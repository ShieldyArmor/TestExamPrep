const { Router } = require('express');
const authController = require('../controllers/authController')
const {requireAuth} = require('../middleware/authMiddleware') 

const router = Router();

router.get('/', authController.home_get);
router.get('/admin', requireAuth, authController.adminMain_get);
router.get('/admin/guide', requireAuth, authController.adminGuide_get);
router.get('/login', authController.login_get);
router.get('/logout', authController.logout_get);

// router.post('/hashing', authController.hashing_post);
// router.post('/login', authController.login_post);

module.exports = router;