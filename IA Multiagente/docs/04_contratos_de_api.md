# Contratos de API — Módulo de Tarefas

Versão da API: /api/v1

Referências obrigatórias de leitura:
- docs/00_orientacao_agentes.md
- docs/09_glossario_dominio.md
- docs/02_requisitos_e_regras_de_negocio.md
- docs/03_modelagem_banco_e_dados.md

Observações iniciais:
- A entidade principal é `Tarefa` com campos: `id`, `titulo`, `concluida`.
- Não há autenticação nem usuários.
- Não existe edição de `titulo` após criação.
- Todas as rotas seguem `/api/v1` e respeitam as regras de negócio descritas nos arquivos de referência.

-----

**Esquema de recurso `Tarefa`**

Exemplo de representação JSON de uma tarefa:

{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": false
}

Campos:
- `id` (BIGINT) — identificador único gerado pelo servidor.
- `titulo` (String) — obrigatório, não vazio após trim.
- `concluida` (Boolean) — obrigatória, default `false`.

-----

**Erros padronizados**

Todos os erros seguem o esquema abaixo (exemplos reais):

{
  "status": 400,
  "code": "ERR_TITULO_OBRIGATORIO",
  "message": "O campo 'titulo' é obrigatório e não pode ser vazio."
}

Campos:
- `status`: código HTTP
- `code`: código interno do erro (texto, sem espaços)
- `message`: mensagem clara em português

Erros comuns previstos:
- 400 Bad Request — `ERR_TITULO_OBRIGATORIO` (criação com título vazio)
- 404 Not Found — `ERR_TAREFA_NAO_ENCONTRADA` (operar em tarefa inexistente)
- 500 Internal Server Error — `ERR_SERVIDOR` (falha inesperada)

-----

## Endpoints

Nota: todos os exemplos usam `Content-Type: application/json` e rotas versionadas em `/api/v1`.

### 1) Criar tarefa
- Rota: `POST /api/v1/tarefas`
- Descrição: cria uma nova tarefa. `titulo` é obrigatório.

Request (exemplo real):

POST /api/v1/tarefas

{
  "titulo": "Comprar pão"
}

Resposta de sucesso (201 Created):

HTTP/1.1 201 Created
{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": false
}

Erro de validação (400 Bad Request):

HTTP/1.1 400 Bad Request
{
  "status": 400,
  "code": "ERR_TITULO_OBRIGATORIO",
  "message": "O campo 'titulo' é obrigatório e não pode ser vazio."
}

Observações de negócio:
- Ao criar, `concluida` deve sempre ser `false` (RN02).
- Deve rejeitar título vazio ou composto apenas por espaços (critério de aceite).

---

### 2) Listar todas as tarefas
- Rota: `GET /api/v1/tarefas`
- Descrição: retorna todas as tarefas cadastradas (mesmo que vazio).

Request (exemplo):

GET /api/v1/tarefas

Resposta de sucesso (200 OK) — exemplo com dados reais:

HTTP/1.1 200 OK
[
  {
    "id": 1,
    "titulo": "Comprar pão",
    "concluida": false
  },
  {
    "id": 2,
    "titulo": "Enviar relatório",
    "concluida": true
  }
]

Resposta quando não houver tarefas (exemplo real):

HTTP/1.1 200 OK
[]

Observações de negócio:
- Deve sempre retornar 200 com array (não usar null).

---

### 3) Obter tarefa por ID
- Rota: `GET /api/v1/tarefas/{id}`
- Descrição: retorna a tarefa com o `id` informado.

Request (exemplo):

GET /api/v1/tarefas/1

Resposta de sucesso (200 OK):

HTTP/1.1 200 OK
{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": false
}

Erro quando não existe (404 Not Found):

HTTP/1.1 404 Not Found
{
  "status": 404,
  "code": "ERR_TAREFA_NAO_ENCONTRADA",
  "message": "Tarefa com id 999 não encontrada."
}

Observações de negócio:
- Utilizar para verificar existência antes de operações que dependam da tarefa.

---

### 4) Concluir tarefa
- Rota: `PATCH /api/v1/tarefas/{id}/concluir`
- Descrição: marca a tarefa como concluída (`concluida = true`). Operação idempotente.

Request (exemplo):

PATCH /api/v1/tarefas/1/concluir

Body: vazio

Resposta de sucesso (200 OK) quando primeira conclusão:

HTTP/1.1 200 OK
{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": true
}

Resposta de sucesso (200 OK) quando já estava concluída (idempotência):

HTTP/1.1 200 OK
{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": true
}

Erro quando não existe (404 Not Found):

HTTP/1.1 404 Not Found
{
  "status": 404,
  "code": "ERR_TAREFA_NAO_ENCONTRADA",
  "message": "Tarefa com id 999 não encontrada."
}

Observações de negócio:
- Operação é idempotente por decisão de simplificação (ver docs/02_requisitos_e_regras_de_negocio.md).

---

### 5) Excluir tarefa
- Rota: `DELETE /api/v1/tarefas/{id}`
- Descrição: remove permanentemente a tarefa (sem soft-delete).

Request (exemplo):

DELETE /api/v1/tarefas/2

Resposta de sucesso (204 No Content):

HTTP/1.1 204 No Content
(corpo vazio)

Erro quando não existe (404 Not Found):

HTTP/1.1 404 Not Found
{
  "status": 404,
  "code": "ERR_TAREFA_NAO_ENCONTRADA",
  "message": "Tarefa com id 999 não encontrada."
}

