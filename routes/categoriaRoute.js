import express from 'express'
import CategoriaController from '../controllers/categoriaController.js';
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

let ctrl = new CategoriaController();
let auth = new AuthMiddleware();

router.get("/", auth.validar, (req, res) => {
    //#swagger.tags = ['Categorias']
    //#swagger.summary = 'Retorna todas as categorias'
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.listar(req, res);
});

export default router;