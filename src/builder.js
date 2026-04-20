import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

function Builder() {
  const previewRef = useRef();

  // -------- STATE --------
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("resume");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          education: [],
          skills: [],
        };
  });

  const [template, setTemplate] = useState("simple");

  useEffect(() => {
    localStorage.setItem("resume", JSON.stringify(resume));
  }, [resume]);

  // -------- PERSONAL --------
  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  // -------- EDUCATION --------
  const [eduInput, setEduInput] = useState({ school: "", degree: "" });

  const handleEduChange = (e) => {
    setEduInput({ ...eduInput, [e.target.name]: e.target.value });
  };

  const addEducation = () => {
    if (!eduInput.school || !eduInput.degree) return;

    setResume({
      ...resume,
      education: [...resume.education, eduInput],
    });

    setEduInput({ school: "", degree: "" });
  };

  const deleteEducation = (index) => {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  };

  // -------- SKILLS --------
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput) return;

    setResume({
      ...resume,
      skills: [...resume.skills, skillInput],
    });

    setSkillInput("");
  };

  const deleteSkill = (index) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    });
  };

  // -------- PDF --------
  const downloadPDF = () => {
    html2pdf().from(previewRef.current).save("resume.pdf");
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "40px" }}>
      
      {/* FORM */}
      <div style={{ width: "50%" }}>
        <h2>Resume Builder</h2>

        <h3>Template</h3>
        <button onClick={() => setTemplate("simple")}>Simple</button>
        <button onClick={() => setTemplate("modern")}>Modern</button>

        <h3>Personal Details</h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={resume.name}
          onChange={handleChange}
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={resume.email}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={resume.phone}
          onChange={handleChange}
        /><br /><br />

        {/* EDUCATION */}
        <h3>Education</h3>

        <input
          type="text"
          name="school"
          placeholder="School"
          value={eduInput.school}
          onChange={handleEduChange}
        /><br /><br />

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={eduInput.degree}
          onChange={handleEduChange}
        /><br /><br />

        <button onClick={addEducation}>Add Education</button>

        <hr />

        {/* SKILLS */}
        <h3>Skills</h3>

        <input
          type="text"
          placeholder="Skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        /><br /><br />

        <button onClick={addSkill}>Add Skill</button>

        <hr />

        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      {/* PREVIEW */}
      <div
        ref={previewRef}
        style={{
          width: "50%",
          padding: "20px",
          background: template === "modern" ? "#1e293b" : "#f5f5f5",
          color: template === "modern" ? "white" : "black",
        }}
      >
        <h2>{resume.name}</h2>
        <p>{resume.email}</p>
        <p>{resume.phone}</p>

        <h3>Education</h3>
        {resume.education.map((edu, i) => (
          <div key={i}>
            <p>{edu.school}</p>
            <p>{edu.degree}</p>
            <button onClick={() => deleteEducation(i)}>Delete</button>
          </div>
        ))}

        <h3>Skills</h3>
        {resume.skills.map((skill, i) => (
          <div key={i}>
            <span>{skill}</span>
            <button onClick={() => deleteSkill(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Builder;