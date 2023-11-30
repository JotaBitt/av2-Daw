<?php
    $servidor = "localhost";
    $username = "root";
    $senha = "";
    $database = "jotadb";

    $conn = new mysqli($servidor,$username,$senha,$database);
    
    if ($conn->connect_error) {
       die("Conexao falhou, avise o administrador do sistema");
    }

    $comandoSQL = "SELECT * from `fiscal de sala`";
    $resultado = $conn->query($comandoSQL);

    $perguntas[] = array();
    
    $i = 0;
    While ($linha = $resultado->fetch_assoc()){
        $perguntas[$i] = $linha;
        $i++;
    }

    if ($resultado=true){
        $retorno=json_encode($perguntas);
    } else {
        $retorno=json_encode("Acabou o sonho!");
    }

    echo $retorno;
?>