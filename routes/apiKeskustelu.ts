import express from "express";
import { PrismaClient } from "@prisma/client";
import { Virhe } from "../errors/virhekasittelija";

const prisma: PrismaClient = new PrismaClient();

export const apiKeskuteluRouter: express.Router = express.Router();

apiKeskuteluRouter.use(express.json());

apiKeskuteluRouter.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let vastaus = await prisma.keskustelu.findMany();        
        res.json(vastaus);
    } catch (e: any) {
        next(new Virhe());
    }
})

apiKeskuteluRouter.post("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {        
        if (req.body.otsikko.length > 0 && req.body.sisalto.length > 0) {            
            await prisma.keskustelu.create({
                data: {
                    otsikko: req.body.otsikko,
                    sisalto: req.body.sisalto,
                    kirjoittaja: req.body.kirjoittaja
                }
            });

            res.json(await prisma.keskustelu.findMany());
        } else {
            next(new Virhe(400));
        }
    } catch (e: any) {
        next(new Virhe());
    }
})