function ListarCandidatos(){

    let xmlhttp = new XMLHttpRequest();
    console.log("1");

    xmlhttp.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){

        console.log("Chegou OK: " + this.responseText);
        console.log("2");
        let objReturnJSON = JSON.parse(this.responseText);

        // tornando o cabeçalho visível
        document.getElementById("tab").style.display="block";
        CriarCabecalhoCand();

        for (let i = 0; i < objReturnJSON.length; i++) {
            let linha = objReturnJSON[i];
            CriarLinhaTabelaCand(linha);
        }
    } 
    else if(this.readyState < 4){

        console.log("3: " + this.readyState);
    } 
    else{

        console.log("Requisicao falhou: " + this.status);
    }
    }

    console.log("4");
    xmlhttp.open("GET", "http://localhost/3DAW/av2/listarCandidato.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();

    console.log("enviei request get");
    console.log("5");
}

//Cria cabeçalho da tabela
function CriarCabecalhoCand(){

    let table = document.getElementById("tab");

    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.textContent = "Nome";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.textContent = "CPF";
    tr.appendChild(th2);

    let th3 = document.createElement("th");
    th3.textContent = "Identidade";
    tr.appendChild(th3);

    let th4 = document.createElement("th");
    th4.textContent = "E-mail";
    tr.appendChild(th4);

    let th5 = document.createElement("th");
    th5.textContent = "Cargo";
    tr.appendChild(th5);

    let th6 = document.createElement("th");
    th6.textContent = "Sala de prova";
    tr.appendChild(th6);

    let th7 = document.createElement("th");
    th7.textContent = "Ação";
    tr.appendChild(th7);

    table.appendChild(tr);
}

//Cria linha na tabela
function CriarLinhaTabelaCand(pobjReturnJSON){

    let table = document.getElementById("tab");

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = pobjReturnJSON.nome;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.textContent = pobjReturnJSON.cpf;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.textContent = pobjReturnJSON.identidade;
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.textContent = pobjReturnJSON.email;
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.textContent = pobjReturnJSON.cargo;
    tr.appendChild(td5);

    let td6 = document.createElement("td");
    td6.textContent = pobjReturnJSON.sala;
    tr.appendChild(td6);


    let td7 = document.createElement("td");
    let btnAlterar = document.createElement("button");
    btnAlterar.textContent = "Alterar";

    //Evento Alterar
    btnAlterar.addEventListener("click", function(){
    ExibeFormCandidato(pobjReturnJSON.nome, pobjReturnJSON.cpf, pobjReturnJSON.identidade,
    pobjReturnJSON.email, pobjReturnJSON.cargo, pobjReturnJSON.sala);

    document.getElementById("tab").style.display = "none";
    });
    td7.appendChild(btnAlterar);

    tr.appendChild(td7);

    // Adicionando a nova linha antes da última linha existente
    table.appendChild(tr);
}

//Delata tabela
function DeletarTabela(){

    let table = document.getElementById("tab");

    table.innerHTML = ""; // Limpa o conteúdo da tabela
}

//Apaga formulario inserir candidato
function DeletarFormCandidato(){

    document.getElementById("nome_I").value = "";
    document.getElementById("cpf_I").value = "";
    document.getElementById("identidade_I").value = "";
    document.getElementById("email_I").value = "";
    document.getElementById("cargo_I").value = "";
    document.getElementById("sala_I").value = "";
}

//Exibe formulario de alteração do candidato
function ExibeFormCandidato(nome, cpf, identidade, email, cargo, sala){

    document.getElementById('alterar').style.display = "block";

    document.getElementById("nome_A").value = nome;
    document.getElementById("cpf_A").value = cpf;
    document.getElementById("identidade_A").value = identidade;
    document.getElementById("email_A").value = email;
    document.getElementById("cargo_A").value = cargo;
    document.getElementById("sala_A").value = sala;
}

function InserirCandidato(){

    let form = document.getElementById("inserir");
    console.log("Form: " + form.innerHTML);

    let nome = document.getElementById("nome_I").value;
    let cpf = document.getElementById("cpf_I").value;
    let identidade = document.getElementById("identidade_I").value;
    let email = document.getElementById("email_I").value;
    let cargo = document.getElementById("cargo_I").value;
    let sala = document.getElementById("sala_I").value;
    console.log(" nome: " + nome + " cpf: " + cpf + " identidade: " + identidade + " email: " + email 
    + " cargo: " + cargo + " sala: " + sala);

    let form2 = {"nome":nome,"cpf":cpf,"identidade":identidade,"email":email,"cargo":cargo,"sala":sala};
    let objJson = JSON.stringify(form2);
    console.log("objForm2: " + form2);
    console.log("JSON: " + objJson);

    //codigo copiado
    let xmlhttp = new XMLHttpRequest();
    console.log("1");

    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            console.log("Chegou OK: " + this.responseText);
            console.log("2");
        }
        else if (this.readyState < 4){

            console.log("3: " + this.readyState);
        } 
        else{

            console.log("Requisicao falhou: " + this.status);
        }
            
    }
    console.log("4");

    xmlhttp.open("POST", "http://localhost/3DAW/av2/adicionarCandidato.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("nome=" + nome + "&cpf=" + cpf + "&identidade=" + identidade + "&email=" + email + "&cargo=" + cargo + "&sala=" + sala);

    console.log("enviei form");
    console.log("5");
}

