# Log de evolução do projeto: Gestão de Estoque Farmacêutico

## 1. Resumo da execução
* **[Data Atual]** Criação da visão geral, definição de requisitos, regras de negócio e modelagem de dados inicial.
* **[Data Atual]** Definição da stack tecnológica (C#, .NET Core, SQL Server) e arquitetura (Clean Architecture).

## 2. Status por módulo
* **Módulo Base (Arquitetura e DB):** Versão 0.1 - *Em andamento* (Aguardando aprovação do script SQL).
* **Módulo de Lotes e Entradas (Back-end):** Versão 0.0 - *Pendente* (Aguardando início do desenvolvimento).
* **Módulo de Consulta e Saída (Front-end):** Versão 0.0 - *Pendente* (Aguardando finalização do back-end).

## 3. Pendências
* Aprovar o script DDL do banco de dados gerado pela IA.
* Criar o arquivo `04_contratos_de_api.md` com o mapeamento completo dos endpoints, payloads e status HTTP antes de codificar o back-end.

## 4. Decisões técnicas
* Adoção de Clean Architecture com DDD para isolar regras críticas de negócio (ex: controle de lote e validade).
* Uso da Terceira Forma Normal (3FN) na modelagem para evitar redundâncias e garantir rastreabilidade da ANVISA.
* Deleções lógicas (soft delete) ou histórico preservado nas movimentações e logs de auditoria.

## 5. Erros encontrados e correções
* *Nenhum erro registrado até a presente etapa.*

## 6. Pedido para a IA
Mantenha este arquivo atualizado a cada entrega aprovada. Ao finalizar a geração do script de banco de dados ou a implementação de um módulo, adicione a versão correspondente, atualize o status para "Concluído", registre os resultados dos testes e liste quaisquer decisões tomadas durante a codificação.