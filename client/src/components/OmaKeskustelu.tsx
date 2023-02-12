import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate, NavigateFunction } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { Keskustelu } from "./Etusivu";

interface Props {
    keskustelu: Keskustelu,
    idx: number
}

export const OmaKeskustelu: React.FC<Props> = (props: Props): React.ReactElement => {

    const navigate: NavigateFunction = useNavigate();

    return (
        <Paper sx={{ mb: 5, p: 3 }} elevation={10}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>
                        <span dangerouslySetInnerHTML={{ __html: props.keskustelu.kirjoittaja }} />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" onClick={() => navigate("/tiettyKeskustelu", {state: props.keskustelu})}>
                        <span dangerouslySetInnerHTML={{ __html: props.keskustelu.otsikko }} />
                    </Typography>
                </Grid>                
                <Grid item >
                    <Typography variant="body2">{new Date(props.keskustelu.aikaleima).toLocaleDateString("fi-FI")}</Typography>
                </Grid>
                <Grid item >
                    <Typography variant="body2">{new Date(props.keskustelu.aikaleima).toLocaleTimeString("fi-FI").replace(/\./g, ":")}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
