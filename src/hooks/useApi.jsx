import { apiLink } from "../utils/apiLink";

const useApi = () => {
  const getTeachers = async () => {
    const response = await fetch(`${apiLink}/teacher`);
    const data = await response.json();

    return data;
  };

  const getTeacherAnimals = async (username) => {
    const response = await fetch(`${apiLink}/animal/${username}`);
    const data = await response.json();

    return data;
  };

  const updateTeacherAnimal = async (username, animal, state) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: animal, state }),
    };
    const response = await fetch(`${apiLink}/animal/${username}`, requestOptions);
    const data = await response.json();

    return data;
  };

  const getClassRoomAttempts = async (username) => {
    const response = await fetch(`${apiLink}/attempt/teacher/${username}`);
    const data = await response.json();
    return data;
  };

  const postAttempt = async (phase, tries, username, teacherUser, authstudent) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", authstudent },
      body: JSON.stringify({ phase, tries }),
    };
    const response = await fetch(`${apiLink}/attempt/${teacherUser}/${username}`, requestOptions);
    const data = await response.json();

    return data;
  };

  return {
    getTeachers,
    getTeacherAnimals,
    updateTeacherAnimal,
    getClassRoomAttempts,
    postAttempt
  };
};

export default useApi;
