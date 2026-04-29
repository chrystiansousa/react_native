# Desenvolvimento front-end: Módulo de Consulta e Saída (Balcão)

## 1. Contexto do módulo
Tela desenvolvida para a operação de balcão (Atendente/Vendedor), focada na busca rápida de medicamentos/perfumaria, visualização dos lotes disponíveis e registro ágil de saídas (vendas).

## 2. Contrato consumido
* **GET** `/api/produtos?busca={termo}`: Retorna produtos e saldo total.
* **GET** `/api/lotes?produtoId={id}`: Retorna lotes ativos, validades e quantidades disponíveis.
* **POST** `/api/movimentacoes/saida`
  * **Payload:** `{ "produtoId": 1, "loteId": 10, "quantidade": 2, "tipo": "Venda" }`
  * **Retorno (200):** Sucesso na baixa do estoque.
  * **Retorno (400):** Erro de saldo insuficiente ou lote vencido.

## 3. O que deve ser gerado
* Componentes de interface (Barra de busca otimizada, Tabela de lotes, Modal de confirmação de saída).
* Serviço de integração HTTP (ex: Axios/Fetch) para comunicação com a API.
* Gerenciamento de estado local (dados da busca, estado de carregamento, erros).
* Validações visuais impedindo ações inválidas pelo usuário.

## 4. Experiência esperada
* Exibição de indicador de carregamento (*spinner* ou *skeleton*) durante as chamadas de rede.
* Alerta visual (ex: texto em vermelho ou ícone de alerta) em lotes com vencimento inferior a 30 dias.
* Notificações *toast* ou *snackbars* amigáveis para feedbacks de sucesso ("Venda registrada") ou erro ("Estoque insuficiente").
* Bloqueio do botão de envio após o primeiro clique para evitar requisições duplicadas.

## 5. Testes obrigatórios
* Testes unitários dos componentes garantindo a renderização correta da tabela de lotes.
* Testes de interação simulando o fluxo completo: buscar produto, selecionar lote, preencher quantidade e confirmar saída.
* Validação manual de responsividade (funcionamento adequado em telas de diferentes tamanhos).

## 6. Critérios de aceite
* O botão de "Confirmar Saída" deve ficar desabilitado se a quantidade digitada for maior que o saldo do lote.
* O sistema não pode permitir a seleção de lotes já vencidos.
* O componente deve se recuperar de forma limpa caso a API retorne erro 500, exibindo uma mensagem adequada.

## 7. Pedido para a IA
Gere a estrutura de componentes front-end para a tela de Consulta e Saída, implementando o consumo da API descrita, o gerenciamento de estado e as regras de feedback visual. Inclua os testes de renderização e de interação do fluxo principal de venda.