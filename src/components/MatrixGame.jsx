import React, { useState } from "react";

const MatrixGame = () => {
  const [gridSize, setGridSize] = useState(3);
  const [matrix, setMatrix] = useState(generateMatrix(3));
  const [score, setScore] = useState(0);
  const [steps, setSteps] = useState(0);

  function generateMatrix(size) {
    return Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({
            clicked: false,
            result: null,
          }))
      );
  }

  const handleClick = (row, col) => {
    if (matrix[row][col].clicked) return;

    const isEven = (row + col) % 2 === 0;
    const newMatrix = matrix.map((r, rIndex) =>
      r.map((cell, cIndex) => {
        if (rIndex === row && cIndex === col) {
          return {
            clicked: true,
            result: isEven ? "Ok" : "X",
          };
        }
        return cell;
      })
    );
    setMatrix(newMatrix);
    setSteps(steps + 1);
    setScore(score + (isEven ? 1 : -1));
  };

  const randomizeGrid = () => {
    const newSize = Math.floor(Math.random() * 4) + 3; // 3 to 6
    setGridSize(newSize);
    setMatrix(generateMatrix(newSize));
    setScore(0);
    setSteps(0);
  };

  const resetGame = () => {
    setGridSize(3);
    setMatrix(generateMatrix(3));
    setScore(0);
    setSteps(0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Matrix Game</h2>

        <div style={{ marginBottom: "10px" }}>
          <button onClick={randomizeGrid}>🎲 Randomize Grid (3-6)</button>
          <button onClick={resetGame} style={{ marginLeft: "10px" }}>
            🔄 Reset
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 60px)`,
            gap: "10px",
          }}
        >
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "18px",
                  backgroundColor: cell.clicked ? "#ddd" : "#fff",
                  cursor: cell.clicked ? "not-allowed" : "pointer",
                }}
                disabled={cell.clicked}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell.result || `${rowIndex},${colIndex}`}
              </button>
            ))
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <p>🧮 Score: {score}</p>
          <p>👣 Steps: {steps}</p>
        </div>
      </div>
    </div>
  );
};

export default MatrixGame;
