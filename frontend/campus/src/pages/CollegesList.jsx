import colleges from "../data/colleges";

export default function CollegesList() {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Colleges List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {colleges.map((college, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 border border-gray-100 transition flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-blue-700">{college.name}</h3>
            <div className="text-sm text-gray-600">{college.location}</div>
            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium w-max">
              {college.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


