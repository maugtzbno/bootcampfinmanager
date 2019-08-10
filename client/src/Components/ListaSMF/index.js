import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TablaSM1 from "../TablaSM1"
import TablaSM2 from "../TablaSM2"
import API from "../../utils"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  let [Fin, setFin] = useState([]);
    useEffect(() => {
        API.getRatios(props.ticker).then(x => {

            console.log("docs simfin", x.data)
            setFin(x.data)
        });
    }, [props.ticker]
    );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Key Financial and Ratios (all figures TTM as per Jun 30, 2019, million USD, full statements further below)
</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><TablaSM1 dat={Fin}/></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><TablaSM2 dat={Fin}/></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
