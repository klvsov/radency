import { useRef, useState } from 'react';

import { CSVReader } from 'react-papaparse';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import TableContent from './components/TableContent';

import './App.css';

const DATE_TEST_1 = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const DATE_TEST_2 = /(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d/i;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [isCSV, setIsCSV] = useState(false);
  const [startLoad, setStartLoad] = useState(false);

  const buttonRef = useRef(null);

  const getUsers = (data) => {
    setUsers(data);
  };

  const handleOpenDialog = (event) => {
    if (buttonRef.current) {
      buttonRef.current.open(event);
    }
  };

  let fileInsideError = '';
  if (!!users.length && !loadError && isCSV) {
    fileInsideError = users.find(
      (el) =>
        el.data[0].trim() === '' ||
        el.data[1].trim() === '' ||
        el.data[2].trim() === ''
    );
    if (fileInsideError && !fileInsideError.length) {
      setLoadError(true);
    }
  }

  const objUsers = [];
  const phones = [];
  const emails = [];
  const duplicates = [];

  if (!!users.length && isCSV && !loadError) {
    users.map((el, i) => {
      objUsers.push({
        id: i,
        fullName: el.data[0].trim(),
        phone: `+1${el.data[1].slice(-10)}`,
        email: el.data[2],
        age: parseInt(el.data[3]) ? parseInt(el.data[3]) : el.data[3],
        experience: parseInt(el.data[4]) ? parseInt(el.data[4]) : el.data[4],
        yearlyIncome: parseFloat(el.data[5])
          ? parseFloat(el.data[5]).toFixed(2)
          : el.data[5],
        hasChildren: el.data[6] === '' ? 'FALSE' : el.data[6],
        licenseStates: el.data[7],
        expirationDate: el.data[8],
        licenseNumber: el.data[9],
        phoneError: `+1${el.data[1].slice(-10)}`.length === 12 ? false : true,
        emailError: false,
        ageError:
          parseInt(el.data[3]) && parseInt(el.data[3]) >= 21 ? false : true,
        experienceError:
          parseInt(el.data[4]) &&
          parseInt(el.data[4]) >= 0 &&
          parseInt(el.data[4]) < parseInt(el.data[3]) - 21
            ? false
            : true,
        yearlyIncomeError:
          parseFloat(el.data[5]) && parseFloat(el.data[5]) < 1000001
            ? false
            : true,
        hasChildrenError:
          el.data[6] === '' ||
          el.data[6].trim() === 'TRUE' ||
          el.data[6].trim() === 'FALSE'
            ? false
            : true,
        licenseStatesError: el.data[7].trim() ? false : true,
        expirationDateError: !(
          DATE_TEST_1.test(el.data[8]) ||
          (DATE_TEST_2.test(el.data[8]) && Date.parse(el.data[8]) > Date.now())
        ),
        licenseNumberError: el.data[9].length === 6 ? false : true,
        duplicate: '',
      });
      let tempPhone = `+1${el.data[1].slice(-10)}`;
      let tempEmail = el.data[2].toLowerCase();
      if (phones.includes(tempPhone)) {
        duplicates.push([i, phones.indexOf(tempPhone)]);
      }
      phones.push(tempPhone);

      if (emails.includes(tempEmail)) {
        duplicates.push([i, emails.indexOf(tempEmail)]);
      }
      emails.push(tempEmail.toLowerCase());
      return users;
    });
  }
  duplicates.map((el) => {
    objUsers[el[0]].duplicate = el[1];
    objUsers[el[1]].duplicate = el[0];
    return objUsers;
  });

  return (
    <Container>
      <CSVReader
        ref={buttonRef}
        onFileLoad={(data, file) => {
          getUsers(data);
          setStartLoad(true);
          if (file.name.slice(-3) !== 'csv') {
            setIsCSV(false);
          } else {
            setIsCSV(true);
          }
        }}
        onError={() => setLoadError(true)}
      >
        {() => (
          <aside style={{ display: 'flex', justifyContent: 'end' }}>
            <button
              type="button"
              className="custom-file-upload"
              onClick={handleOpenDialog}
            >
              Import users
            </button>
          </aside>
        )}
      </CSVReader>
      {!loadError && isCSV ? (
        !!users.length && <TableContent users={objUsers} />
      ) : (!isCSV && startLoad) || loadError ? (
        <Alert severity="error" className="alert">
          File format is not correct!
        </Alert>
      ) : null}
    </Container>
  );
};

export default App;
