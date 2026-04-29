# Desenvolvimento back-end: Módulo de Lotes e Entradas

## 1. Contexto do módulo
Implementação do gerenciamento de lotes de produtos, responsável por registrar novas entradas de estoque vinculadas a um lote específico, data de validade e fornecedor.

## 2. Requisitos técnicos
* **Framework:** .NET Core (C#).
* **Arquitetura:** Clean Architecture e princípios de Domain-Driven Design (DDD).
* **Banco/ORM:** SQL Server com Entity Framework Core.
* **Testes:** xUnit, Moq e FluentAssertions.

## 3. Contrato da API
* **POST** `/api/lotes`
  * **Payload:** `{ "produtoId": 1, "numeroLote": "A123", "quantidade": 50, "dataValidade": "2027-10-01", "fornecedorId": 2 }`
  * **Retorno Sucesso (201):** `{ "id": 10, "numeroLote": "A123", "status": "Ativo" }`
  * **Retorno Erro (400):** `{ "erro": "Data de validade não pode ser no passado." }`

## 4. O que deve ser gerado
* **Domain:** Entidade `Lote`, validações de regra de negócio e `ILoteRepository`.
* **Application:** `RegistrarEntradaUseCase`, DTOs e validações de input.
* **Infrastructure:** Implementação de `LoteRepository`, mapeamento de entidade (EF Core) e migrations.
* **WebAPI:** `LotesController` contendo o endpoint de criação e tratamento global de exceções.

## 5. Testes obrigatórios
* **Unitários:** Validação das regras de negócio na entidade `Lote` (ex: bloqueio de validade retroativa, quantidade zero).
* **Unitários:** Comportamento do `RegistrarEntradaUseCase` com mock do repositório.
* **Integração:** Chamada ao endpoint `/api/lotes` verificando a persistência em banco em memória.

## 6. Critérios de aceite
* Compilação sem erros ou warnings.
* Lotes com data de validade vencida devem ser rejeitados imediatamente.
* O saldo do produto correspondente deve refletir a nova entrada na mesma transação.
* Testes unitários rodando e passando.

## 7. Pedido para a IA
Gere o código completo para o módulo de Lotes seguindo o contrato acima e a estrutura Clean Architecture. Inclua as entidades de domínio, os casos de uso, a configuração do repositório no EF Core, o controller da API e a respectiva suíte de testes unitários.