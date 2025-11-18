# 📊 Timefall Data Dashboard
Interface Funcional para Gerenciamento e Análise de Dados do Jogo Timefall: Battle Through Ages

## 📝 Sobre o Projeto

Esta aplicação foi desenvolvida para uso interno da nossa equipe da Forja, com o objetivo de avaliar, armazenar e analisar perguntas e dados coletados de pessoas que testaram o jogo Timefall: Battle Through Ages.

A interface funciona como um dashboard completo, permitindo visualizar estatísticas, manipular informações e analisar o balanceamento de elementos do jogo.

## 🚀 Funcionalidades Principais
### 📁 CRUD Completo

A aplicação permite criar, ler, atualizar e deletar registros das seguintes tabelas:

Pessoa

Defesas_de_Torres_Jogados

Inimigo

Fase

### ⚖️ Cálculo de Balanceamento

Função dedicada para calcular o quão balanceado um inimigo está, com base nos dados armazenados no banco.

### 📈 Gráficos Dinâmicos

Inclui 6 gráficos interativos, gerados dinamicamente a partir das tabelas do banco, oferecendo visualizações estatísticas importantes para a equipe.

## 🗂️ Tecnologias Utilizadas

As tecnologias principais envolvidas no projeto foram:

Java (backend)

Node.js

Banco de dados MySQL

## Passo a Passo para Rodar a Aplicação
1 - No seu script do MySQL workbench, execute o banco de dados

2- No projeto Projeto-BD, entre em src/main/java/util, e no ConnectionFactory.java, ponha sua senha do mysql workbench

3- Abra um terminal e entre na pasta do Projeto-BD. Nele, utilize cd BDProjeto para entrar na pasta do backend e mvn spring-boot:run para rodar o backend

4- Abra outro terminal e entre na pasta do Projeto-BD. Nele, utilize cd bdproj-frontend para entrar na pasta do frotend e npm start para rodar o frontend

5- Aguarde e a aplicação será aberta