Observações de negócio:
- Exclusão é permanente conforme RN04; não manter histórico.

-----

## Regras de contrato (resumo)

- Prefixo de versão obrigatório: `/api/v1`.
- Todos os endpoints retornam `application/json` exceto `DELETE` que retorna `204 No Content` sem corpo.
- Não há autenticação.
- Não existe endpoint para alteração de `titulo` — imutabilidade garantida.
- Validação de `titulo`: não vazio após trim; erro `400` se inválido.
- Identificador `id` retornado pelo servidor (BIGINT na modelagem atual).
- Mensagens de erro sempre trazem `status`, `code` e `message`.

-----

## Pontos que precisam de validação humana (divergências / pendências)

1. Tipo do `id`: o glossário permite `Long ou UUID`. A modelagem atual usa `BIGINT` (`IDENTITY`). Confirmar se `BIGINT` é a escolha desejada ou se o time prefere `UUID`.
2. Forma da rota de conclusão: usei `PATCH /api/v1/tarefas/{id}/concluir` conforme modelagem, mas também é comum usar `PATCH /api/v1/tarefas/{id}` com body `{ "concluida": true }`. Confirmar qual estilo REST o time deseja.
3. Cabeçalho `Location` na criação: o contrato usa retorno 201 com corpo contendo o recurso; decidir se será adicionada a header `Location: /api/v1/tarefas/{id}` (recomendado em REST) — atualmente não obrigatório.
4. Formato do `id` em mensagens de erro: exemplos usam números (e.g., 999). Se mudar para `UUID`, exemplos e mensagens devem ser atualizados.

Se algum destes pontos for alterado, abrir [QUESTIONAMENTO] conforme protocolo e atualizar este documento.

-----

RESUMO PARA VALIDAÇÃO HUMANA
- O que foi feito: traduzi requisitos e modelagem em contratos REST completos para o módulo de tarefas e gerei exemplos reais de requests/responses.
- O que precisa ser validado: os 4 pontos listados em "Pontos que precisam de validação humana" acima.
- Pendências abertas: confirmação do tipo de `id`, estilo de endpoint para conclusão, definição sobre header `Location`.

Agente Designer de API, 20 de maio de 2026, versão do prompt v1.0
# Contratos de API

## 1. Objetivo

Definir endpoints, métodos HTTP, parâmetros, respostas e erros da API de tarefas.

A API deve ser simples, consistente e seguir padrão REST.

---

## 2. Padrão de versionamento

A API será versionada via URL:

/api/v1

---

## 3. Autenticação e autorização

Não há autenticação neste sistema.

Todas as rotas são públicas.

---

## 4. Endpoints

### 4.1 Criar tarefa

POST /api/v1/tarefas

#### Request

```json
{
  "titulo": "Comprar pão"
}
```

#### Regras
- "titulo" é obrigatório
- espaços no início e fim devem ser ignorados

#### Response - 201 CREATED

```json
{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": false
}
```

---

### 4.2 Listar tarefas

GET /api/v1/tarefas

#### Request
Sem parâmetros

#### Response - 200 OK

```json
[
  {
    "id": 1,
    "titulo": "Comprar pão",
    "concluida": false
  },
  {
    "id": 2,
    "titulo": "Estudar",
    "concluida": true
  }
]
```

---

### 4.3 Concluir tarefa

PATCH /api/v1/tarefas/{id}

#### Request
Sem body

#### Regras
- Operação idempotente
- Se já estiver concluída, não deve gerar erro

#### Response - 200 OK

```json
{
  "id": 1,
  "titulo": "Comprar pão",
  "concluida": true
}
```

---

### 4.4 Excluir tarefa

DELETE /api/v1/tarefas/{id}

#### Request
Sem body

#### Response - 204 NO CONTENT

Sem corpo de resposta

---

## 5. Erros esperados

### 5.1 Título inválido

HTTP 400 BAD REQUEST

```json
{
  "erro": "TITULO_INVALIDO",
  "mensagem": "O título é obrigatório"
}
```

---

### 5.2 Tarefa não encontrada

HTTP 404 NOT FOUND

```json
{
  "erro": "TAREFA_NAO_ENCONTRADA",
  "mensagem": "Tarefa não encontrada"
}
```

---

## 6. Regras de contrato

- Todos os dados devem ser retornados em JSON
- Campos devem seguir exatamente:
  - id
  - titulo
  - concluida
- Não retornar campos extras
- Não alterar nomes dos campos
- Todas as respostas devem ser consistentes

---

## 7. Padrões de resposta

### Sucesso
- 200 OK → leitura ou atualização
- 201 CREATED → criação
- 204 NO CONTENT → exclusão

### Erro
- 400 → erro de validação
- 404 → recurso não encontrado

---

## 8. Pontos de validação

- Estrutura dos JSONs está coerente
- Endpoints seguem padrão REST
- Status HTTP estão corretos
- Regras estão alinhadas com requisitos

---

## 9. Pedido para o Agente Back-end

1. Implementar todos os endpoints exatamente como definidos
2. Não alterar contrato
3. Criar testes unitários
4. Criar testes de integração
5. Garantir que respostas estejam idênticas ao especificado

---

## RESUMO PARA VALIDAÇÃO HUMANA

O que foi feito:
- Definição completa dos endpoints
- JSONs reais de request/response
- Definição de erros e status HTTP
- Padronização da API

O que precisa ser validado:
- Estrutura dos endpoints
- JSONs de entrada e saída
- Tratamento de erros
- Consistência geral

Pendências abertas:
- Nenhuma