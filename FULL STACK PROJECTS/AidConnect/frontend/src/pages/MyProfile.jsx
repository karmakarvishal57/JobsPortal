import { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: "Vishal Karmakar",
    image: assets.profile_pic,
    email: "karmakarvishal57@gmail.com",
    phone: "+91 7428107443",
    address: {
      line1: "Gali Number 65,Building Number 4151",
      line2: "Reghar Pura ,Karol Bagh ,New Delhi : 110005",
    },
    gender: "Male",
    dob: "01-02-2002",
  });

  return (
    <div className="max-w-[360px]">
      <div className="mt-4 max-w-[50%]">
        <img src={userData.image} />
      </div>
      <div className="my-1 ">
        {isEdit ? (
          <input
            className="border-2 rounded-md"
            value={userData?.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        ) : (
          <p className="text-gray-700 text-2xl font-medium">{userData?.name}</p>
        )}
      </div>
      <hr className="my-2 border-none h-[1px] bg-gray-400" />
      <div>
        <p className="text-lg text-gray-400 font-medium">Contact Info</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-gray-400 mt-2">
          <p className="font-medium"> Email : </p>
          {isEdit ? (
            <input
              className="border-2 rounded-md"
              type="email"
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          ) : (
            <p className="text-blue-300">{userData?.email}</p>
          )}

          <p className="font-medium"> Phone :</p>
          {isEdit ? (
            <input
              className="border-2 rounded-md"
              value={userData?.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          ) : (
            <p className="text-blue-300">{userData?.phone}</p>
          )}
          <p className="font-medium"> Address:</p>

          {isEdit ? (
            <div>
              <input
                className="border-2 w-full block rounded-md"
                value={userData?.address?.line1}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...address, line1: e.target.value },
                  })
                }
              />
              <input
                className="border-2 w-full rounded-md"
                value={userData?.address?.line2}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, line2: e.target.value },
                  })
                }
              />
            </div>
          ) : (
            <p>
              {userData?.address?.line1}
              <br />
              {userData?.address?.line2}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 text-gray-400">
        <p className="text-lg font-medium">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2">
          <p className="font-medium">Gender :</p>
          <select
            name="Gender"
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            value={userData?.gender}
            className="w-20 "
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="font-medium">Dob :</p>
          {isEdit ? (
            <input
              type="date"
              className="border-2 w-30 rounded-md"
              value={userData?.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
            />
          ) : (
            <p>{userData?.dob}</p>
          )}
        </div>
      </div>
      <div className="gap-3 flex mt-4">
        <button
          className="px-6 py-2 bg-zinc-100 rounded-full text-neutral-800 cursor-pointer"
          onClick={() => setIsEdit(true)}
        >
          Edit Info
        </button>
        <button
          className="px-6 py-2 bg-zinc-100 rounded-full text-neutral-800 cursor-pointer"
          onClick={() => setIsEdit(false)}
        >
          Save Info
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
