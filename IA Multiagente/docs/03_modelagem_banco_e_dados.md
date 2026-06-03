# Modelagem de banco de dados

## 1. Premissas e riscos iniciais

### Premissas
- O domínio tem apenas uma entidade: tarefa.
- Não existe usuário nem autenticação no sistema.
- Todas as tarefas são globais e persistidas em banco relacional.
- A única operação de atualização permitida é marcar tarefa como concluída.
- A exclusão é permanente e não há soft delete.
- O título é obrigatório e não deve ser vazio após trim.
- Conclusão de tarefa já concluída é idempotente para simplificar o fluxo.

### Riscos iniciais
- Risco de interpretação diferente para conclusão idempotente versus erro.
- Risco de usar tipos SQL específicos demais para um banco relacional genérico.
- Risco de incluir campos além do escopo e aumentar complexidade.
- Risco de validação insuficiente de título gerar registros inválidos.

---

## 2. Objetivo da modelagem

Definir a estrutura mínima e consistente para persistir tarefas de TODO, com foco em simplicidade, integridade e alinhamento com a visão do sistema.

---

## 3. Entidade única: tarefa

### Tabela: tarefas
- Função: armazenar todas as tarefas do sistema.
- Escopo: somente criar, listar, concluir e excluir.
- Campos permitidos: id, titulo, concluida.

---

## 4. Atributos e regras de integridade

### id
- Tipo: BIGINT
- Função: identificador único da tarefa
- Regra: chave primária

### titulo
- Tipo: VARCHAR(255)
- Regra: obrigatório e não vazio após trim
- Justificativa: atende à regra de negócio de título obrigatório sem adicionar regras extras.

### concluida
- Tipo: BOOLEAN
- Regra: obrigatório, valor padrão false
- Justificativa: modela o estado de tarefa pendente ou concluída de forma direta.

---

## 5. Regras de negócio aplicadas no modelo
- RN01: título obrigatório é garantido por NOT NULL e CHECK(trim(titulo) <> '').
- RN02: estado inicial concluida = false é garantido por DEFAULT FALSE.
- RN03: conclusão só ocorre se tarefa existir, validação feita na camada de serviço mas suportada por chave primária.
- RN04: exclusão remove permanentemente o registro da tabela.
- RN05: imutabilidade do título é reforçada pela ausência de endpoint de edição de título e pela modelagem simples.
- RN06: identificação única é garantida pela chave primária id.

---

## 6. Modelo lógico e normalização
- A tabela tarefas está em 3ª forma normal, pois cada atributo depende apenas da chave primária.
- Não existem relacionamentos nem tabelas auxiliares.
- Não há redundância de dados.

Justificativa: atende ao requisito de persistência simples e evita complexidade desnecessária.

---

## 7. Script SQL de criação da tabela

```sql
CREATE TABLE tarefas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT tarefa_titulo_nao_vazio CHECK (trim(titulo) <> '')
);
```

> Observação: este script usa SQL relacional padrão para manter portabilidade entre bancos.

---

## 8. Decisões tomadas

1. Escolher apenas a tabela `tarefas` porque o sistema deve ser simples e minimizar entidades.
2. Usar `BOOLEAN` e `DEFAULT FALSE` para representar o estado concluída de forma explícita.
3. Adotar validação de título após trim para evitar registros apenas com espaços.
4. Definir conclusão idempotente para reduzir tratamento de erro e melhorar consistência.
5. Definir retorno de exclusão como status sem corpo para seguir padrão REST simples.
6. Não incluir campos extras como data, prioridade, categoria ou auditoria.

---

## 9. Riscos técnicos

- Dependência do tipo `BOOLEAN`: alguns bancos relacionais tratam booleano de forma distinta, mas o modelo permanece claro para implementação.
- Uso de `IDENTITY` pode exigir ajuste para um banco específico; ainda assim, o design é compatível com persistência relacional.
- Validação de título apenas em banco pode ser insuficiente sem validação de aplicação, mas a regra mínima já está no modelo.
- Sem índices adicionais, a tabela é simples, mas adequada ao volume pequeno esperado.

---

## 10. Preparação para o próximo agente (API)

O modelo suporta diretamente os endpoints:
- POST /api/tarefas
- GET /api/tarefas
- PATCH /api/tarefas/{id}/concluir
- DELETE /api/tarefas/{id}

A API deve aceitar JSON com `titulo` para criação e retornar o objeto tarefa com `id`, `titulo` e `concluida`.

---

## 11. Base para arquitetura e próximos passos

- A camada de persistência usa a tabela `tarefas` como fonte única de verdade.
- O repositório deve mapear `tarefa` para este modelo relacional.
- O serviço deve aplicar validações de existência e regras de negócio antes de persistir.
- O controller deve expor os endpoints REST mínimos e retornar respostas consistentes.

---

## RESUMO PARA VALIDAÇÃO HUMANA

O que foi feito:
- Analisei os arquivos 01 e 02 em busca de inconsistências e lacunas.
- Resolvi ambiguidades de comportamento de conclusão, exclusão e validação de título.
- Projetei a modelagem de banco de dados completa para a entidade tarefa.
- Gereis o script SQL e listei decisões e riscos técnicos.
- Preparei a base para o próximo agente de API.

O que precisa ser validado:
- Estrutura da tabela `tarefas` e seus campos.
- Regras de integridade aplicadas ao título e ao estado concluída.
- Decisão de conclusão idempotente e retorno de exclusão sem corpo.
- A escolha de não adicionar campos extra.

Pendências abertas:
- Nenhuma.

Agente Arquiteto, 20 de maio de 2026, versão do prompt v1.0