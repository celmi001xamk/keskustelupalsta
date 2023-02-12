import React, { useRef } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useNavigate, NavigateFunction } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const UusiKeskustelu: React.FC = (): React.ReactElement => {

    const navigate: NavigateFunction = useNavigate();
    const lomakeRef: any = useRef<HTMLFormElement>();
    const quillRef: any = useRef<any>();

    const lisaaKeskustelu = async (e: React.FormEvent) => {
        e.preventDefault();
        if (lomakeRef.current.otsikko.value.length > 0 &&
            quillRef.current.getEditorContents() !== "<p><br></p>" &&
            String(quillRef.current.getEditorContents() !== "undefined")) {

            const yhteys = await fetch("api/keskustelu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    otsikko: lomakeRef.current.otsikko.value,
                    sisalto: quillRef.current.getEditorContents(),
                    kirjoittaja: lomakeRef.current.nimimerkki.value ? lomakeRef.current.nimimerkki.value : "Anonyymi"
                })
            });
            if (yhteys.ok) {
                navigate("/");
            }
        }
    }
    return (
        <Stack
            component="form"
            onSubmit={lisaaKeskustelu}
            ref={lomakeRef}
            spacing={2}>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField
                        name="otsikko"
                        label="Otsikko"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        name="nimimerkki"
                        label="Nimimerkki"
                        fullWidth
                    />

                </Grid>
                <Grid item xs={12}>
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        style={{
                            height: 300
                        }} />
                </Grid>
                <Grid item xs={8} >
                    <Button sx={{ mt: 5 }} variant="contained" fullWidth type="submit">Aloita uusi keskustelu</Button>
                </Grid>
                <Grid item xs={4} >
                    <Button sx={{ mt: 5 }} variant="outlined" fullWidth onClick={() => navigate("/")}>Peruuta</Button>
                </Grid>
            </Grid>


        </Stack>
    );
};
