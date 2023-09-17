import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import JobContext from'./JobContext';


const Starter = () => {
  const { selectedJob, setSelectedJob, selectedType, setSelectedType } = useContext(JobContext);
  const [jobPositions, setJobPositions] = useState([]);
  const [newJobPosition, setNewJobPosition] = useState("");
  const codingRelatedJobs = [
    "Software Developer",
    "iOS Developer",
    "Android Developer",
    "Front-end Developer",
    "Back-end Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "Web Developer",
    "Embedded Systems Developer",
    "Game Developer",
    "DevOps Engineer",
    "Database Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Systems Programmer",
    "Firmware Engineer",
    "Cloud Engineer",
    "Application Developer",
    "UI/UX Developer",
    "E-commerce Developer",
    "Security Software Developer",
    "Graphics Programmer",
    "AR/VR Developer",
    "API Developer",
    "Test Engineer",
    "Algorithm Developer",
    "High-Performance Computing Engineer",
    "Computational Biologist",
    "Robotics Programmer",
    "Blockchain Developer",
  ];
  const interviewTypes = ["Technical", "Behavioural", "Mix"];

  

  useEffect(() => {
    fetch("/jobPositions.txt")
      .then((response) => response.text())
      .then((data) => {
        const positions = data.split("\n").filter(Boolean);
        setJobPositions(positions);
      });
  }, []);

  const handleAddJobPosition = () => {
    // Convert the new job position to lowercase
    const lowerCaseNewJobPosition = newJobPosition.toLowerCase();

    // Check if the lowercase version of the new job position already exists in the list
    const jobExists = jobPositions.some(
      (job) => job.toLowerCase() === lowerCaseNewJobPosition
    );

    if (!jobExists) {
      const formattedJobPosition = capitalizeFirstLetter(newJobPosition);
      setJobPositions([...jobPositions, formattedJobPosition]);
      setSelectedJob(formattedJobPosition); // Set the newly added job as the selected job
      setNewJobPosition("");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => {
        // If the word has any capital letters, return it as-is
        if (/[A-Z]/.test(word)) {
          return word;
        }
        // Otherwise, capitalize the first letter
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <select
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)}
      >
        <option value="">Select a job position</option>
        {jobPositions.map((job) => (
          <option key={job} value={job}>
            {capitalizeFirstLetter(job)}
          </option>
        ))}
        <option value="different">Different job...</option>
      </select>

      {selectedJob === "different" && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={newJobPosition}
            onChange={(e) => setNewJobPosition(e.target.value)}
            placeholder="Specify your job position"
          />
          <button onClick={handleAddJobPosition}>Add</button>
        </div>
      )}

      {codingRelatedJobs.some(
        (job) => job.toLowerCase() === selectedJob.toLowerCase()
      ) && (
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
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
      </NavLink></button>
    </div>
  );
};

export default Starter;
