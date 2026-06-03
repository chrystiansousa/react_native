# Glossário de domínio

## 1. Termos do negócio

### Tarefa
Definição:
Item simples que representa algo a ser feito.

Regras:
- Possui título obrigatório
- Pode estar concluída ou não
- Não possui data, prioridade ou categoria

Sinônimos proibidos:
- Atividade
- Job
- Item

Exemplo:
"Comprar pão" é uma tarefa

---

### Tarefa concluída
Definição:
Tarefa que foi marcada como finalizada.

Regra:
Campo booleano "concluida" deve ser true

---

### Tarefa pendente
Definição:
Tarefa ainda não concluída.

Regra:
Campo "concluida" deve ser false

---

## 2. Termos técnicos

### API
Interface de comunicação entre front-end e back-end via HTTP.

---

### Endpoint
Rota da API que executa uma ação específica.

Exemplo:
GET /api/tarefas

---

### CRUD
Conjunto de operações:
- Create (criar)
- Read (ler)
- Update (atualizar)
- Delete (deletar)

---

### JSON
Formato padrão de troca de dados entre front-end e back-end.

---

## 3. Convenções de nomenclatura

### Entidade
- Nome: Tarefa
- Tabela: tarefas

### Campos
- id (Long ou UUID)
- titulo (String)
- concluida (Boolean)

### Endpoints
- /api/tarefas
- /api/tarefas/{id}

### Métodos HTTP
- POST → criar tarefa
- GET → listar tarefas
- PATCH → marcar como concluída
- DELETE → excluir tarefa

---

## 4. Termos ambíguos resolvidos

### "Completar tarefa"
Decisão:
Sempre usar "concluir tarefa"

Motivo:
Padronização com o campo "concluida"

---

## 5. Regras globais do domínio

1. Não existe usuário no sistema
2. Todas as tarefas são globais
3. Não existe autenticação
4. Não existe edição de título (somente criação e conclusão)
5. Exclusão remove permanentemente a tarefa

---

## 6. Pedido para o Agente Documentador
Manter consistência deste arquivo.

Novos termos:
- Devem ser propostos
- Devem ser validados por humano
- Só então adicionados