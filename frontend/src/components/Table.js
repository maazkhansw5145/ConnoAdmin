import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { format } from "date-fns";
import Loading from "./Loading";

export default function EnhancedTable(props) {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   calculateTotal()
  }, [props.profits]);

const calculateTotal = () => {
  let final = [];
  props.profits.forEach((profit) => {
    console.log(profit)
    let total = 0;
    profit.profit_tracker.forEach((tracker) => {
      if (tracker.type === "profit") {
        total = total + tracker.amount;
      } else {
        total = total - tracker.amount;
      }
    });
    final.push({ email: profit.email, amount: total });
  });
  setProfits([...final]);
  setLoading(false);
}

  if (loading) {
    return <Loading />;
  }
console.log(profits)
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
                {/* <TableCell align="center">
                  <b>Date</b>
                </TableCell>
                <TableCell align="center">
                  <b>Bookmaker</b>
                </TableCell>
                <TableCell align="center">
                  <b>Details</b> */}
                {/* </TableCell> */}
                <TableCell align="center">
                  <b>Total Profit&nbsp;$</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profits.map((profit, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{profit.email}</TableCell>
                    {/* <TableCell align="center">
                        {format(new Date(row.date), "yyyy/MM/dd")}
                      </TableCell>
                      <TableCell align="center">{row.bookmaker}</TableCell>
                      <TableCell align="center">{row.details}</TableCell> */}
                    <TableCell align="center">
                      <b>
                        <span
                          style={{
                            color: profit.amount < 0 ? "red" : "green",
                          }}
                        >
                          {profit.amount < 0 && " - "}
                          {profit.amount}
                        </span>
                      </b>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
