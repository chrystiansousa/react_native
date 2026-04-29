# Visão geral do sistema: Gestão de Estoque Farmacêutico

## 1. Objetivo do projeto
Desenvolver um sistema para o gerenciamento automatizado de estoque de uma farmácia, garantindo o controle rigoroso de medicamentos e produtos correlatos.

## 2. Problema que o sistema resolve
Atualmente, o controle manual gera falhas na identificação de medicamentos vencidos, falta de produtos essenciais por ausência de alertas de reposição e dificuldade no rastreio de lotes de medicamentos controlados.

## 3. Atores envolvidos
* **Farmacêutico:** Responsável técnico, valida entrada de controlados e gera relatórios para órgãos reguladores.
* **Atendente/Vendedor:** Realiza consultas de disponibilidade e registra saídas de produtos.
* **Gerente de Compras:** Utiliza dados do sistema para planejar pedidos junto a fornecedores.

## 4. Escopo inicial
* Cadastro de produtos com distinção entre medicamentos (controlados ou não) e perfumaria.
* Controle de entradas por lote, fornecedor e data de validade.
* Registro de saídas (vendas ou descartes).
* Sistema de alertas para estoque baixo e produtos próximos ao vencimento.

## 5. Restrições técnicas
* **Linguagem/Framework:** C# com .NET Core.
* **Arquitetura:** Clean Architecture seguindo princípios de Domain-Driven Design (DDD).
* **Banco de Dados:** SQL Server via Entity Framework Core.
* **Interface:** Aplicação Web responsiva.

## 6. Premissas
* O sistema deve permitir a rastreabilidade completa por número de lote.
* A segurança deve impedir que usuários sem perfil de farmacêutico manipulem dados de medicamentos controlados.

## 7. Pedido para a IA
Atue como arquiteto de software. Analise este cenário e proponha a estrutura inicial do projeto seguindo a Clean Architecture. Detalhe as camadas (Domain, Application, Infrastructure, WebAPI), as entidades principais de domínio e as tecnologias de suporte necessárias para iniciar a implementação.