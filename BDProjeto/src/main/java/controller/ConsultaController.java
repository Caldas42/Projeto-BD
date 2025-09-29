package controller;

import dao.ConsultaDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaDAO consultaDAO = new ConsultaDAO();

    @GetMapping("/jogadores-pvz-clash")
    public List<Map<String, Object>> getJogadoresPvzOuClash() throws SQLException {
        return consultaDAO.getJogadoresPvzOuClash();
    }

    @GetMapping("/contagem-jogos-pessoa")
    public List<Map<String, Object>> getContagemJogosPorPessoa() throws SQLException {
        return consultaDAO.getContagemJogosPorPessoa();
    }

    @GetMapping("/jogos-de-cada-pessoa")
    public List<Map<String, Object>> getJogosDeCadaPessoa() throws SQLException {
        return consultaDAO.getJogosDeCadaPessoa();
    }

    @GetMapping("/proxima-fase")
    public List<Map<String, Object>> getProximaFase() throws SQLException {
        return consultaDAO.getProximaFase();
    }
}
