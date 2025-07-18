import { useParams } from 'react-router-dom';
import JobApplication from './JobApplication';

export default function JobDetail() {
  const { jobId } = useParams(); // from /jobs/:jobId route

  return (
    <div>
      <h1>Job Details</h1>
      {/* You can fetch and show job info here too */}
      <JobApplication jobId={jobId} />
    </div>
  );
}
