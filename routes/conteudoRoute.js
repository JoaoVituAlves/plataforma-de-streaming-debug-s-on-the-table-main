import express from 'express'
import ConteudoController from '../controllers/conteudoController.js';
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

let ctrl = new ConteudoController();
let auth = new AuthMiddleware();

router.get("/", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Retorna todos os conteúdos'
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.listar(req, res);
});
router.post("/", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Cadastra um conteúdo'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudoModel"
                    }  
                }
            }
        } 
    */
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.inserir(req, res);
});
router.get("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Retorna um conteúdo através do id'
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.obter(req, res);
});
router.put("/", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Altera um conteúdo'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudoAlteracaoModel"
                    }  
                }
            }
        } 
    */
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.atualizar(req, res);
});
router.delete("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Deleta um conteúdo'
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.deletar(req, res);
});
router.get("/assistir/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Retorna o vídeo incorporado no HTML'
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.assistir(req, res);
});

router.get("/capa/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Conteúdos']
    //#swagger.summary = 'Retorna a capa do vídeo em HTML'
    /* #swagger.security = [{
    "bearerAuth": []
    }]*/
    ctrl.capa(req, res);
});

export default router;