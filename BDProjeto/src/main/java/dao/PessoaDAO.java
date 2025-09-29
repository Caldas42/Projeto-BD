package dao;

import model.Pessoa;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PessoaDAO {

    public void inserir(Pessoa p) throws SQLException {
        // CORREÇÃO PARA O ERRO 'Field Sexo':
        // Especificamos que estamos inserindo APENAS na coluna "Idade".
        // Isso ignora a coluna "Sexo" e deixa o banco de dados usar o valor padrão (se houver) ou funcionar se ela permitir nulos.
        // Se a coluna "Sexo" for obrigatória (NOT NULL), você precisará ajustar o banco ou enviar o dado do front-end.
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
            conn.setAutoCommit(false);

            // CORREÇÃO PARA O ERRO DE DELEÇÃO:
            // Usamos os nomes exatos da tabela e da coluna que apareceram no seu log de erro.
            String sqlJogos = "DELETE FROM jogador_joga WHERE Pessoa_Cod=?";
            try (PreparedStatement psJogos = conn.prepareStatement(sqlJogos)) {
                psJogos.setInt(1, cod);
                psJogos.executeUpdate();
            }

            // Agora, deletamos a pessoa da tabela principal.
            String sqlPessoa = "DELETE FROM Pessoa WHERE Cod=?";
            try (PreparedStatement psPessoa = conn.prepareStatement(sqlPessoa)) {
                psPessoa.setInt(1, cod);
                psPessoa.executeUpdate();
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