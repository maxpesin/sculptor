// src/components/ExerciseDialog.js
import React from "react";
// import "./ExerciseDialog.css";

const ExerciseDialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default ExerciseDialog;
