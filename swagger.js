import swaggerAutogen from "swagger-autogen";
import ConteudoModel from "./models/conteudoModel.js";
import CategoriaModel from "./models/categoriaModel.js";
import UsuarioModel from "./models/usuarioModel.js";

const doc = {
    info: {
        title: "API RESTful - Plataforma de Streaming",
    },
    host: 'localhost:5000',
    components: {
        "@schemas" : {
            usuarioModel: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        example: "teste@teste.com",
                        required: true
                    },
                    senha: {
                        type: "string",
                        example: "12345",
                        required: true
                    },
                }
            },
            categoriaModel: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        example: "1",
                        required: true
                    }
                }
            },
            conteudoModel: {
                type: "object",
                properties: {
                    youtubeId: {
                        type: "string",
                        example: "GDlkCkcIqTs",
                        required: true
                    },
                    titulo: {
                        type: "string",
                        example: "Título do vídeo",
                        required: true
                    },
                    disponivel: {
                        type: "string",
                        example: "S",
                        required: true
                    },
                    categoria: {
                        $ref: "#/components/schemas/categoriaModel"
                    }
                }
            },
            conteudoAlteracaoModel: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        example: "1",
                        required: true
                    },
                    youtubeId: {
                        type: "string",
                        example: "GDlkCkcIqTs",
                        required: true
                    },
                    titulo: {
                        type: "string",
                        example: "Título do vídeo",
                        required: true
                    },
                    disponivel: {
                        type: "string",
                        example: "S",
                        required: true
                    },
                    categoria: {
                        $ref: "#/components/schemas/categoriaModel"
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})