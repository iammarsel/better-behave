import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Starter = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const jobPositions = [
    'Manager',
    'Sales',
    'Software Developer',
    'Data Scientist',
    'Designer',
    'Marketing'
  ];
  const codingRelatedJobs = ['Software Developer', 'Data Scientist'];
  const interviewTypes = ['Technical', 'Behavioural', 'Mix'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
        <option value="">Select a job position</option>
        {jobPositions.map((job) => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>

      {codingRelatedJobs.includes(selectedJob) && (
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Select interview type</option>
          {interviewTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      )}
        <button>
      <NavLink to="/question" className="w-28 h-8 mx-12 inline-block mt-24 text-white rounded-xl">
      Start
      </NavLink>
      </button>
    </div>
  );
};

export default Starter;
