package dao;

import model.Pessoa;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PessoaDAO {

    public void inserir(Pessoa p) throws SQLException {
        // CORREÇÃO: Inserindo apenas a Idade.
        // Isto resolve o erro "Field 'Sexo' doesn't have a default value".
        String sql = "INSERT INTO Pessoa (Idade) VALUES (?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, p.getIdade());
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
                lista.add(new Pessoa(rs.getInt("Cod"), rs.getInt("Idade")));
            }
        }
        return lista;
    }

    public void atualizar(Pessoa p) throws SQLException {
        String sql = "UPDATE Pessoa SET Idade=? WHERE Cod=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, p.getIdade());
            ps.setInt(2, p.getCod());
            ps.executeUpdate();
        }
    }

    public void excluir(int cod) throws SQLException {
        Connection conn = null;
        try {
            conn = ConnectionFactory.getConnection();
            conn.setAutoCommit(false); // Inicia uma transação

            // CORREÇÃO: Usando os nomes da tabela e coluna do seu log de erro.
            // Primeiro, deleta os registros dependentes.
            String sqlJogos = "DELETE FROM jogador_joga WHERE Pessoa_Cod = ?";
            try (PreparedStatement psJogos = conn.prepareStatement(sqlJogos)) {
                psJogos.setInt(1, cod);
                psJogos.executeUpdate();
            }

            // Depois, deleta o registro principal.
            String sqlPessoa = "DELETE FROM Pessoa WHERE Cod = ?";
            try (PreparedStatement psPessoa = conn.prepareStatement(sqlPessoa)) {
                psPessoa.setInt(1, cod);
                psPessoa.executeUpdate();
            }

            conn.commit(); // Confirma a transação se tudo deu certo

        } catch (SQLException e) {
            if (conn != null) {
                conn.rollback(); // Desfaz a transação em caso de erro
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

