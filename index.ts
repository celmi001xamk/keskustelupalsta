import express from "express";
import { virhekastittelija } from "./errors/virhekasittelija";
import path from "path";
import { apiKeskuteluRouter } from "./routes/apiKeskustelu";

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 3107;

app.use(express.static(path.resolve(__dirname, "public")))

app.use("/api/keskustelu", apiKeskuteluRouter);

app.use(virhekastittelija);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!res.headersSent) {
        res.status(404).json({ viesti: "Virheellinen reitti" });
    }
    next();
});

app.listen(port, () => {
    console.log(`Palvelin käynnistyi porttiin : ${port}`)
});