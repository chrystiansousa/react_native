# Requisitos e regras de negócio

## 1. Requisitos funcionais
- RF01: Cadastrar produtos distinguindo entre medicamentos e perfumaria.
- RF02: Registrar entrada de estoque vinculada a número de lote, fornecedor e data de validade.
- RF03: Registrar saída de produtos por venda ou descarte (perda/vencimento).
- RF04: Consultar saldo de estoque total e por lote em tempo real.
- RF05: Emitir alertas visuais para produtos com estoque abaixo do mínimo definido.
- RF06: Emitir alertas para produtos com vencimento próximo (ex: 30, 60 e 90 dias).
- RF07: Gerar relatório de movimentação para medicamentos controlados.

## 2. Requisitos não funcionais
- RNF01: Desenvolvimento em .NET Core seguindo Clean Architecture.
- RNF02: Persistência de dados em SQL Server via Entity Framework Core.
- RNF03: Controle de acesso baseado em perfis (RBAC - Role-Based Access Control).
- RNF04: Registro de logs de auditoria para toda alteração em medicamentos controlados.
- RNF05: Interface web responsiva e intuitiva para operação rápida no balcão.

## 3. Regras de negócio
- RN01: Somente usuários com perfil "Farmacêutico" podem validar a entrada ou saída de medicamentos controlados.
- RN02: O sistema deve impedir a venda de produtos cuja data de validade esteja vencida.
- RN03: É obrigatório informar o número do lote em qualquer operação de entrada ou saída.
- RN04: O estoque mínimo de cada produto deve ser configurável individualmente.
- RN05: Saídas por descarte devem obrigatoriamente incluir uma justificativa (ex: quebra, vencimento, avaria).

## 4. Casos de uso prioritários
- UC01: Fluxo de entrada de mercadoria por lote.
- UC02: Consulta de disponibilidade e registro de venda (baixa).
- UC03: Painel de monitoramento de validades e níveis críticos.

## 5. Critérios de aceite
- O saldo do produto deve ser atualizado instantaneamente após a confirmação da transação.
- O sistema não deve permitir concluir uma venda se o lote selecionado estiver vencido.
- O alerta de estoque baixo deve ser acionado assim que a quantidade atingir o limite definido.

## 6. Pedido para a IA
Organize estes requisitos, identifique inconsistências (ex: conflitos entre perfis de acesso e agilidade de venda) e indique lacunas que precisam ser decididas antes do desenvolvimento, como a estratégia de remoção de lotes (PEPS - Primeiro que Entra, Primeiro que Sai).