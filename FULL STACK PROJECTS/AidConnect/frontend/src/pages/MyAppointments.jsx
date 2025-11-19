import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div className="text-zinc-600 ">
      <p className="border-b-2 border-gray-400 py-4 font-medium">My Appointments</p>
      <div>
        {doctors.slice(0, 3).map((item, idx) => (
          <div className="grid grid-cols-[1fr_2fr] text-sm gap-4 py-4 border-b-2 border-gray-300 sm:flex ">
            <div key={idx} className="sm:w-30 ">
              <img src={item?.image} alt={"doctors_img"} className="bg-gray-100 w-[100%] rounded" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-600">{item?.name}</p>
              <p className="font-medium">{item.speciality}</p>
              <p className="font-semibold mt-1">Address : </p>
              <p className="text-xs font-medium">{item.address.line1}</p>
              <p className="text-xs font-medium">{item.address.line2}</p>
              <p className="font-medium text-xs mt-1">
                <span className="font-semibold text-sm">Date & Time : </span>
                21 August 2025 | 10:00 AM     
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-2 ">
              <button className="rounded-sm cursor-pointer bg-blue-50 hover:bg-blue-500 hover:text-white p-2 border-1 items-center transition-all">Pay Online</button>
              <button className="rounded-sm cursor-pointer bg-red-50 hover:bg-red-500 hover:text-white p-2 border-1 transition-all">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
