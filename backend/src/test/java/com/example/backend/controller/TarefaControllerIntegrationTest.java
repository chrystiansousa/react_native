package com.example.backend.controller;

import com.example.backend.model.Tarefa;
import com.example.backend.repository.TarefaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class TarefaControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TarefaRepository repository;

    @BeforeEach
    void limparBanco() {
        repository.deleteAll();
    }

    @Test
    void deveCriarTarefaRetornando201() throws Exception {
        mockMvc.perform(post("/api/v1/tarefas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"Comprar pão\"}"))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.titulo", is("Comprar pão")))
                .andExpect(jsonPath("$.concluida", is(false)));
    }

    @Test
    void deveRetornar400QuandoTituloForVazio() throws Exception {
        mockMvc.perform(post("/api/v1/tarefas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"   \"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.code", is("ERR_TITULO_OBRIGATORIO")))
                .andExpect(jsonPath("$.message", is("O campo 'titulo' é obrigatório e não pode ser vazio.")));
    }

    @Test
    void deveListarTarefasVazias() throws Exception {
        mockMvc.perform(get("/api/v1/tarefas"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void deveBuscarTarefaPorId() throws Exception {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo("Enviar relatório");
        tarefa.setConcluida(false);
        tarefa = repository.save(tarefa);

        mockMvc.perform(get("/api/v1/tarefas/{id}", tarefa.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(tarefa.getId().intValue())))
                .andExpect(jsonPath("$.titulo", is("Enviar relatório")))
                .andExpect(jsonPath("$.concluida", is(false)));
    }

    @Test
    void deveRetornar404AoBuscarTarefaInexistente() throws Exception {
        mockMvc.perform(get("/api/v1/tarefas/{id}", 999L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.code", is("ERR_TAREFA_NAO_ENCONTRADA")));
    }

    @Test
    void deveConcluirTarefaEManterIdempotencia() throws Exception {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo("Estudar");
        tarefa.setConcluida(false);
        tarefa = repository.save(tarefa);

        mockMvc.perform(patch("/api/v1/tarefas/{id}/concluir", tarefa.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.concluida", is(true)));

        mockMvc.perform(patch("/api/v1/tarefas/{id}/concluir", tarefa.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.concluida", is(true)));
    }

    @Test
    void deveExcluirTarefaRetornando204() throws Exception {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo("Apagar teste");
        tarefa.setConcluida(false);
        tarefa = repository.save(tarefa);

        mockMvc.perform(delete("/api/v1/tarefas/{id}", tarefa.getId()))
                .andExpect(status().isNoContent());
    }
}
