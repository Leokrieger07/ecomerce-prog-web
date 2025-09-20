
const produtos = [
  "Molinete",
  "Boia",
  "Chumbo",
  "Faca",
  "Linha",
  "Vara"
];

const barra = document.getElementById("barraPesquisa");
const resultados = document.createElement("div");
resultados.id = "resultadosPesquisa";

barra.parentNode.appendChild(resultados);

barra.addEventListener("input", () => {
    const valor = barra.value.toLowerCase();
    resultados.innerHTML = "";

    barra.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const valor = barra.value.toLowerCase();
        let url = "";

        if (valor === "molinete") url = "/produtos/produto1.html";
        else if (valor === "boia") url = "/produtos/produto3.html";
        else if (valor === "chumbo") url = "/produtos/produto2.html";
        else if (valor === "faca") url = "/produtos/produto5.html";
        else if (valor === "linha") url = "/produtos/produto6.html";
        else if (valor === "vara") url = "/produtos/produto4.html";

        if (url) window.location.href = url;
    }
});


    if (valor === "") {
        resultados.style.display = "none";
        return;
    }

    const filtrados = produtos.filter(p => p.toLowerCase().includes(valor));

    filtrados.forEach(item => {
        const div = document.createElement("div");
        const index = item.toLowerCase().indexOf(valor);
if (index !== -1) {
    div.innerHTML = item.substring(0, index) + 
                    "<strong>" + item.substring(index, index + valor.length) + "</strong>" + 
                    item.substring(index + valor.length);
}

        div.addEventListener("click", () => {
            barra.value = item;
            resultados.style.display = "none";
        });
        resultados.appendChild(div);
    });

    resultados.style.display = filtrados.length ? "block" : "none";
});

document.addEventListener("click", e => {
    if (!barra.contains(e.target) && !resultados.contains(e.target)) {
        resultados.style.display = "none";
    }
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        resultados.style.display = "none";
    }
});
