import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "../../hooks/useCookies";
import { v4 } from "uuid";
import Loading from "../../components/Loading";
import {
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [classRoom, setClassRoom] = useState([]);
  const [username, setUsername] = useState("");
  const { authAdmin } = useAuth();
  const { getTeacherAnimals, updateTeacherAnimal, getClassRoomAttempts } = useApi();
  const { getCookie, removeCookie } = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      setUsername((await getCookie("user"))?.username);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (username) {
        setLoading(true);

        const AnimalsData = await getTeacherAnimals(username);
        const AttemptsData = await getClassRoomAttempts(username);

        setAnimals(AnimalsData);
        setClassRoom(AttemptsData);

        setLoading(false);
      }
    })();
  }, [username]);

  const updateAnimalCheckBox = async (animalName, state) => {
    updateTeacherAnimal(username, animalName, state);
    if (animals.filter(animal => animal.selected).length !== 3 || state)
      setAnimals(currentAnimals =>
        currentAnimals.map(animal =>
          animal.name === animalName ? { ...animal, selected: state } : animal
        )
      );
  };

  const logout = () => {
    removeCookie("authteacher");
    removeCookie("user");
    navigate("/", { replace: true });
  };


  return (
    authAdmin && <>
      <StyledHeader>
        <h2>Olá, {username}</h2>
        <button onClick={logout}>Sair</button>
      </StyledHeader>

      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", margin: "4rem 0" }}>
        <DashBoardContainer>
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
                      <StyledTableCell align="right">
                        <Switch
                          checked={!!animal.selected}
                          onChange={() => updateAnimalCheckBox(animal.name, !animal.selected)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div >
        </DashBoardContainer >
        <DashBoardContainer>
          <div className="content">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Tentativas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classRoom.map((student) => (
                    <TableRow key={student.username}>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<h5>v</h5>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            Clique aqui para ver mais
                          </AccordionSummary>
                          <AccordionDetails>
                            {student.attempts.map((attempt, index) =>
                              <div key={v4()}>
                                <h3 className="font-extrabold mx-0 mt-6 mb-2 tracking-wider text-3xl">Tentativa {index + 1}:</h3>
                                <h4 className="text-2xl font-bold">Fase {attempt.phase}:</h4>
                                <h5 className="text-xl">Data: {new Date(attempt.date).toLocaleString("pt-BR")}</h5>
                                {attempt?.tries?.map(phase =>
                                  <div key={v4()} style={{ display: "flex", alignItems: "center" }}>
                                    <h5 className="mr-1 text-xl">{phase.animal}:</h5>
                                    <h6 className="text-lg">{phase.isCorrect ? "Acertou" : "Errou"}</h6>
                                  </div>
                                )}
                              </div>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DashBoardContainer>
      </div>
      {loading && <Loading />}
    </>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#111",
    color: "#eaeaea",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#999",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DashBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(200, 200, 200, 1);
    width: 60%;
    padding: 2rem;
    border-radius: .5rem;
  }

  h1 {
    text-align: center;
    text-transform: uppercase;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  background-color: rgba(200, 200, 200, 1);
  gap: 1rem;
  padding: 0 3rem;

  h2 {
    font-size: 1.5rem;
  }

  button {
    font-size: 1rem;
    background-color: #111;
    color: #FBFBFB;
    letter-spacing: .2rem;
    border-radius: 5px;
    padding: .2rem 1rem;
  }
`;

export default DashBoard;
