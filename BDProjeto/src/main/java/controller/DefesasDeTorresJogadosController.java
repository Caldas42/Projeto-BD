package controller;

import dao.Defesas_de_Torres_JogadosDAO;
import model.Defesas_de_Torres_Jogados;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/defesas-torres")
public class DefesasDeTorresJogadosController {

    private final Defesas_de_Torres_JogadosDAO dtjDAO = new Defesas_de_Torres_JogadosDAO();

    @GetMapping
    public List<Defesas_de_Torres_Jogados> listar() throws SQLException {
        return dtjDAO.listar();
    }

    @PostMapping
    public void inserir(@RequestBody Defesas_de_Torres_Jogados dtj) throws SQLException {
        dtjDAO.inserir(dtj);
    }

    @PutMapping
    public void atualizar(@RequestBody Defesas_de_Torres_Jogados dtj) throws SQLException {
        dtjDAO.atualizar(dtj);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable int id) throws SQLException {
        dtjDAO.excluir(id);
    }
}