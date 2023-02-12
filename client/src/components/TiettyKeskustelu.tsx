import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

export const TiettyKeskustelu: React.FC = (): React.ReactElement => {

    const keskustelu: any = useLocation().state;

    return (
        <Paper sx={{ mb: 5, p: 3 }} elevation={10}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>
                        <span dangerouslySetInnerHTML={{ __html: String(keskustelu.kirjoittaja) }} />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        <span dangerouslySetInnerHTML={{ __html: keskustelu.otsikko }} />
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography>
                        <span dangerouslySetInnerHTML={{ __html: keskustelu.sisalto }} />
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="body2">{new Date(keskustelu.aikaleima).toLocaleDateString("fi-FI")}</Typography>
                </Grid>
                <Grid item >
                    <Typography variant="body2">{new Date(keskustelu.aikaleima).toLocaleTimeString("fi-FI").replace(/\./g, ":")}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
