import styled from "styled-components"
import { useAuth } from "../../hooks/useAuth"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material"
import useApi from "../../hooks/useApi";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "../../hooks/useCookies";

const DashBoard = () => {
  const [animals, setAnimals] = useState([])
  const { authAdmin } = useAuth()
  const { getTeacherAnimals } = useApi()
  const { getCookie } = useCookies()

  useEffect(() => {
    (async function () {
      const { username } = await getCookie('user')
      const data = await getTeacherAnimals(username)
      setAnimals(data)
    })()
  }, [])

  return (
    authAdmin && <DashBoardContainer>
      <div className="content">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Animais</StyledTableCell>
                <StyledTableCell align="right">Selecionado</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map((animal) => (
                <StyledTableRow key={animal.name}>
                  <StyledTableCell component="th" scope="row">
                    {animal.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{animal.selected ? 'Sim' : 'Não'}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DashBoardContainer>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#111',
    color: '#eaeaea',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#999',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DashBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(200, 200, 200, 1);
    width: 60%;
    padding: 2rem;
    border-radius: .5rem;

    h1 {
      text-align: center;
      text-transform: uppercase;
    }
  }
`

export default DashBoard
