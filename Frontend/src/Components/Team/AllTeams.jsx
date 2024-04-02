import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllTeams() {
  const [teams, setteams] = useState([]);
  useEffect(() => {
    const FindAllTeams = async () => {
      const Allteams = await axios
        .get(`http://localhost:8000/api/teams/AllTeams`)
        .then((res) => res.data.data);

      console.log(Allteams);
      setteams(Allteams);
    };

    FindAllTeams();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="flex justify-center text-2xl font-bold py-4 ">
        All Teams
      </div>
      <div className=" w-96 grid grid-cols-1 sm:grid-cols-2 sm:w-auto md:grid-cols-3 md:w-auto lg:grid-cols-4 gap-8">
        {teams.map((team, index) => (
          <div key={index}>
            <NavLink to={`/team-members/${team._id}`}>
              <div key={index} className="bg-white shadow-md rounded-md p-4">
                <p className="font-semibold">Team Name: {team.Team_name}</p>
                <p className="text-gray-600 font-semibold">
                  Team Id: {team.Team_Id}
                </p>
                <p className="text-gray-600 font-semibold">
                  Team Members: {team.Team_mambers.length}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export { AllTeams };
