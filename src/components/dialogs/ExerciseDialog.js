// import React, { useState } from "react";
// import AddExerciseForm from "./AddExerciseForm"; // ✅ Import the form component

// const AddExerciseDialog = ({ updateData }) => {
//   const [showForm, setShowForm] = useState(false); // ✅ Controls visibility

//   const toggleForm = () => setShowForm(!showForm);
//   const closeForm = () => setShowForm(false); // ✅ Close on overlay click

//   return (
//     <>
//       {/* ✅ Button to open the dialog */}
//       <button className="add-exercise-button" onClick={toggleForm}>
//         + Exercise
//       </button>

//       {/* ✅ Dialog Overlay */}
//       {showForm && (
//         <div className="overlay" onClick={closeForm}>
//           <div className="dialog" onClick={(e) => e.stopPropagation()}> {/* Prevents closing when clicking inside */}
//             <button className="close-button" onClick={closeForm}>✖</button>
//             <AddExerciseForm updateData={updateData} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddExerciseDialog;
