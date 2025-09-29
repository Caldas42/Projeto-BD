package controller;

import dao.PessoaDAO;
import model.Pessoa;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin 
@RequestMapping("/api/pessoas")
public class PessoaController {

    private final PessoaDAO pessoaDAO = new PessoaDAO();

    @GetMapping
    public List<Pessoa> listarPessoas() throws SQLException {
        return pessoaDAO.listar();
    }

    @PostMapping
    public void inserirPessoa(@RequestBody Pessoa pessoa) throws SQLException {
        pessoaDAO.inserir(pessoa);
    }

    @PutMapping("/{cod}")
    public void atualizarPessoa(@PathVariable int cod, @RequestBody Pessoa pessoa) throws SQLException {
        pessoa.setCod(cod);
        pessoaDAO.atualizar(pessoa);
    }

    @DeleteMapping("/{cod}")
    public void excluirPessoa(@PathVariable int cod) throws SQLException {
        pessoaDAO.excluir(cod);
    }
}
