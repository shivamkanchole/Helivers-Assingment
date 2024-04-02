import { useEffect, useState } from "react";
import Axios from "axios";
import { RxArrowLeft } from "react-icons/rx";
import { RxArrowRight } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FcFilledFilter } from "react-icons/fc";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Cards() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Filtersection, setFiltersection] = useState(false);
  const [domainfilter, setdomainfilter] = useState("");
  const [genderfilter, setgenderfilter] = useState("");
  const [isChecked, setisChecked] = useState(true);
  const navigate = useNavigate();
  const [id, setid] = useState();
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [domain, setdomain] = useState("");
  const [available, setavailable] = useState(true);

  const [TeamSectionToggle, setTeamSectionToggle] = useState(NaN);
  const [UpdateSectionToggle, setUpdateSectionToggle] = useState(NaN);
  const [Team_name, setTeam_name] = useState("");
  const [Team_Id, setTeam_Id] = useState();
  const [msg, setmsg] = useState("");
  const [Deletemsg, setDeletemsg] = useState("");

  const Seachthis = useSelector((state) => state.search.Searchvalue);
  console.log("This is from card-", Seachthis);

  useEffect(() => {
    const generateCards = async () => {
      try {
        const cardsData = await Axios.get(
          `http://localhost:8000/api/users/getallusers`,
          {
            params: {
              page: currentPage,
              first_name: Seachthis,
              domain: domainfilter,
              gender: genderfilter,
              available: isChecked,
            },
          }
        ).then((res) => res.data.data);
        console.log(cardsData);
        setCards(cardsData);
      } catch (error) {
        console.log("Error while Fetching data about cards:", error);
      }
    };

    generateCards();
  }, [
    currentPage,
    Seachthis,
    domainfilter,
    genderfilter,
    isChecked,
    Deletemsg,
    UpdateSectionToggle,
  ]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    const newPage = currentPage - 1 <= 1 ? 1 : currentPage - 1;
    setCurrentPage(newPage);
  };

  const ToggleFilterBox = () => {
    setFiltersection(!Filtersection);
  };

  const setDomainFilterInput = (e) => {
    setdomainfilter(e.target.value);
  };

  const setGenderFilterInput = (data) => {
    setgenderfilter(data);
  };

  const setAvaliblityFilterInput = (data) => {
    setisChecked(data.target.checked);
  };

  const ResetFilterValues = () => {
    setdomainfilter("");
    setgenderfilter("");
    setisChecked(true);
  };

  const AddMeToTeam = (user_Id) => {
    console.log(user_Id);
    setTeamSectionToggle(user_Id);
  };

  if (msg.length > 0) {
    setTimeout(() => {
      setmsg("");
    }, 3000);
  }

  const AddMemberToTeam = async () => {
    try {
      const TeamData = await axios
        .post(
          `http://localhost:8000/api/teams/addmember/${TeamSectionToggle}`,
          {
            Team_name,
            Team_Id,
          }
        )
        .then((res) => res.data);

      setmsg(TeamData.message);
      setTeam_name("");
      setTeam_Id("");
    } catch (error) {
      console.log("Errror while Creating New Team", error);
    }
  };

  const MissionAbort = () => {
    setTeamSectionToggle(NaN);
    setUpdateSectionToggle(NaN);
  };

  const DeleteUserData = async (_id) => {
    console.log(_id);
    try {
      const DeleteMsg = await axios
        .delete(`http://localhost:8000/api/users/deleteuser/${_id}`)
        .then((res) => res.data);
      console.log("User Data after Deletion:", DeleteMsg);
      setDeletemsg(DeleteMsg.message);
    } catch (error) {
      console.log("Error While Deleting User:", error);
    }
  };

  const UpdateUserData = (userId) => {
    console.log("Update is called", userId);
    setUpdateSectionToggle(userId);
    console.log(UpdateSectionToggle);
  };

  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    try {
      const userResponse = await axios
        .put(`http://localhost:8000/api/users/updateuser/${userId}`, {
          id,
          first_name,
          last_name,
          email,
          gender,
          domain,
          available,
        })
        .then((res) => res.data);

      console.log(userResponse);
      setmsg(userResponse.message);
      setUpdateSectionToggle(NaN);
    } catch (error) {
      console.log("Error While Creating New User in Frontend", error);
    }
  };

  return (
    <div className="container mx-auto ">
      <div
        className=" flex justify-end items-center cursor-pointer bg-[#FDFDFD] mx-5"
        onClick={ToggleFilterBox}
      >
        <span className="text-gray-600 mr-2">Filter search</span>
        <FcFilledFilter className="w-7 h-7 text-gray-600" />
      </div>

      {Filtersection && (
        <div className="bg-gray-100 rounded-lg p-4 shadow-md mx-5">
          <div>
            <p className="mb-2">Domain:</p>
            <input
              type="text"
              value={domainfilter}
              placeholder="Filter by domain"
              onChange={setDomainFilterInput}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mt-4">
            <p className="mb-2">Gender:</p>
            <div className="flex gap-4">
              <label
                className="flex items-center gap-2"
                onClick={() => setGenderFilterInput("Male")}
              >
                Male
                <input
                  type="radio"
                  value={genderfilter}
                  name="gender"
                  className="form-radio"
                />
              </label>
              <label
                className="flex items-center gap-2"
                onClick={() => setGenderFilterInput("Female")}
              >
                Female
                <input
                  type="radio"
                  value={genderfilter}
                  name="gender"
                  className="form-radio"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2">Availability:</p>
            <label
              className="flex items-center gap-2"
              onChange={setAvaliblityFilterInput}
            >
              <input
                type="checkbox"
                checked={isChecked}
                className="form-checkbox"
              />
              Available
            </label>
          </div>
          <div className="flex gap-7 justify-end px-5">
            <button
              onClick={ResetFilterValues}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
            <button
              className="bg-[#F57C00] hover:bg-[rgb(236,171,106)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={ToggleFilterBox}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) =>
          card._id === TeamSectionToggle ? (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 mt-20 "
            >
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
                  placeholder="Enter Team Name To Joint"
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
                  placeholder="Enter Team ID To Joint"
                  onChange={(e) => setTeam_Id(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-5">
                <button
                  onClick={AddMemberToTeam}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Me
                </button>
                <button
                  onClick={MissionAbort}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>
              </div>
            </div>
          ) : card._id === UpdateSectionToggle ? (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold mb-4">Update User Details</p>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setfirst_name(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setlast_name(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Id"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setid(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setemail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Gender (Male/Female)"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setgender(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Domain"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setdomain(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Availiblity (True/False)"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => setavailable(e.target.value)}
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={(e) => handleSubmit(e, card._id)}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={MissionAbort}
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 ">
              <div
                className="flex justify-end"
                onClick={() => DeleteUserData(card._id)}
              >
                <RiDeleteBin6Line className=" text-[#f20707] font-bold size-5" />
              </div>
              <div className="mb-4 flex items-center justify-center">
                <img
                  src={card.avatar}
                  alt="image"
                  className=" w-40 h-40 rounded-full"
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold">
                  FullName: {card.first_name} {card.last_name}
                </p>
                <p className="font-semibold">Id: {card.id}</p>
                <p className="font-semibold">Gender: {card.gender}</p>
                <p className="font-semibold">Email: {card.email}</p>
                <p className="font-semibold">Domain: {card.domain}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  {card.available ? (
                    <div className="bg-[#76FF03] text-black px-2 py-1 rounded-full ">
                      Available
                    </div>
                  ) : (
                    <div className="bg-[#F44336] text-black px-2 py-1 rounded-full">
                      Not Available
                    </div>
                  )}
                </p>
                <div className="flex item-center justify-center gap-3 ">
                  <button
                    onClick={() => UpdateUserData(card._id)}
                    className="bg-blue-500 hover:bg-[#1F2937] text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => AddMeToTeam(card._id)}
                    className="bg-blue-500 hover:bg-[#1F2937] text-white font-bold py-2 px-4 rounded mt-2 "
                  >
                    Add To Team
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex justify-center h-20 items-center w-full">
        <div className="flex items-center" onClick={previousPage}>
          <RxArrowLeft /> <span>PREVIOUS</span>
        </div>
        <div className="flex  mx-5 text-black sm:gap-5">
          {[...Array(9)].map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-[#E2E4E5] ${
                currentPage === index + 1 ? "bg-[#1F2937] text-white" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button>...</button>
        </div>
        <div className="flex items-center" onClick={nextPage}>
          <span>NEXT</span>
          <RxArrowRight />
        </div>
      </div>
    </div>
  );
}

export { Cards };
