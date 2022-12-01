for (const [key, value] of plaintextAlphabetFrequencyAnalysis.entries()) {
  const tbl = document.getElementById("letterFrequencyGraph");
  const tblBody = document.getElementById("letterFrequencyGraphTbody");

  const row = document.createElement("tr");
  row.style.height = ((value*8).toString()+"%");

  const cell = document.createElement("td");
  cell.classList.add("row")
  cell.innerText =  key.toString();

  const cellText = document.createElement("span");
  cellText.innerText = value.toString();

  cell.appendChild(cellText);
  row.appendChild(cell);
  tblBody.appendChild(row);
}
