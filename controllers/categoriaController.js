import CategoriaModel from "../models/categoriaModel.js";

export default class CategoriaController {

    async listar(req, res) {
        try{
            let categoria = new CategoriaModel();
            let lista = await categoria.listar();
            if(lista && lista.length > 0) 
              res.status(200).json(lista);
            else
              res.status(404).json({msg: "Nenhuma categoria encontrada!"});
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }
}