import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";

import Loading from "./Loading";

export default function PremiumUsersTable(props) {
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPremiumUsers(props.users);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log(props);
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
                  <b>Transaction Hash</b>
                </TableCell>
                <TableCell align="center">
                  <b>Bought At</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {premiumUsers.length !== 0 &&
                premiumUsers.map((user, index) => {
                  console.log("UUUUUU", user);
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{user.email}</TableCell>

                      <TableCell align="center">
                        <a
                          href={`https://etherscan.io/tx/${user.premium.transaction_hash}`}
                          target="_blank"
                        >
                          {user.premium.transaction_hash}
                        </a>
                      </TableCell>
                      <TableCell align="center">
                        <b>{new Date(user.premium.bought_at).toDateString()}</b>
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
