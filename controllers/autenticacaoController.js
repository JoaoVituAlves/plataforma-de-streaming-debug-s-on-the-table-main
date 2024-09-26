import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioModel from "../models/usuarioModel.js";

export default class AutenticacaoController {

    async token(req, res) {
        try {
            let {email, senha} = req.body;

            if(email && senha) {
                let usuario = new UsuarioModel();
                usuario = await usuario.validarAcesso(email, senha);
                if(usuario) {
                    let auth = new AuthMiddleware();
                    let token = auth.gerarToken(usuario.id, usuario.email, usuario.nome, usuario.datacadastro);

                    res.cookie("token", token, {
                        httpOnly: true
                    })

                    res.status(200).json({chave: token});
                }
                else {
                    res.status(404).json({msg: "Credenciais inválidas!"});
                }
            }
            else {
                res.status(400).json({msg: "As credenciais não foram fornecidas corretamente!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
        
    }
}