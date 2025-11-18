package dao;

import model.Pessoa;
import util.ConnectionFactory;

import java.sql.*;
import java.util.*;

public class PessoaDAO {

    public void inserir(Pessoa p) throws SQLException {
        String sql = "INSERT INTO Pessoa (Idade, Sexo) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, p.getIdade());
            ps.setString(2, p.getSexo());
            ps.executeUpdate();
        }
    }

    public List<Pessoa> listar() throws SQLException {
        List<Pessoa> lista = new ArrayList<>();
        String sql = "SELECT * FROM Pessoa";
        try (Connection conn = ConnectionFactory.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Pessoa(rs.getInt("Cod"), rs.getInt("Idade"), rs.getString("Sexo")));
            }
        }
        return lista;
    }

    public void atualizar(Pessoa p) throws SQLException {
        String sql = "UPDATE Pessoa SET Idade=?, Sexo=? WHERE Cod=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, p.getIdade());
            ps.setString(2, p.getSexo());
            ps.setInt(3, p.getCod());
            ps.executeUpdate();
        }
    }

    public void excluir(int cod) throws SQLException {
        Connection conn = null;
        try {
            conn = ConnectionFactory.getConnection();
            conn.setAutoCommit(false);

            String sqlUtiliza = "DELETE FROM Utiliza WHERE Pessoa_Cod = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlUtiliza)) {
                ps.setInt(1, cod);
                ps.executeUpdate();
            }

            String sqlJogos = "DELETE FROM Jogador_Joga WHERE Pessoa_Cod = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlJogos)) {
                ps.setInt(1, cod);
                ps.executeUpdate();
            }

            String sqlDefesas = "DELETE FROM Defesas_de_Torres_Jogados WHERE Cod_Pessoa = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlDefesas)) {
                ps.setInt(1, cod);
                ps.executeUpdate();
            }

            String sqlPessoa = "DELETE FROM Pessoa WHERE Cod = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlPessoa)) {
                ps.setInt(1, cod);
                ps.executeUpdate();
            }

            conn.commit();

        } catch (SQLException e) {
            if (conn != null) conn.rollback();
            throw e;
        } finally {
            if (conn != null) {
                conn.setAutoCommit(true);
                conn.close();
            }
        }
    }

    public String atualizarSexo(int cod, String novoSexo) throws SQLException {
        String sql = "{CALL AtualizarSexoPessoa(?, ?)}";
        String mensagem = "Ocorreu um erro.";
        Connection conn = null;

        try {
            conn = ConnectionFactory.getConnection();
            conn.setAutoCommit(false);

            try (CallableStatement cs = conn.prepareCall(sql)) {
                cs.setInt(1, cod);
                cs.setString(2, novoSexo);

                try (ResultSet rs = cs.executeQuery()) {
                    if (rs.next()) mensagem = rs.getString(1);
                }
            }

            conn.commit();

        } catch (SQLException e) {
            if (conn != null) conn.rollback();
            throw e;
        } finally {
            if (conn != null) {
                conn.setAutoCommit(true);
                conn.close();
            }
        }
        return mensagem;
    }

    public Map<String, Object> getEstatisticas() throws SQLException {
        Map<String, Object> stats = new HashMap<>();

        String sqlCount = "SELECT COUNT(*) AS total FROM Pessoa";
        String sqlAvgAge = "SELECT ROUND(AVG(idade)) AS media_idade FROM Pessoa";
        String sqlModeGender = "SELECT Sexo AS sexo_mais_comum FROM Pessoa GROUP BY Sexo ORDER BY COUNT(*) DESC LIMIT 1";

        try (Connection conn = ConnectionFactory.getConnection()) {

            try (Statement st = conn.createStatement();
                 ResultSet rs = st.executeQuery(sqlCount)) {
                if (rs.next()) stats.put("total", rs.getInt("total"));
            }

            try (Statement st = conn.createStatement();
                 ResultSet rs = st.executeQuery(sqlAvgAge)) {
                if (rs.next()) stats.put("media_idade", rs.getInt("media_idade"));
            }

            try (Statement st = conn.createStatement();
                 ResultSet rs = st.executeQuery(sqlModeGender)) {
                if (rs.next()) stats.put("sexo_mais_comum", rs.getString("sexo_mais_comum"));
            }
        }

        return stats;
    }
}
