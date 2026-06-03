package com.example.backend.service;

import com.example.backend.exception.TarefaNaoEncontradaException;
import com.example.backend.exception.TituloInvalidoException;
import com.example.backend.model.Tarefa;
import com.example.backend.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository repository;

    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public Tarefa criar(String titulo) {
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new TituloInvalidoException();
        }

        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(titulo.trim());
        tarefa.setConcluida(false);

        return repository.save(tarefa);
    }

    public List<Tarefa> listar() {
        return repository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException(id));
    }

    public Tarefa concluir(Long id) {
        Tarefa tarefa = buscarPorId(id);
        tarefa.setConcluida(true);
        return repository.save(tarefa);
    }

    public void excluir(Long id) {
        Tarefa tarefa = buscarPorId(id);
        repository.delete(tarefa);
    }
}
