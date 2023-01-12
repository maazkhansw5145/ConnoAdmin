import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { format } from "date-fns";

export default function EnhancedTable(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Email Id</b>
                </TableCell>
                <TableCell align="center">
                  <b>Date</b>
                </TableCell>
                <TableCell align="center">
                  <b>Bookmaker</b>
                </TableCell>
                <TableCell align="center">
                  <b>Details</b>
                </TableCell>
                <TableCell align="center">
                  <b><span style={{color:'green'}}>Profit</span> / <span style={{color:'red'}}>Loss</span>&nbsp;$</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.profits.map((profit, index) => {
                return profit.profit_tracker.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{profit.email}</TableCell>
                      <TableCell align="center">
                        {format(new Date(row.date), "yyyy/MM/dd")}
                      </TableCell>
                      <TableCell align="center">{row.bookmaker}</TableCell>
                      <TableCell align="center">{row.details}</TableCell>
                      <TableCell align="center"><b><span style={{color: row.type === "loss" ? 'red' :'green'}}>{row.amount}</span></b></TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
