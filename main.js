//autocomplete  
function initPesquisa() {
  const produtos = ["Molinete", "Boia", "Chumbo", "Faca", "Linha", "Vara"];
  const barra = document.getElementById("barraPesquisa");

  const resultados = document.createElement("div");
  resultados.id = "resultadosPesquisa";
  barra.parentNode.appendChild(resultados);

  barra.addEventListener("input", () => {
    const valor = barra.value.toLowerCase();
    resultados.innerHTML = "";

    if (valor === "") {
      resultados.style.display = "none";
      return;
    }

    const filtrados = produtos.filter((p) =>
      p.toLowerCase().includes(valor)
    );

    filtrados.forEach((item) => {
      const div = document.createElement("div");
      const index = item.toLowerCase().indexOf(valor);
      if (index !== -1) {
        div.innerHTML =
          item.substring(0, index) +
          "<strong>" +
          item.substring(index, index + valor.length) +
          "</strong>" +
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

  document.addEventListener("click", (e) => {
    if (!barra.contains(e.target) && !resultados.contains(e.target)) {
      resultados.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      resultados.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPesquisa();
});


//login 
function initLogin() {
  const btnLogin = document.getElementById("btnLogin");
  const email = document.getElementById("email");
  const senha = document.getElementById("password");

  let alerta = document.getElementById("alerta");
  if (!alerta) {
    alerta = document.createElement("div");
    alerta.id = "alerta";
    alerta.style.color = "red";
    alerta.style.marginTop = "8px";
    alerta.style.display = "none";
    btnLogin.parentNode.insertBefore(alerta, btnLogin);
  }

  btnLogin.addEventListener("click", () => {
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (emailValue === "" || senhaValue === "") {
      alerta.innerText = "É necessário digitar usuário e senha para prosseguir";
      alerta.style.display = "block";
    } else if (!emailValido) {
      alerta.innerText = "Digite um endereço de email válido";
      alerta.style.display = "block";
    } else {
      alerta.style.display = "none";
      window.location.href = "/index.html";
    }
  });


  email.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnLogin.click();
  });
  senha.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnLogin.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLogin();
});



//cadastro

function initCadastro() {
  const btnCadastrar = document.getElementById("btnCadastrar");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const cpf = document.getElementById("cpf");
  const dataNascimento = document.getElementById("dataNascimento");
  const senha = document.getElementById("senha");
  const confirmSenha = document.getElementById("confirmSenha");

  let alerta = document.getElementById("alerta");
  if (!alerta) {
    alerta = document.createElement("div");
    alerta.id = "alerta";
    alerta.style.color = "red";
    alerta.style.marginTop = "8px";
    alerta.style.display = "none";
    btnCadastrar.parentNode.insertBefore(alerta, btnCadastrar.nextSibling);
  }

  btnCadastrar.addEventListener("click", () => {
    const nomeVal = nome.value.trim();
    const emailVal = email.value.trim();
    const cpfVal = cpf.value.trim();
    const dataVal = dataNascimento.value.trim();
    const senhaVal = senha.value.trim();
    const confirmVal = confirmSenha.value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

    if (!nomeVal || !emailVal || !cpfVal || !dataVal || !senhaVal || !confirmVal) {
      alerta.innerText = "Todos os campos devem ser preenchidos";
      alerta.style.display = "block";
    } else if (!emailValido) {
      alerta.innerText = "Digite um endereço de email válido";
      alerta.style.display = "block";
    } else if (senhaVal !== confirmVal) {
      alerta.innerText = "As senhas não coincidem";
      alerta.style.display = "block";
    } else {
      alerta.style.display = "none";
      window.location.href = "/index.html";
    }
  });

  [nome, email, cpf, dataNascimento, senha, confirmSenha].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btnCadastrar.click();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCadastro();
});


//carrinho
function initCarrinho() {
  const produtos = [
    { nome: "Linha", preco: 79.99 },
    { nome: "Boia", preco: 79.99 },
    { nome: "Molinetes", preco: 79.99 },
    { nome: "Vara", preco: 79.99 },
    { nome: "Faca", preco: 79.99 }
  ];

  const selects = document.querySelectorAll(".produtos-carrinho li select");
  const totalInput = document.getElementById("totalinput");

  let frete = 0;
  let desconto = 0;
  let freteGratis = false;
  const cuponsAplicados = {};

  function calcularSubtotal() {
    let subtotal = 0;
    selects.forEach((sel, i) => {
      const quantidade = parseInt(sel.value);
      subtotal += quantidade * produtos[i].preco;
    });
    return subtotal;
  }

  function atualizarTotal() {
    let subtotal = calcularSubtotal();
    let totalFinal = subtotal + (freteGratis ? 0 : frete) - desconto;
    totalInput.value = `R$ ${totalFinal.toFixed(2)}`;
  }

  selects.forEach(sel => sel.addEventListener("change", atualizarTotal));

  const cepInput = document.getElementById("cep");
  const btnFrete = document.getElementById("calcularFrete");
  const freteDisplay = document.getElementById("freteValor");

  btnFrete.addEventListener("click", () => {
    const cepsValidos = {
      "88790-000": 20,
      "88780-000": 15,
      "88785-000": 25
    };
    const cep = cepInput.value.trim();

    if (cep in cepsValidos) {
      frete = cepsValidos[cep];
      freteDisplay.textContent = `Frete: R$ ${frete.toFixed(2)}`;
    } else {
      frete = 0;
      freteDisplay.textContent = "CEP não aceito";
    }

    atualizarTotal();
  });

  const cupomInput = document.getElementById("cupom");
  const btnCupom = document.getElementById("aplicarCupom");
  const mensagemCupom = document.getElementById("mensagemCupom");

  btnCupom.addEventListener("click", () => {
    const cupom = cupomInput.value.trim().toUpperCase();

    if (cuponsAplicados[cupom]) {
      mensagemCupom.textContent = "Cupom já foi utilizado";
      return;
    }

    if (cupom === "DESCONTO10") {
      desconto += 10;
      cuponsAplicados[cupom] = true;
      mensagemCupom.textContent = "Cupom aplicado: R$10 de desconto";
    } else if (cupom === "FRETEGRATIS") {
      freteGratis = true;
      cuponsAplicados[cupom] = true;
      mensagemCupom.textContent = "Cupom aplicado: frete grátis";
    } else {
      mensagemCupom.textContent = "Cupom inválido";
      return;
    }

    atualizarTotal();
  });

  atualizarTotal();
}

document.addEventListener("DOMContentLoaded", () => {
  initCarrinho();
});





