function cleanString(string) {
  return string.replace(/[^0-9]/g, "");
}

let button = document.querySelector(".cep-button");
const response = document.querySelector(".formresponse-text");
let clean = document.querySelector(".clean");

button.addEventListener("click", async () => {
  response.value = "";
  const textNotClean = document.querySelector(".textarea").value;
  let text = cleanString(textNotClean);
  try {
    const dados = await fetch(`https://viacep.com.br/ws/${text}/json`);
    const json = await dados.json();
    document.querySelector(".textarea").value = "";
    response.style.display = "block";
    response.value = `
CEP: ${json.cep}
BAIRRO:${json.bairro}
RUA: ${json.logradouro}
  `.trim();
  } catch (error) {
    response.style.display = "none";
    clean.style.display = "none";

    alert("Erro ao buscar o CEP");
  }
});

clean.addEventListener("click", () => {
  response.style.display = "none";
  clean.style.display = "none";
});
