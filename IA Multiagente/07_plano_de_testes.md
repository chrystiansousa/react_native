# Plano de testes

## 1. Objetivo
Garantir a confiabilidade, precisão e segurança do sistema de controle de estoque farmacêutico, validando desde as regras de domínio até a interface do usuário.

## 2. Testes de arquitetura
* Verificar a aderência à Clean Architecture, garantindo que a camada de Domínio não dependa de Infraestrutura ou WebAPI.
* Validar injeção de dependências e configuração correta do Entity Framework Core.
* Garantir que as tabelas de `LogsAuditoria` não possuam rotas de exclusão (delete).

## 3. Testes de back-end
* **Unitários:** Validar regras de negócio na criação de Lotes (impedir validades retroativas) e movimentações (impedir saldo negativo). Frameworks: xUnit e Moq.
* **Integração:** Testar persistência em banco de dados em memória e funcionamento dos endpoints via Swagger/Postman.
* **Manuais:** Simular concorrência (duas baixas simultâneas no mesmo lote) para verificar a consistência do saldo.

## 4. Testes de front-end
* **Interface e Visualização:** Renderização correta da lista de produtos e destaque visual (alertas vermelhos) para lotes com vencimento inferior a 30 dias.
* **Integração com API:** Tratamento adequado dos retornos de sucesso (200/201) e erro (400/500).
* **Cenários de erro:** Bloqueio imediato do botão de venda ao informar quantidade superior ao saldo ou selecionar lote vencido.

## 5. Critérios de aprovação
* Cobertura de testes unitários mínima de 80% nas camadas de Domain e Application.
* Passagem com sucesso em todos os testes de integração dos fluxos principais (Entrada e Saída).
* Nenhuma falha crítica impeditiva durante a validação manual do usuário final (Farmacêutico/Atendente).

## 6. Evidências
* Relatórios de cobertura de código do xUnit.
* Logs de execução de sucesso nas pipelines de CI/CD.
* Prints de tela (Postman e Front-end) anexados ao log de evolução do projeto para aprovação de cada módulo.

## 7. Pedido para a IA
Organize a execução destes testes por ordem de criticidade, priorizando a validação das regras de negócio de medicamentos controlados e o bloqueio de venda de produtos vencidos, indicando exatamente o que compilar e testar a cada módulo gerado.