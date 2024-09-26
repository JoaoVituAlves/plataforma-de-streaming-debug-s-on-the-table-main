import jwt from 'jsonwebtoken';

const SEGREDO = "CR7SIUUUUUUUU@@@@";

export default class AuthMiddleware {

    gerarToken(id, email, nome, datacadastro) {
        return jwt.sign({
            id: id,
            email: email,
            nome: nome,
            datacadastro: datacadastro
        }, SEGREDO, { expiresIn: 500 });
    }

    validar(req, res, next) {
        let chave = req.headers.authorization;
    
        if (chave && chave.startsWith("Bearer ")) {
            chave = chave.slice(7, chave.length).trim();
    
            try {
                const obj = jwt.verify(chave, SEGREDO);
                if (obj) {
                    next();
                } else {
                    res.status(401).json({ msg: "Não autorizado!" });
                }
            } catch (ex) {
                res.status(401).json({ msg: "Não autorizado!" });
            }
        } else {
            res.status(401).json({ msg: "Não autorizado!" });
        }
    }    
}