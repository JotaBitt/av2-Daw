<?php
    $cpf = $_POST["cpf"];
    $sala = $_POST["sala"];

    $servidor = "localhost";
    $username = "root";
    $senha = "";
    $database = "jotadb";
    $conn = new mysqli($servidor,$username,$senha,$database);

    if($conn->connect_error){

       die("Conexao falhou, avise o administrador do sistema");
    }

    $comandoSQL = "UPDATE `candidatos` SET sala = $sala WHERE cpf=$cpf";
    $resultado = $conn->query($comandoSQL);

    $retorno=json_encode($resultado);
    echo $retorno;
?>