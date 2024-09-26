import Database from "../db/database.js";
import BaseModel from "./baseModel.js";
import CategoriaModel from "./categoriaModel.js";

const banco = new Database();

export default class ConteudoModel extends BaseModel {

    #id;
    #youtubeId;
    #titulo;
    #disponivel;
    #categoria;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get youtubeId() {
        return this.#youtubeId;
    }
    set youtubeId(value) {
        this.#youtubeId = value;
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(value) {
        this.#titulo = value;
    }

    get disponivel() {
        return this.#disponivel;
    }
    set disponivel(value) {
        this.#disponivel = value;
    }

    get categoria() {
        return this.#categoria;
    }
    set categoria(value) {
        this.#categoria = value;
    }

    constructor(id, youtubeId, titulo, disponivel, categoria) {
        super();
        this.#id = id;
        this.#youtubeId = youtubeId;
        this.#titulo = titulo;
        this.#disponivel = disponivel;
        this.#categoria = categoria;
    }

    async listar() {

        let sql = "select * from tb_conteudo con inner join tb_categoria cat on con.cat_id = cat.cat_id";
        let rows = await banco.ExecutaComando(sql);

        return this.toMap(rows);
    }

    async inserir() {

        let sql = "insert into tb_conteudo (con_youtubeid, con_titulo, con_disponivel, cat_id) values (?, ?, ?, ?)";
        let valores = [this.#youtubeId, this.#titulo, this.#disponivel, this.#categoria.id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {

        let sql = "select * from tb_conteudo where con_id = ?";
        let valores = [id];
        let rows = await banco.ExecutaComando(sql, valores);

        return this.toMap(rows, false);
    }

    async atualizar() {

        let sql = "update tb_conteudo set con_youtubeid = ?, con_titulo = ?, con_disponivel = ?, cat_id = ? where con_id = ?";
        let valores = [this.#youtubeId, this.#titulo, this.#disponivel, this.#categoria.id, this.#id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar (id) {
        
        let sql = "delete from tb_conteudo where con_id = ?";
        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(rows, isList = true) {
        let lista = [];

        for(let row of rows) {
            let obj = new ConteudoModel();
            obj.id = row["con_id"];
            obj.youtubeId = row["con_youtubeid"];
            obj.titulo = row["con_titulo"];
            obj.disponivel = row["con_disponivel"];
            obj.categoria = new CategoriaModel();
            obj.categoria.id = row["cat_id"];
            if(row["cat_descricao"] != null)
              obj.categoria.descricao = row["cat_descricao"];

            lista.push(obj);
        }
        if(isList)
          return lista;
        else
          return lista[0];
    }
}