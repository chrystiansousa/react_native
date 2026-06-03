package com.example.backend.exception;

public class TarefaNaoEncontradaException extends RuntimeException {

    public TarefaNaoEncontradaException(Long id) {
        super(String.format("Tarefa com id %d não encontrada.", id));
    }
}
