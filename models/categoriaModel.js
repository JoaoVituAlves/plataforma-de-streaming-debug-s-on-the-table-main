import Database from "../db/database.js";
import BaseModel from "./baseModel.js";

const banco = new Database();

export default class CategoriaModel extends BaseModel {

    #id;
    #descricao;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    constructor(id, descricao) {
        super();
        this.#id = id;
        this.#descricao = descricao;
    }

    async listar() {

        let sql = "select * from tb_categoria";
        let rows = await banco.ExecutaComando(sql);

        return this.toMap(rows);
    }

    toMap(rows, isList = true) {
        let lista = [];

        for(let row of rows) {
            let obj = new CategoriaModel();
            obj.id = row["cat_id"];
            obj.descricao = row["cat_descricao"];

            lista.push(obj);
        }
        if(isList)
          return lista;
        else
          return lista[0];
    }
}