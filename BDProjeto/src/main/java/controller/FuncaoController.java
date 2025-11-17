 package controller;
 import dao.FuncaoDAO;
 import org.springframework.web.bind.annotation.*;

 import java.sql.SQLException;
@RestController
@CrossOrigin
@RequestMapping("/api/funcoes")
public class FuncaoController {

    private final FuncaoDAO funcaoDAO = new FuncaoDAO();

    @GetMapping("/classificar-inimigo")
    public String getClassificacaoInimigo(
            @RequestParam int vida, 
            @RequestParam double velocidade) throws SQLException {
        return funcaoDAO.classificarInimigo(vida, velocidade);
    }

    @GetMapping("/calcular-bonus")
    public int getBonus(
            @RequestParam String dificuldade, 
            @RequestParam String tempo) throws SQLException {
        // Ex: /api/funcoes/calcular-bonus?dificuldade=Difícil&tempo=00:04:40
        return funcaoDAO.calcularBonus(dificuldade, tempo);
    }
}