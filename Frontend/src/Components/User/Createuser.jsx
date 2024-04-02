import React, { useState } from "react";
import axios from "axios";

function Createuser() {
  const [id, setid] = useState();
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [domain, setdomain] = useState("");
  const [available, setavailable] = useState(true);
  const [avatar, setavatar] = useState("");
  const [msg, setmsg] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("gender", gender);
      formData.append("domain", domain);
      formData.append("available", available);
      formData.append("avatar", avatar);

      const userResponse = await axios
        .post(`http://localhost:8000/api/users/createuser`, formData)
        .then((res) => res.data);

      console.log(userResponse);
      setmsg(userResponse.message);
    } catch (error) {
      console.log("Error While Creating New User in Frontend", error);
    }
  };

  console.log(
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available
  );

  if (msg.length > 0) {
    setTimeout(() => {
      setmsg("");
      setid(null);
      setfirst_name("");
      setlast_name("");
      setemail("");
      setavailable(true);
      setavatar("");
    }, 3000);
  }

  return (
    <div className="container mx-auto p-8 md:w-[700px]">
      {msg.length > 0 && (
        <div
          className="bg-blue-500 text-white px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{msg}</span>
        </div>
      )}
      <div className=" mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Create User</h1>
        <div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 mb-1">
              ID
            </label>
            <input
              type="number"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setid(e.target.value)}
              className="w-full border border-black  rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full border border-black rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="avatar" className="block text-gray-700 mb-1">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              //   value={avatar}
              onChange={(e) => setavatar(e.target.files[0])}
              className="w-full border border-black rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Gender</label>
            <div>
              <label htmlFor="male" className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={(e) => setgender(e.target.value)}
                  className="mr-2"
                />
                Male
              </label>
              <label htmlFor="female" className="inline-flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={(e) => setgender(e.target.value)}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="domain" className="block text-gray-700 mb-1">
              Domain
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={domain}
              onChange={(e) => setdomain(e.target.value)}
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Available</label>
            <select
              id="available"
              name="available"
              value={available}
              onChange={(e) => setavailable(e.target.value)}
              className="w-full border border-black rounded-md p-2"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Createuser };
