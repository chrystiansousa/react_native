# Plano de testes

## 1. Objetivo

Definir como cada etapa do sistema será validada, garantindo que a aplicação funcione corretamente conforme os requisitos e contratos definidos.

---

## 2. Testes de arquitetura

Objetivo:
Validar consistência entre os artefatos do projeto.

Verificações:

- Estrutura segue padrão em camadas (controller, service, repository)
- API está alinhada com o contrato definido em 04
- Modelagem de dados está coerente com requisitos (02)
- Não há funcionalidades fora do escopo

---

## 3. Testes de back-end

### 3.1 Testes unitários

Cobertura mínima:

- Criação de tarefa com título válido
- Falha ao criar tarefa com título vazio
- Conclusão de tarefa existente
- Falha ao concluir tarefa inexistente
- Exclusão de tarefa existente
- Falha ao excluir tarefa inexistente

---

### 3.2 Testes de integração

Endpoints a validar:

#### POST /api/v1/tarefas
- Retorna 201
- Retorna tarefa criada
- Valida título obrigatório

---

#### GET /api/v1/tarefas
- Retorna 200
- Retorna lista (vazia ou não)

---

#### PATCH /api/v1/tarefas/{id}/concluir
- Retorna 200
- Marca tarefa como concluída
- Retorna 404 se não existir

---

#### DELETE /api/v1/tarefas/{id}
- Retorna 204
- Remove tarefa
- Retorna 404 se não existir

---

### 3.3 Testes manuais (API)

Ferramentas:
- Postman ou Insomnia

Cenários:

1. Criar tarefa
2. Listar tarefas
3. Concluir tarefa
4. Excluir tarefa
5. Testar erro com ID inválido
6. Testar criação com título vazio

---

## 4. Testes de front-end/mobile

### 4.1 Testes de renderização

- Tela principal abre sem erro
- Input visível
- Lista renderiza corretamente

---

### 4.2 Testes de interação

- Criar tarefa
- Concluir tarefa
- Excluir tarefa

---

### 4.3 Testes de integração com API

- Dados carregam corretamente
- Alterações refletem na tela
- Erros são tratados

> Observação: o código front-end/mobile não está presente neste workspace. A validação de interface e interação via UI não pôde ser executada neste ciclo.

---

### 4.4 Testes de estados

- Loading aparece durante requisição
- Input limpa após criação
- Lista atualiza automaticamente

---

## 5. Critérios de aprovação

Uma funcionalidade é considerada concluída quando:

- Todos os testes unitários passam
- Todos os testes de integração passam
- Fluxo manual funciona corretamente
- Respostas da API seguem o contrato
- Interface responde corretamente

---

## 6. Evidências

Devem ser registradas:

- Saída dos testes automatizados
- Prints da aplicação funcionando
- Logs de requisição/resposta
- Resultados de testes manuais

---

## 7. Prioridade dos testes

Alta:
- Criar tarefa
- Listar tarefas

Média:
- Concluir tarefa

Baixa:
- Excluir tarefa

---

## 8. Pedido para o Agente de QA

1. Executar todos os testes definidos
2. Registrar falhas com passo a passo
3. Classificar severidade
4. Atualizar log de evolução (08)
5. Não corrigir código

---

## RESUMO PARA VALIDAÇÃO HUMANA

O que foi feito:
- Definição completa da estratégia de testes
- Cobertura de backend e frontend
- Critérios de aprovação definidos

O que precisa ser validado:
- Se os testes cobrem todo o fluxo
- Se critérios de aprovação estão claros

Pendências abertas:
- Nenhuma