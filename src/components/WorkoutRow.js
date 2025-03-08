import React, { useState, useEffect } from "react";

const WorkoutRow = ({ muscle, target, data, updateData}) => {
// console.log("🚀 ~ WorkoutRow ~ muscle:", muscle)

  const [history, setHistory] = useState([]);

  // if (!data || !data.exercises) {
  //   console.error("❌ No exercise data found:", data);
  //   return null; // Prevents the component from rendering if data is missing
  // }

  const exercise = data.exercises.find(
    (ex) =>
      ex.mainMuscle === muscle.mainMuscle &&
      target === ex.targetMuscle &&
      ex.order === 1
  );

  useEffect(() => {
    if (exercise) {
      const workoutHistory = data.history.filter(
        (entry) => entry.exerciseId === exercise.id

      );
      setHistory(workoutHistory);
    }
  }, [data.history, exercise]); // ✅ Dependency array ensures it only runs when data.history or exercise changes

  // console.log("🚀 ~ useEffect ~ exercise:", exercise)
  // console.log("🚀 ~ WorkoutRow ~ history:", history)
  // console.log("🚀 Found exercise:", exercise);

  return (
    <div className="sculptor__excercise-row">
      <span className="workout-form__workout-muscle workout-form__workout-muscle--red">
        {muscle.mainMuscle}
      </span>
      <span className="workout-form__excercise-target">{target}</span>
      <span className="workout-form__excercise-name">
        {exercise ? exercise.name : "-"}
      </span>
      {/* {history
        .filter(last => last.exerciseId === exercise.id)
        .map((last, index) => {
          console.log("🚀 ~ WorkoutRow ~ last:", last); // ✅ Works correctly
          return (
            <input key={index} type="text" className="workout-form__input TEST" placeholder={last.set1} />
          );
        })} */}

      {/* {history.length > 0 ? (
        history.map((last, index) => {
          console.log("🚀 ~ WorkoutRow ~ Matching History Entry:", last);

          return (
            <div key={index} class="workout-form__input-container">
              {Object.keys(last)
                .filter((key) => key.startsWith("set")) // ✅ Dynamically select all set keys
                .map((setKey, setIndex) => (
                  <input
                    key={setIndex}
                    type="text"
                    className="workout-form__input TEST"
                    placeholder={last[setKey] || "-"}
                  />
                ))}
            </div>
          );
        })
      ) : (
        <input
          type="text"
          className="workout-form__input"
          placeholder="-"
        />
      )} */}


          {/* ✅ Always render 4 inputs (either with history or empty placeholders) */}
          {Array.from({ length: 4 }).map((_, index) => {
        const lastEntry = history.length > 0 ? history[history.length - 1] : null;
        const setKey = `set${index + 1}`;
        const value = lastEntry ? lastEntry[setKey] || "-" : "-"; // ✅ Use history if available, otherwise show `"-"`

        return (
          <input
            key={index}
            type="text"
            className="workout-form__input TEST"
            placeholder={value}
          />
        );
      })}

      {/* <input type="text" className="workout-form__input" placeholder="-" />
      <input type="text" className="workout-form__input" placeholder="Set 2" />
      <input type="text" className="workout-form__input" placeholder="Set 3" />
      <input type="text" className="workout-form__input" placeholder="Set 4" /> */}

    </div>
  );
};

export default WorkoutRow;
