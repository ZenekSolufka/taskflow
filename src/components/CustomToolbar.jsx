import { Navigate } from "react-big-calendar";

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => onNavigate(Navigate.PREVIOUS)}
        className="bg-[#00ADB5] text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <span className="text-lg text-white font-semibold">{label}</span>
      <button
        onClick={() => onNavigate(Navigate.NEXT)}
        className="bg-[#00ADB5] text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default CustomToolbar;
