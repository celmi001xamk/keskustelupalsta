import React, { useEffect, useState } from "react";
import { Alert, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { OmaKeskustelu } from "./OmaKeskustelu";

export interface Keskustelu {
    id: number,
    otsikko: string,
    sisalto: string,
    kirjoittaja: string,
    aikaleima: Date
}

interface ApiData {
    keskustelut: Keskustelu[],
    virhe: string,
    haettu: boolean
}


export const Etusivu: React.FC = (): React.ReactElement => {

    const navigate: NavigateFunction = useNavigate();

    const [apiData, setApiData] = useState<ApiData>({
        keskustelut: [],
        virhe: "",
        haettu: false
    })

    const apiKutsu = async (): Promise<void> => {
        setApiData({
            ...apiData,
            haettu: false
        });

        try {
            const yhteys = await fetch("api/keskustelu/");
            if (yhteys.ok) {
                setApiData({
                    ...apiData,
                    keskustelut: await yhteys.json(),
                    haettu: true
                })
            } else {
                setApiData({
                    ...apiData,
                    virhe: "Tietojen haussa tapahtui virhe",
                    haettu: true
                })
            }
        } catch (e: any) {
            setApiData({
                ...apiData,
                virhe: "Palvelimeen ei saada yhteyttä",
                haettu: true
            })
        }

    }

    useEffect(() => {
        apiKutsu();
    }, [])


    return (
        <>
            <Button onClick={() => navigate("/uusiKeskustelu")}
                fullWidth
                variant="contained"
                sx={{ my: 3 }}
            >
                Aloita uusi keskustelu
            </Button>
            {
                (Boolean(apiData.virhe))
                    ? <Alert severity="error">{apiData.virhe}</Alert>
                    : (apiData.haettu)
                        ?
                        <Box sx={{ flexGrow: 1 }}>
                            {apiData.keskustelut.sort((pvm1, pvm2) => Date.parse(pvm2.aikaleima.toString()) - Date.parse(pvm1.aikaleima.toString()))
                                .map((keskustelu: Keskustelu, idx: number) => {                                    
                                    return <OmaKeskustelu key={idx} idx={idx} keskustelu={keskustelu}/>                                
                                })}
                        </Box>
                        :
                        <Backdrop open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
            }
        </>
    );
};
