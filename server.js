import express from 'express'
import routerConteudo from './routes/conteudoRoute.js'
import routerCategoria from './routes/categoriaRoute.js'
import routerAutenticacao from './routes/autenticacaoRoute.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use("/conteudos", routerConteudo);
app.use("/categorias", routerCategoria);
app.use("/auth", routerAutenticacao);

app.listen(5000, function() {
    console.log("backend em execução");
})

export default app;