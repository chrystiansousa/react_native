package com.example.backend.exception;

public class TituloInvalidoException extends RuntimeException {

    public TituloInvalidoException() {
        super("O campo 'titulo' é obrigatório e não pode ser vazio.");
    }
}
