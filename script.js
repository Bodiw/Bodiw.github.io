let selectedText = "";
let isMouseDown = false;

const numRowsInput = document.getElementById("numRows");
const numColsInput = document.getElementById("numCols");

// Añade el event listener a ambos campos
[numRowsInput, numColsInput].forEach((input) => {
  input.addEventListener("keyup", function (event) {
    // Verifica si la tecla presionada fue "Enter"
    if (event.key === "Enter" || event.keyCode === 13) {
      // Evita la acción por defecto del navegador
      event.preventDefault();
      // Llama a la función para crear la cuadrícula
      createGrid();
    }
  });
});

function createGrid() {
  let numRows = document.getElementById("numRows").value;
  let numCols = document.getElementById("numCols").value;
  const text = document.getElementById("textInput").value.replace(/\s+/g, "");
  const gridContainer = document.getElementById("gridContainer");
  const selectedTextOutput = document.getElementById("selectedTextOutput");

  // Establecer la variable CSS para el número de columnas

  if (!(numRows == 0 && numCols == 0)) {
    if (numRows == 0) {
      numRows = Math.ceil(text.length / numCols);
      document.getElementById("numRows").placeholder = numRows;
    } else if (numCols == 0) {
      numCols = Math.ceil(text.length / numRows);
      document.getElementById("numCols").placeholder = numCols;
    }
  }
  gridContainer.style.setProperty("--num-cols", numCols);
  /* gridContainer.style.width = `${numCols * 35}px`;
  gridContainer.style.height = `${numRows * 35}px`; */

  gridContainer.innerHTML = "";
  selectedTextOutput.innerHTML = "";

  let counter = 0; // Contador para recorrer el texto
  let numButtons = Math.min(text.length, numRows * numCols); // Número de botones a crear

  for (let i = 0; i < numButtons; i++) {
    const button = document.createElement("button");
    button.innerHTML = text[counter] || "";
    button.className = "grid-button";

    /*     button.style.width = `${100 / numCols}%`;
    button.style.height = `${100 / numRows}%`; */

    button.addEventListener("click", function (event) {
      console.log("click");
      if (isMouseDown) {
        console.log("mouseup");
        isMouseDown = false;
        event.target.style.backgroundColor = ""; // Restaurar el color de fondo
      } else {
        console.log("mousedown");
        isMouseDown = true;
        selectedText = ""; // Reiniciar el texto seleccionado
        selectedText += event.target.innerHTML; // Añadir la primera letra
        event.target.style.backgroundColor = "lightgreen"; // Iluminar en verde claro
        selectedTextOutput.innerHTML = selectedText; // Actualizar el texto seleccionado mostrado
      }
    });

    button.addEventListener("mouseover", function (event) {
      if (isMouseDown) {
        selectedText += event.target.innerHTML;
        event.target.style.backgroundColor = "lightgreen"; // Iluminar en verde claro
        selectedTextOutput.innerHTML = selectedText; // Actualizar el texto seleccionado mostrado
      }
    });

    button.addEventListener("mouseout", function (event) {
      if (isMouseDown) {
        event.target.style.backgroundColor = ""; // Restaurar el color de fondo
      }
    });

    gridContainer.appendChild(button);
    counter++; // Incrementar el contador
  }
}
