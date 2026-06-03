# Requisitos e regras de negócio

## 1. Requisitos funcionais

RF01 - Criar tarefa  
O sistema deve permitir criar uma nova tarefa informando um título.

RF02 - Listar tarefas  
O sistema deve retornar a lista de todas as tarefas cadastradas.

RF03 - Concluir tarefa  
O sistema deve permitir marcar uma tarefa como concluída.

RF04 - Excluir tarefa  
O sistema deve permitir excluir uma tarefa existente.

---

## 2. Requisitos não funcionais

RNF01 - Simplicidade  
O sistema deve ser simples, sem regras desnecessárias.

RNF02 - Clareza de código  
O código deve ser legível e organizado.

RNF03 - Consistência  
As respostas da API devem seguir padrão consistente.

RNF04 - Testabilidade  
Todas as funcionalidades devem ser testáveis via API.

RNF05 - Baixo acoplamento  
As camadas da aplicação devem ser separadas (controller, service, repository).

---

## 3. Regras de negócio

RN01 - Título obrigatório  
Uma tarefa não pode ser criada sem título.

RN02 - Estado inicial  
Toda tarefa criada deve iniciar como não concluída (concluida = false).

RN03 - Conclusão de tarefa  
Uma tarefa pode ser marcada como concluída apenas se existir.

RN04 - Exclusão permanente  
Ao excluir uma tarefa, ela deve ser removida definitivamente do sistema.

RN05 - Imutabilidade do título  
O título da tarefa não pode ser alterado após criação.

RN06 - Identificação única  
Cada tarefa deve possuir um identificador único.

---

## 4. Casos de uso prioritários

### UC01 - Criar tarefa
Fluxo:
1. Usuário informa título
2. Sistema valida título
3. Sistema cria tarefa com concluida = false
4. Sistema retorna tarefa criada

---

### UC02 - Listar tarefas
Fluxo:
1. Usuário solicita lista
2. Sistema retorna todas as tarefas

---

### UC03 - Concluir tarefa
Fluxo:
1. Usuário informa ID da tarefa
2. Sistema verifica existência
3. Sistema marca como concluída
4. Sistema retorna tarefa atualizada

---

### UC04 - Excluir tarefa
Fluxo:
1. Usuário informa ID da tarefa
2. Sistema verifica existência
3. Sistema remove tarefa
4. Sistema confirma exclusão

---

## 5. Critérios de aceite

### Criar tarefa
- Deve rejeitar título vazio
- Deve retornar tarefa com ID gerado
- Deve retornar concluida = false

---

### Listar tarefas
- Deve retornar lista (mesmo vazia)
- Não deve falhar sem dados

---

### Concluir tarefa
- Deve alterar concluida para true
- Deve falhar se tarefa não existir

---

### Excluir tarefa
- Deve remover a tarefa
- Deve falhar se tarefa não existir

---

## 6. Dependências entre requisitos

- RF03 depende de RF01 (precisa existir tarefa)
- RF04 depende de RF01 (precisa existir tarefa)

---

## 7. Pontos de atenção e decisões de simplificação

### Conclusão de tarefa já concluída
- Decisão: permitir operação idempotente sem erro.
- Justificativa: mantém a API simples e evita falha desnecessária ao reafirmar o mesmo estado.

### Retorno após exclusão
- Decisão: retornar status HTTP sem corpo (204 No Content) em exclusão bem-sucedida.
- Justificativa: segue padrão REST e evita estrutura de resposta adicional.

### Validação de título
- Decisão: campo título deve ser obrigatório e não vazio após trim de espaços em branco.
- Justificativa: garante dados válidos sem criar regras de validação excessivas.

---

## 8. Pedido para o Agente Arquiteto

Organize estes requisitos e:

1. Verifique consistência entre regras e casos de uso
2. Identifique lacunas que precisam de decisão
3. Sugira melhorias sem aumentar complexidade
4. Prepare base para modelagem de dados
5. Indique riscos técnicos

IMPORTANTE:
- Não adicionar novas funcionalidades
- Não alterar escopo
- Em caso de dúvida, manter simplicidade

---

## 9. Critérios de validação deste arquivo

O humano deve validar:

1. Se os requisitos estão completos e mínimos
2. Se não há regras desnecessárias
3. Se os casos de uso cobrem tudo
4. Se os critérios de aceite são objetivos
5. Se as pendências fazem sentido antes da próxima etapa