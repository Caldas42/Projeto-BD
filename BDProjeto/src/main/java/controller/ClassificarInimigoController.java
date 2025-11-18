package controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.HashMap;

import dao.InimigoDAO;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ClassificarInimigoController {

    @Autowired
    private InimigoDAO inimigoDAO;

    public static class InimigoRequest {
        public int vida;
        public double velocidade;
    }

    @PostMapping("/classificar-inimigo")
    public Map<String, String> classificar(@RequestBody InimigoRequest req) {

        String resultado = inimigoDAO.classificarInimigo(req.vida, req.velocidade);

        Map<String, String> resposta = new HashMap<>();
        resposta.put("classificacao", resultado);

        return resposta;
    }
}
