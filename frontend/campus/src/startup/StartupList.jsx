import startups from "../data/startups";
import ViewJobs from "../jobs/ViewJobs";

export default function StartupList() {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Startups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {startups.map((startup, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 border border-gray-100 transition flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-blue-700">{startup.companyName}</h3>
            <div className="text-sm text-gray-600 mb-1">{startup.location} &middot; <span className="font-medium text-blue-600">{startup.industry}</span></div>
            <div className="text-xs text-gray-700 mb-2">{startup.bio}</div>
            <div className="mb-2">
              <span className="font-semibold text-xs">Skills Needed: </span>
              <span className="text-xs">{startup.skillsLookingFor.join(", ")}</span>
            </div>
            {startup.jobs && startup.jobs.length > 0 && (
              <div className="mt-2">
                <div className="font-semibold text-xs mb-1">Open Jobs:</div>
                <ul className="list-disc list-inside space-y-1">
                  {startup.jobs.map((job, jdx) => (
                    <li key={jdx} className="text-xs text-gray-800">
                      <span className="font-medium">{job.title}</span> - {job.location} <br />
                      <span className="italic">{job.description}</span> <br />
                      <span className="text-green-700">{job.stipend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <a href={startup.website} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-600 text-xs underline">Visit Website</a>
          </div>
        ))}
      </div>
    </div>
  );
}


