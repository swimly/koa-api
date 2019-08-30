const router = require('koa-router')()
import Mid from '../middleware'
import IndexController from '../controller/IndexController'
import UserController from '../controller/UserController'
import VerificationController from '../controller/VerificationController'
import StructureController from '../controller/StructureController'
import ComponentController from '../controller/ComponentController'
import FileController from '../controller/FileController'
import ArticleController from '../controller/ArticleController';
import CommentController from '../controller/CommentController';


router.get('/', IndexController.test)
router.post('/', IndexController.wechat)
router.get('/users', Mid.verifacationAuth(), UserController.getUsers)
router.get('/me', Mid.verifacationAuth(), UserController.me)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', Mid.verifacationAuth(), UserController.logout)
router.get('/captcha', Mid.verifacationAuth(), VerificationController.captcha)
router.post('/structure/add', Mid.verifacationAuth(), StructureController.add)
router.get('/structure', Mid.verifacationAuth(), StructureController.list)
router.get('/structure/list', Mid.verifacationAuth(), StructureController.structurelist)
router.post('/structure', Mid.verifacationAuth(), StructureController.delete)
router.post('/structure/member', Mid.verifacationAuth(), StructureController.addMember)
router.post('/structure/member/remove', Mid.verifacationAuth(), StructureController.delMember)
router.post('/component', Mid.verifacationAuth(), ComponentController.add)
router.get('/component/list', Mid.verifacationAuth(), ComponentController.list)
router.get('/component', Mid.verifacationAuth(), ComponentController.detail)
router.post('/upload/unzip', Mid.verifacationAuth() ,Mid.upload('component'),  FileController.uploadZip)
router.post('/upload/file', Mid.verifacationAuth() ,Mid.upload('file'),  FileController.uploadfile)
router.post('/upload/base64', Mid.verifacationAuth() ,Mid.base64('avatar'),  FileController.base64)
router.post('/upload/avatar', Mid.verifacationAuth() ,Mid.base64('avatar'),  FileController.avatar)

router.post('/article/add', Mid.verifacationAuth(), ArticleController.add)
router.get('/article/list', Mid.verifacationAuth(), ArticleController.list)
router.get('/article', Mid.verifacationAuth(), ArticleController.detail)

router.post('/comment/add', Mid.verifacationAuth(), CommentController.add)
router.get('/comments', Mid.verifacationAuth(), CommentController.commentlist)
router.post('/upload/psd', Mid.verifacationAuth(),  FileController.uploadPsd)
module.exports = router