package dao;

import util.ConnectionFactory;
import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ConsultaDAO {

    private List<Map<String, Object>> executarConsulta(String sql) throws SQLException {
        List<Map<String, Object>> resultados = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> linha = new LinkedHashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    linha.put(metaData.getColumnLabel(i), rs.getObject(i));
                }
                resultados.add(linha);
            }
        }
        return resultados;
    }
    
    // Consulta 1: Pessoas que jogam 'PVZ' ou 'Clash Royale'
    public List<Map<String, Object>> getJogadoresPvzOuClash() throws SQLException {
        String sql = "SELECT DISTINCT p.Cod FROM Pessoa p " +
                     "JOIN Defesas_de_Torres_Jogados d ON p.Cod = d.Cod_Pessoa " +
                     "WHERE d.Jogo = 'PVZ' OR d.Jogo = 'Clash Royale'";
        return executarConsulta(sql);
    }
    
    // Consulta 2: Contagem de jogos por pessoa
    public List<Map<String, Object>> getContagemJogosPorPessoa() throws SQLException {
        String sql = "SELECT p.Cod, COUNT(d.Jogo) AS Quantidade_Jogos " +
                     "FROM Pessoa p LEFT JOIN Defesas_de_Torres_Jogados d ON p.Cod = d.Cod_Pessoa " +
                     "GROUP BY p.Cod";
        return executarConsulta(sql);
    }

    // Consulta 3: Listar todos os jogos de cada pessoa
    public List<Map<String, Object>> getJogosDeCadaPessoa() throws SQLException {
        String sql = "SELECT p.Cod, d.Jogo FROM Pessoa p " +
                     "LEFT JOIN Defesas_de_Torres_Jogados d ON p.Cod = d.Cod_Pessoa " +
                     "ORDER BY p.Cod";
        return executarConsulta(sql);
    }

    // Consulta 4: Próxima fase liberada a partir de uma fase
    public List<Map<String, Object>> getProximaFase() throws SQLException {
        String sql = "SELECT f1.Numero_da_Fase AS Fase, f2.Numero_da_Fase AS Proxima_Fase " +
                     "FROM Fase f1 LEFT JOIN Fase f2 " +
                     "ON f1.Numero_da_Fase_Liberada = f2.Numero_da_Fase";
        return executarConsulta(sql);
    }
}
