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
//   createData('Gross Margin', 159),
//   createData('Operating Margin', 237),
//   createData('Net Profit Margin', 262),
//   createData('Return on Equity', 305),
//   createData('Return on Assets', 356),
// ];

export default function SimpleTable(props) {
  const classes = useStyles();

  const rows = [
    createData('Gross Margin', props.dat.filter(x =>x.indicatorName == "Gross Margin").map(x => {return x.value})),
    createData('Operating Margin', props.dat.filter(x =>x.indicatorName == "Operating Margin").map(x => {return x.value})),
    createData('Net Profit Margin', props.dat.filter(x =>x.indicatorName == "Net Profit Margin").map(x => {return x.value})),
    createData('Return on Equity', props.dat.filter(x =>x.indicatorName == "Return on Equity").map(x => {return x.value})),
    createData('Return on Assets', props.dat.filter(x =>x.indicatorName == "Return on Assets").map(x => {return x.value})),
  ]

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Profitable Ratios</TableCell>
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
