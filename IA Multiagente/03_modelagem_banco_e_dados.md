# Modelagem de banco de dados

## 1. Objetivo da modelagem
Estruturar os dados para suportar o rastreio rigoroso de lotes, validades e movimentações, garantindo integridade referencial para auditoria de medicamentos controlados.

## 2. Entidades principais
* **Produtos:** Armazena informações gerais (Nome, Tipo [Medicamento/Perfumaria], Estoque Mínimo).
* **Lotes:** Registra unidades específicas de um produto (Número do Lote, Data de Validade, Quantidade Atual, Fornecedor).
* **Movimentacoes:** Histórico de Entradas, Saídas e Descartes.
* **Usuarios:** Dados de acesso e perfis (Farmacêutico, Atendente, Gerente).
* **LogsAuditoria:** Registro detalhado de alterações em dados sensíveis ou medicamentos controlados.

## 3. Relacionamentos
* **Produtos (1:N) Lotes:** Um produto pode ter vários lotes ativos com diferentes validades.
* **Lotes (1:N) Movimentacoes:** Cada transação de estoque deve estar vinculada a um lote específico.
* **Usuarios (1:N) Movimentacoes:** Identifica quem realizou cada operação de estoque.
* **Usuarios (1:N) LogsAuditoria:** Rastreia as ações administrativas e de segurança.

## 4. Normalização
Será aplicada a **Terceira Forma Normal (3FN)** para eliminar redundâncias e garantir que cada atributo dependa exclusivamente da chave primária, essencial para a precisão do inventário e relatórios regulatórios.

## 5. Padrões obrigatórios
* **Chaves Primárias (PK):** `BIGINT IDENTITY(1,1)` para performance em índices.
* **Nomeação:** PascalCase para tabelas e colunas.
* **Índices:** Índices não-clusterizados em `Lotes.DataValidade` e `Lotes.ProdutoId` para otimizar alertas e consultas de saldo.
* **Restrições:** `NOT NULL` em campos críticos e `CHECK constraints` para impedir quantidades negativas em lotes.

## 6. Script inicial
Solicito a geração do script DDL para SQL Server, contemplando as tabelas acima, chaves estrangeiras com `ON DELETE NO ACTION` para preservar o histórico, e índices de cobertura para as consultas de estoque crítico.

## 7. Pedido para a IA
Analise a modelagem e indique se a separação entre `Produtos` e `Lotes` é suficiente para atender às exigências de rastreabilidade da ANVISA e sugira melhorias na estrutura de `LogsAuditoria` para facilitar perícias técnicas.