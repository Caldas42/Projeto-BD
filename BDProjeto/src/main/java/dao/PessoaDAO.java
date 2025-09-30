package dao;

import model.Pessoa;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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
                int rowsAffected = ps.executeUpdate();
                if (rowsAffected == 0) {
                    throw new SQLException("Falha ao deletar a pessoa, registro não encontrado.");
                }
            }
            
            conn.commit();

        } catch (SQLException e) {
            if (conn != null) {
                conn.rollback();
            }
            throw e; 
        } finally {
            if (conn != null) {
                conn.setAutoCommit(true);
                conn.close();
            }
        }
    }
}