import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableContent = ({ users }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Experience Yearly</TableCell>
            <TableCell>Yearly Income</TableCell>
            <TableCell>Has children</TableCell>
            <TableCell>License states</TableCell>
            <TableCell>Expiration date</TableCell>
            <TableCell>License number</TableCell>
            <TableCell>Duplicate with</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(
            (row, i) =>
              i !== 0 && (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell
                    align="center"
                    className={row.fullNameError ? 'error-cell' : null}
                  >
                    {row.fullName}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.phoneError ? 'error-cell' : null}
                  >
                    {row.phone}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell
                    align="center"
                    className={row.ageError ? 'error-cell' : null}
                  >
                    {row.age}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.experienceError ? 'error-cell' : null}
                  >
                    {row.experience}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.yearlyIncomeError ? 'error-cell' : null}
                  >
                    {row.yearlyIncome}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.hasChildrenError ? 'error-cell' : null}
                  >
                    {row.hasChildren}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.licenseStatesError ? 'error-cell' : null}
                  >
                    {row.licenseStates}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.expirationDateError ? 'error-cell' : null}
                  >
                    {row.expirationDate}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={row.licenseNumberError ? 'error-cell' : null}
                  >
                    {row.licenseNumber}
                  </TableCell>
                  <TableCell align="center">{row.duplicate}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
