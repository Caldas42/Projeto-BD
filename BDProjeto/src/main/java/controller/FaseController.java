package controller;

import dao.FaseDAO;
import model.Fase;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/fases")
public class FaseController {

    private final FaseDAO faseDAO = new FaseDAO();

    @GetMapping
    public List<Fase> listarFases() throws SQLException {
        return faseDAO.listar();
    }

    @PostMapping
    public void inserirFase(@RequestBody Fase fase) throws SQLException {
        faseDAO.inserir(fase);
    }

    @PutMapping("/{id}")
    public void atualizarFase(@RequestBody Fase fase) throws SQLException {
        faseDAO.atualizar(fase);
    }

    @DeleteMapping("/{id}")
    public void excluirFase(@PathVariable int id) throws SQLException {
        faseDAO.excluir(id);
    }
}