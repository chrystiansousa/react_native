# Desenvolvimento back-end, módulo Tarefas

## 1. Contexto do módulo

Implementação da API de tarefas conforme contrato definido em `04_contratos_de_api.md`.

Funcionalidades:
- Criar tarefa
- Listar tarefas
- Concluir tarefa
- Excluir tarefa

---

## 2. Requisitos técnicos

- Framework: Spring Boot
- Linguagem: Java
- Banco: relacional (MySQL ou H2)
- Arquitetura: camadas (controller, service, repository)
- JPA/Hibernate para persistência
- JSON como formato de comunicação

---

## 3. Contrato da API consumido

Base: /api/v1/tarefas

Endpoints:
- POST /
- GET /
- PATCH /{id}
- DELETE /{id}

---

## 4. O que deve ser gerado

- Entity: Tarefa
- Repository: TarefaRepository
- Service: TarefaService
- Controller: TarefaController
- Exception: TarefaNaoEncontradaException
- Handler global de erros
- Testes unitários e de integração

---

## 5. Implementação

### 5.1 Entity

```java
@Entity
@Table(name = "tarefas")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private Boolean concluida = false;

    // getters e setters
}
```

---

### 5.2 Repository

```java
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
```

---

### 5.3 Exception

```java
public class TarefaNaoEncontradaException extends RuntimeException {
    public TarefaNaoEncontradaException() {
        super("Tarefa não encontrada");
    }
}
```

---

### 5.4 Service

```java
@Service
public class TarefaService {

    private final TarefaRepository repository;

    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public Tarefa criar(String titulo) {
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new IllegalArgumentException("O título é obrigatório");
        }

        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(titulo.trim());
        tarefa.setConcluida(false);

        return repository.save(tarefa);
    }

    public List<Tarefa> listar() {
        return repository.findAll();
    }

    public Tarefa concluir(Long id) {
        Tarefa tarefa = repository.findById(id)
                .orElseThrow(TarefaNaoEncontradaException::new);

        tarefa.setConcluida(true);
        return repository.save(tarefa);
    }

    public void excluir(Long id) {
        Tarefa tarefa = repository.findById(id)
                .orElseThrow(TarefaNaoEncontradaException::new);

        repository.delete(tarefa);
    }
}
```

---

### 5.5 Controller

```java
@RestController
@RequestMapping("/api/v1/tarefas")
public class TarefaController {

    private final TarefaService service;

    public TarefaController(TarefaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Tarefa> criar(@RequestBody Map<String, String> body) {
        Tarefa tarefa = service.criar(body.get("titulo"));
        return ResponseEntity.status(HttpStatus.CREATED).body(tarefa);
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Tarefa> concluir(@PathVariable Long id) {
        return ResponseEntity.ok(service.concluir(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

### 5.6 Handler global de erros

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TarefaNaoEncontradaException.class)
    public ResponseEntity<Map<String, String>> handleNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "erro", "TAREFA_NAO_ENCONTRADA",
                        "mensagem", "Tarefa não encontrada"
                ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest() {
        return ResponseEntity.badRequest()
                .body(Map.of(
                        "erro", "TITULO_INVALIDO",
                        "mensagem", "O título é obrigatório"
                ));
    }
}
```

---

## 6. Testes obrigatórios

### 6.1 Teste unitário (Service)

```java
@SpringBootTest
class TarefaServiceTest {

    @Autowired
    private TarefaService service;

    @Test
    void deveCriarTarefa() {
        Tarefa tarefa = service.criar("Teste");
        assertNotNull(tarefa.getId());
        assertFalse(tarefa.getConcluida());
    }
}
```

---

### 6.2 Teste de integração (Controller)

```java
@SpringBootTest
@AutoConfigureMockMvc
class TarefaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void deveCriarTarefa() throws Exception {
        mockMvc.perform(post("/api/v1/tarefas")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"titulo\":\"Teste\"}"))
                .andExpect(status().isCreated());
    }
}
```

---

## 7. Critérios de aceite

- API responde conforme contrato
- Testes unitários passam
- Testes de integração passam
- Validação de título funciona
- Erros retornam corretamente
- Endpoints funcionam via Postman ou Insomnia

---

## 8. Pedido para o Agente de QA

1. Validar todos os endpoints
2. Testar cenários de erro
3. Garantir consistência com contrato
4. Registrar falhas sem corrigir código

---

## EVIDÊNCIAS

- Testes unitários executando sem falha
- Testes de integração retornando status esperado

---

## RESUMO PARA VALIDAÇÃO HUMANA

O que foi feito:
- Implementação completa do backend
- Controller, service e repository criados
- Tratamento de erros implementado
- Testes básicos incluídos

O que precisa ser validado:
- Execução da API
- Testes passando
- Respostas conforme contrato

Pendências abertas:
- Nenhuma