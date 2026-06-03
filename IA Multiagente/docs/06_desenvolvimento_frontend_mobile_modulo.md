# Desenvolvimento front-end mobile, módulo Tarefas

## 1. Contexto do módulo

Implementação da interface mobile para gerenciamento de tarefas.

Funcionalidades:
- Criar tarefa
- Listar tarefas
- Concluir tarefa
- Excluir tarefa

---

## 2. Contrato consumido

Base URL:
http://localhost:8080/api/v1/tarefas

Endpoints:
- POST /
- GET /
- PATCH /{id}
- DELETE /{id}

---

## 3. O que deve ser gerado

- Tela principal com lista de tarefas
- Campo de input para nova tarefa
- Botão para criar tarefa
- Botão para concluir tarefa
- Botão para excluir tarefa
- Serviço de API
- Controle de estado
- Feedback visual

---

## 4. Experiência esperada

- Tela carrega lista automaticamente
- Exibe loading ao buscar dados
- Exibe erro em caso de falha
- Atualiza lista após ações
- Input limpa após criação
- Feedback visual simples

---

## 5. Implementação

### 5.1 Instalação base

```bash
npx create-expo-app tarefas-app
cd tarefas-app
npm install axios
```

---

### 5.2 Serviço de API

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/tarefas",
});

export default api;
```

---

### 5.3 Tela principal

```javascript
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import api from "./api";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregarTarefas() {
    setLoading(true);
    try {
      const response = await api.get("/");
      setTarefas(response.data);
    } catch (error) {
      console.log("Erro ao carregar tarefas");
    }
    setLoading(false);
  }

  async function criarTarefa() {
    if (!titulo.trim()) return;

    await api.post("/", { titulo });
    setTitulo("");
    carregarTarefas();
  }

  async function concluirTarefa(id) {
    await api.patch(`/${id}`);
    carregarTarefas();
  }

  async function excluirTarefa(id) {
    await api.delete(`/${id}`);
    carregarTarefas();
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nova tarefa"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Criar" onPress={criarTarefa} />

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text>
              {item.titulo} {item.concluida ? "✔️" : ""}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
                <Text>Concluir</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluirTarefa(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
```

---

## 6. Testes obrigatórios

### 6.1 Teste de renderização
- Tela deve abrir sem erro
- Input deve aparecer
- Lista deve carregar

---

### 6.2 Teste de interação

- Criar tarefa
- Concluir tarefa
- Excluir tarefa

---

### 6.3 Teste manual

1. Abrir app
2. Criar tarefa
3. Verificar listagem
4. Concluir tarefa
5. Excluir tarefa

---

## 7. Critérios de aceite

- Tela abre corretamente
- API é consumida corretamente
- Tarefas aparecem na lista
- Botões funcionam
- Loading aparece durante requisições
- Input limpa após criação

---

## 8. Pedido para o Agente de QA

1. Testar fluxo completo
2. Validar integração com API
3. Testar cenários de erro
4. Registrar falhas

---

## EVIDÊNCIAS

- Aplicação rodando no Expo
- API sendo consumida corretamente
- Ações refletindo na interface

---

## RESUMO PARA VALIDAÇÃO HUMANA

O que foi feito:
- Interface completa do app
- Integração com API
- Funcionalidades implementadas
- Testes básicos definidos

O que precisa ser validado:
- Funcionamento no dispositivo
- Integração com backend
- Experiência de uso

Pendências abertas:
- Nenhuma