### 3.4 Arquivo `04_contratos_de_api.md`

Este arquivo define a comunicação entre módulos. Ele é essencial para evitar desalinhamento entre front-end e back-end.

Conteúdo recomendado.

```markdown
# Contratos de API

## 1. Objetivo
Definir os endpoints, métodos, parâmetros, respostas e erros esperados.

## 2. Padrão de versionamento
Definir se a API terá versão no caminho, como /api/v1.

## 3. Endpoints
Listar cada rota disponível para a funcionalidade em desenvolvimento.

## 4. Requisição e resposta
Para cada endpoint, informar payload de entrada, payload de saída e exemplos reais em JSON.

## 5. Erros esperados
Informar códigos HTTP, mensagens de erro e situações de validação.

## 6. Regras de contrato
Definir campos obrigatórios, formatos aceitos, nomes e padrões de retorno.

## 7. Pedido para a IA
Documente o contrato completo e destaque qualquer ponto ambíguo que precise de validação antes do desenvolvimento.
```

O que deve ser validado neste arquivo.

1. Se os JSONs estão coerentes.
2. Se as rotas são consistentes.
3. Se os status HTTP estão corretos.
4. Se o contrato é suficiente para consumo pelo front-end.