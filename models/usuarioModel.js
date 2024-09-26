import Database from "../db/database.js";
import BaseModel from "./baseModel.js";

const banco = new Database();

export default class UsuarioModel extends BaseModel {

    #id;
    #email;
    #senha;
    #nome;
    #datacadastro;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    get senha() {
        return this.#senha;
    }
    set senha(value) {
        this.#senha = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get datacadastro() {
        return this.#datacadastro;
    }
    set datacadastro(value) {
        this.#datacadastro = value;
    }

    constructor(id, email, senha, nome, datacadastro) {
        super();
        this.#id = id;
        this.#email = email;
        this.#senha = senha;
        this.#nome = nome;
        this.#datacadastro = datacadastro;
    }

    async validarAcesso(email, senha) {

        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    async obter(id) {

        let sql = "select * from tb_usuario where usu_id = ?";
        let valores = [id];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    toMap(rows) {
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let usuario = new UsuarioModel();
            usuario.#id = row["usu_id"];
            usuario.#email = row["usu_email"];
            usuario.#senha = row["usu_senha"];
            usuario.#nome = row["usu_nome"];
            usuario.#datacadastro = row["usu_datacadastro"];
            lista.push(usuario);
        }
        if(rows.length > 1)
          return lista;
        else
          return lista[0];
    }
}