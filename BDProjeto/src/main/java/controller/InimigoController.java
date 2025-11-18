package controller;

import dao.InimigoDAO;
import model.Inimigo;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin 
@RequestMapping("/api/inimigos")
public class InimigoController {

    private final InimigoDAO inimigoDAO = new InimigoDAO();

    @GetMapping
    public List<Inimigo> listarInimigos() throws SQLException {
        return inimigoDAO.listar();
    }

    @PostMapping
    public void inserirInimigo(@RequestBody Inimigo inimigo) throws SQLException {
        inimigoDAO.inserir(inimigo);
    }

    @PutMapping("/{nome}")
    public void atualizarInimigo(@PathVariable String nome, @RequestBody Inimigo inimigo) throws SQLException {
        inimigo.setNome(nome);
        inimigoDAO.atualizar(inimigo);
    }

    @DeleteMapping("/{nome}")
    public void excluirInimigo(@PathVariable String nome) throws SQLException {
        inimigoDAO.excluir(nome);
    }

    @PostMapping("/classificar-inimigo")
    @CrossOrigin("*")
    public Map<String, String> classificar(@RequestBody Map<String, Object> dados) {

        int vida = (int) dados.get("vida");
        double velocidade = Double.parseDouble(dados.get("velocidade").toString());

        InimigoDAO dao = new InimigoDAO();
        String classificacao = dao.classificarInimigo(vida, velocidade);

        return Map.of("classificacao", classificacao);
    }

    @GetMapping("/count")
    public int count() throws SQLException {
        return inimigoDAO.contar();
}

    @GetMapping("/media-vida")
    public int mediaVida() throws SQLException {
        return inimigoDAO.mediaVida();
}

    @GetMapping("/media-velocidade")
    public double mediaVelocidade() throws SQLException {
        return inimigoDAO.mediaVelocidade();
}

}