package com.example.backend.service;

import com.example.backend.exception.TarefaNaoEncontradaException;
import com.example.backend.exception.TituloInvalidoException;
import com.example.backend.model.Tarefa;
import com.example.backend.repository.TarefaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TarefaServiceTest {

    @Mock
    private TarefaRepository repository;

    @InjectMocks
    private TarefaService service;

    @BeforeEach
    void configurar() {
    }

    @Test
    void deveCriarTarefaComTituloValido() {
        when(repository.save(any())).thenAnswer(invocation -> {
            Tarefa tarefa = invocation.getArgument(0);
            tarefa.setId(1L);
            return tarefa;
        });

        Tarefa resultado = service.criar("  Comprar pão  ");

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Comprar pão", resultado.getTitulo());
        assertFalse(resultado.getConcluida());
    }

    @Test
    void deveLancarErroQuandoTituloForVazio() {
        assertThrows(TituloInvalidoException.class, () -> service.criar("   "));
    }

    @Test
    void deveListarTodasAsTarefas() {
        Tarefa tarefa = new Tarefa();
        tarefa.setId(1L);
        tarefa.setTitulo("Teste");
        tarefa.setConcluida(false);

        when(repository.findAll()).thenReturn(List.of(tarefa));

        List<com.example.backend.model.Tarefa> resultado = service.listar();

        assertEquals(1, resultado.size());
        assertEquals("Teste", resultado.get(0).getTitulo());
    }

    @Test
    void deveConcluirTarefaExistente() {
        Tarefa tarefa = new Tarefa();
        tarefa.setId(1L);
        tarefa.setTitulo("Teste");
        tarefa.setConcluida(false);

        when(repository.findById(1L)).thenReturn(Optional.of(tarefa));
        when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        Tarefa resultado = service.concluir(1L);

        assertTrue(resultado.getConcluida());
        assertEquals(1L, resultado.getId());
    }

    @Test
    void deveLancarErroAoConcluirTarefaInexistente() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TarefaNaoEncontradaException.class, () -> service.concluir(1L));
    }

    @Test
    void deveExcluirTarefaExistente() {
        Tarefa tarefa = new Tarefa();
        tarefa.setId(1L);
        tarefa.setTitulo("Teste");
        tarefa.setConcluida(false);

        when(repository.findById(1L)).thenReturn(Optional.of(tarefa));
        doNothing().when(repository).delete(tarefa);

        assertDoesNotThrow(() -> service.excluir(1L));
        verify(repository).delete(tarefa);
    }
}
