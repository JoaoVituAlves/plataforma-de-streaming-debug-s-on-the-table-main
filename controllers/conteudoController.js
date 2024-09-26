import CategoriaModel from "../models/categoriaModel.js";
import ConteudoModel from "../models/conteudoModel.js";

export default class ConteudoController {

    async listar(req, res) {
        try{
            let conteudo = new ConteudoModel();
            let lista = await conteudo.listar();
            if(lista && lista.length > 0) 
              res.status(200).json(lista);
            else
              res.status(404).json({msg: "Nenhum conteúdo encontrado!"});
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async inserir(req, res) {
        try{
            let {youtubeId, titulo, disponivel, categoria} = req.body;
            if(youtubeId && titulo && disponivel && categoria && categoria.id > 0) {
                let conteudoModel = new ConteudoModel(0, youtubeId, titulo, disponivel, categoria);
                let result = await conteudoModel.inserir();
                if(result) {
                    res.status(201).json({msg: "Conteúdo cadastrado!"});
                }
                else {
                    throw new Error("Erro ao inserir conteúdo no banco de dados!");
                }
            }
            else {
                res.status(400).json({msg: "Parâmetros inválidos!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obter(req, res) {
        try{
            let {id} = req.params;
            let conteudo = new ConteudoModel();
            conteudo = await conteudo.obter(id);
            if(conteudo) {
                res.status(200).json(conteudo);
            }
            else {
                res.status(404).json({msg: "Conteúdo não encontrado!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async atualizar(req, res) {
        try{
            let {id, youtubeId, titulo, disponivel, categoria} = req.body;
            if(id && youtubeId && titulo && disponivel && categoria.id > 0) {
                let conteudoModel = new ConteudoModel(id, youtubeId, titulo, disponivel, new CategoriaModel(categoria.id));

                if(await conteudoModel.obter(id)) {
                    let result = await conteudoModel.atualizar();

                    if(result) {
                        res.status(200).json({msg: "Conteúdo alterado!"});
                    }
                    else {
                        throw new Error("Erro ao atualizar conteúdo no banco de dados!");
                    }
                }
                else {
                    res.status(404).json({msg: "Nenhum conteúdo encontrado para alteração!"});
                }
            }
            else {
                res.status(400).json({msg: "Parâmetros inválidos!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            let conteudoModel = new ConteudoModel();
            let result = await conteudoModel.deletar(id);
            if(result) {
                res.status(200).json({msg: "Conteúdo deletado!"});
            }
            else {
                throw new Error("Erro ao deletar conteúdo no banco de dados!");
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async assistir(req, res) {
        try {
            let { id } = req.params;
            let conteudo = await new ConteudoModel().obter(id);
            if (conteudo) {
                res.setHeader('Content-Type', 'text/html');
                res.send(`<iframe width="560" height="315" allow='autoplay' src="https://www.youtube.com/embed/${conteudo.youtubeId}?autoplay=1"></iframe>`);
            } else {
                res.status(404).json({ msg: "Conteúdo não encontrado!" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async capa(req, res) {
        try {
            let { id } = req.params;
            let conteudo = await new ConteudoModel().obter(id);
            if (conteudo) {
                res.setHeader('Content-Type', 'text/html');
                res.send(`<img src="https://i.ytimg.com/vi/${conteudo.youtubeId}/hqdefault.jpg"/>`);
            } else {
                res.status(404).json({ msg: "Conteúdo não encontrado!" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }
}



