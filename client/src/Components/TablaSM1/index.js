import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
    // overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, data) {
  return { name, data };
}

// const rows = [
//   createData('Revenues', 159),
//   createData('Gross Profit', 237),
//   createData('Operating Income', 262),
//   createData('EBITDA', 305),
//   createData('Net Profit Margin', 356),
// ];

export default function SimpleTable(props) {
  const classes = useStyles();
  console.log(props,props.dat.filter(x =>x.indicatorName == "Revenues"));
  const rows = [
    createData('Revenues', props.dat.filter(x =>x.indicatorName == "Revenues").map(x => {return x.value})),
    createData('Gross Profit', props.dat.filter(x =>x.indicatorName == "Gross Profit").map(x => {return x.value})),
    createData('Operating Income', props.dat.filter(x =>x.indicatorName == "Operating Income (EBIT)").map(x => {return x.value})),
    createData('EBITDA', props.dat.filter(x =>x.indicatorName == "EBITDA").map(x => {return x.value})),
    createData('Net Profit Margin', props.dat.filter(x =>x.indicatorName == "Net Profit Margin").map(x => {return x.value})),
  ]

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Profit and Loss</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
