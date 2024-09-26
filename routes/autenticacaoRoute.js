import express from 'express';
import AutenticacaoController from '../controllers/autenticacaoController.js';

const router = express.Router();

let ctrl = new AutenticacaoController();

router.post("/token", (req, res) => {
    // #swagger.tags = ['Autenticação']
    //#swagger.summary = 'Esquema de segurança para proteger os endpoints'
           /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/usuarioModel"
                    }  
                }
            }
        } 
    */
    ctrl.token(req, res);
});

export default router;