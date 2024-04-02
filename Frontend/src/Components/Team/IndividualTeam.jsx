import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IndividualTeam() {
  const { teamId } = useParams();
  console.log("Team id from param-",teamId)
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/teams/SingleTeam/${teamId}`
        );
        setTeam(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [teamId]);

  return (
    <div className="container mx-auto py-8 px-5 lg:px-20">
      {team && (
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">{team.Team_name}</h1>
            <p className="text-gray-600">Team ID: {team.Team_Id}</p>
          </div>
          <p className="font-bold">Team Members</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.Team_mambers.map((member, index) => (
              <div key={index} className="bg-white shadow-md rounded-md p-4">
                <img
                  src={member.avatar}
                  alt={member.first_name}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h2 className="text-lg font-semibold">
                  {member.first_name} {member.last_name}
                </h2>
                <p className="text-gray-600">{member.email}</p>
                <p className="text-gray-600">{member.domain}</p>
                <p className="text-gray-600">{member.gender}</p>
                <p className="text-gray-600">
                  {member.available ? "Available" : "Not Available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { IndividualTeam };
