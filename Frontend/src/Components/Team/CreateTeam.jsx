import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function CreateTeam() {
  const [Team_name, setTeam_name] = useState("");
  const [Team_Id, setTeam_Id] = useState();
  const [msg, setmsg] = useState("");

  const CreateNewTeam = async () => {
    try {
      const TeamData = await axios
        .post("http://localhost:8000/api/teams/team", { Team_name, Team_Id })
        .then((res) => res.data.message);

      setmsg(TeamData);
      setTeam_name("");
      setTeam_Id("");
    } catch (error) {
      console.log("Errror while Creating New Team");
    }
  };

  if (msg.length > 0) {
    setTimeout(() => {
      setmsg("");
    }, 3000);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-20 sm:px-20 md:px-40 lg:px-96">
      {msg.length > 0 && (
        <div
          className="bg-blue-500 text-white px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{msg}</span>
        </div>
      )}

      <div className="mb-4 ">
        <label
          htmlFor="teamName"
          className="block text-gray-700 font-semibold mb-2"
        >
          Team Name:
        </label>
        <input
          id="teamName"
          type="text"
          value={Team_name}
          placeholder="Team name"
          onChange={(e) => setTeam_name(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="teamId"
          className="block text-gray-700 font-semibold mb-2"
        >
          Team Id:
        </label>
        <input
          id="teamId"
          type="number"
          value={Team_Id}
          placeholder="Team id"
          onChange={(e) => setTeam_Id(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex gap-5">
        <button
          onClick={CreateNewTeam}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Team
        </button>
        <NavLink to={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Back
        </NavLink>
      </div>
    </div>
  );
}

export { CreateTeam };
