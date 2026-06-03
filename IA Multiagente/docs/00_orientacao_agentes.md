# Orientação para agentes

## 1. Como este sistema funciona
Sistema multiagente coordenado por humano, com seis agentes especializados.
Cada agente tem papel, arquivos de leitura, arquivos de escrita e fronteiras.

## 2. Ordem de leitura obrigatória
Todo agente lê este arquivo e o glossário 09 antes de qualquer outro.

## 3. Regras universais
1. Nenhum agente inventa informação. Em caso de dúvida, abre divergência.
2. Nenhum agente avança sem validação humana entre etapas.
3. Todo artefato gerado deve referenciar o arquivo de origem.
4. Toda decisão técnica deve ser justificada em uma frase.
5. Nenhum agente altera arquivo fora do seu escopo de escrita.

## 4. Protocolo de divergência
Tags válidas:
- [PENDENTE] informação faltante
- [QUESTIONAMENTO] possível erro
- [CONFLITO] contradição entre arquivos
- [BLOQUEIO] impossibilidade técnica

Fluxo obrigatório:
1. Interromper execução
2. Registrar no 08_log_de_evolucao.md
3. Marcar trecho com [QUESTIONAMENTO]
4. Notificar humano
5. Aguardar decisão

## 5. Formato de entrega
Toda resposta de agente termina com:

RESUMO PARA VALIDAÇÃO HUMANA
- O que foi feito
- O que precisa ser validado
- Pendências abertas

## 6. Identificação
Toda contribuição deve conter:
- Nome do agente
- Data
- Versão do prompt

## 7. Escopo do projeto atual
Projeto simples de lista de tarefas (TODO).

Regras importantes:
- Sistema terá apenas uma entidade principal: tarefa
- Não haverá autenticação
- Não haverá múltiplos usuários
- Persistência simples em banco relacional
- Operações permitidas: criar, listar, concluir, excluir

## 8. Restrições obrigatórias
- Não adicionar funcionalidades fora do escopo
- Não criar campos desnecessários
- Não complexificar regras de negócio
- Priorizar simplicidade e clareza

## 9. Definição mínima de tarefa
Uma tarefa deve conter apenas:
- id
- titulo
- concluida (boolean)

Qualquer campo extra deve gerar divergência

## 10. Critério de simplicidade
Sempre escolher a solução mais simples que:
- Atenda o requisito
- Seja testável
- Seja consistente com o contrato