//altera sala do candidato
function AlterarSala(){

    document.getElementById("alterar").style.display = "none";

    let cpf = document.getElementById("cpf_A").value;
    let sala = document.getElementById("sala_A").value;

    let xmlhttp = new XMLHttpRequest();
    console.log("1");

    xmlhttp.onreadystatechange = function (){
    
    if(this.readyState == 4 && this.status == 200){

        console.log("Chegou a resposta OK: " + this.responseText);
        console.log("2");
    } 
    else if(this.readyState < 4){

        console.log("3: " + this.readyState);
    } 
    else{

        console.log("Requisicao falhou: " + this.status);
    }
    };

    console.log("4");

    xmlhttp.open("POST", "http://localhost/3DAW/av2/alterarSala.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("cpf=" + cpf + "&sala=" + sala);

    console.log("enviei form");
    console.log("5");
}

function ListarFiscais(){

    let xmlhttp = new XMLHttpRequest();
    console.log("1");

    xmlhttp.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){

        console.log("Chegou a resposta OK: " + this.responseText);
        console.log("2");
        let objReturnJSON = JSON.parse(this.responseText);

        // tornando o cabeçalho visível
        document.getElementById("tab").style.display="block";
        CriarCabecalhoFiscal();

        for (let i = 0; i < objReturnJSON.length; i++) {
        let linha = objReturnJSON[i];
        CriarLinhaTabelaFiscal(linha);
        }
    } 
    else if(this.readyState < 4){

        console.log("3: " + this.readyState);
    } 
    else{

        console.log("Requisicao falhou: " + this.status);
    }
    }

    console.log("4");
    xmlhttp.open("GET", "http://localhost/3DAW/av2/listarFiscal.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();

    console.log("enviei request get");
    console.log("5");
}

//Cria cabeçalho da tabela
function CriarCabecalhoFiscal(){

    let table = document.getElementById("tab");

    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.textContent = "Nome";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.textContent = "CPF";
    tr.appendChild(th2);

    let th3 = document.createElement("th");
    th3.textContent = "Sala de prova";
    tr.appendChild(th3);

    table.appendChild(tr);
}

//Cria linha na tabela
function CriarLinhaTabelaFiscal(pobjReturnJSON){

    let table = document.getElementById("tab");

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = pobjReturnJSON.nome;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.textContent = pobjReturnJSON.cpf;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.textContent = pobjReturnJSON.sala;
    tr.appendChild(td3);

    tr.appendChild(td3);

    // Adicionando a nova linha antes da última linha existente
    table.appendChild(tr);
}

//Apaga formulario fiscal
function DeletarFormFiscal(){

    document.getElementById("nome_fisc").value = "";
    document.getElementById("cpf_fisc").value = "";
    document.getElementById("sala_fisc").value = "";
}


function InserirFiscal(){

    let form = document.getElementById("fiscal");
    console.log("Form: " + form.innerHTML);

    let nome = document.getElementById("nome_fisc").value;
    let cpf = document.getElementById("cpf_fisc").value;
    let sala = document.getElementById("sala_fisc").value;
    console.log(" nome: " + nome + " cpf: " + cpf + " sala: " + sala);

    let form2 = {"nome":nome,"cpf":cpf,"sala":sala};
    let objJson = JSON.stringify(form2);
    console.log("objForm2: " + form2);
    console.log("JSON: " + objJson);

    //codigo copiado
    let xmlhttp = new XMLHttpRequest();
    console.log("1");

    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            console.log("Chegou a resposta OK: " + this.responseText);
            console.log("2");
        }
        else if (this.readyState < 4){

            console.log("3: " + this.readyState);
        } 
        else{

            console.log("Requisicao falhou: " + this.status);
        }
            
    }
    console.log("4");

    xmlhttp.open("POST", "http://localhost/3DAW/av2/incluirFiscal.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("nome=" + nome + "&cpf=" + cpf + "&sala=" + sala);

    console.log("enviei form");
    console.log("5");
}
