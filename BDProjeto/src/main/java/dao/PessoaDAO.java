package dao;

import model.Pessoa;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PessoaDAO {

    public void inserir(Pessoa p) throws SQLException {
        System.out.println("--- TENTANDO INSERIR PESSOA COM IDADE: " + p.getIdade() + " ---");
        // Correção para o erro 'Field Sexo': Inserindo apenas na coluna 'Idade'.
        String sql = "INSERT INTO Pessoa (Idade) VALUES (?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, p.getIdade());
            ps.executeUpdate();
            System.out.println("--- PESSOA INSERIDA COM SUCESSO ---");
        } catch (SQLException e) {
            System.err.println("--- ERRO AO INSERIR PESSOA: " + e.getMessage() + " ---");
            throw e;
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
        System.out.println("--- TENTANDO ATUALIZAR PESSOA COD: " + p.getCod() + " ---");
        String sql = "UPDATE Pessoa SET Idade=? WHERE Cod=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, p.getIdade());
            ps.setInt(2, p.getCod());
            ps.executeUpdate();
            System.out.println("--- PESSOA ATUALIZADA COM SUCESSO ---");
        } catch (SQLException e) {
            System.err.println("--- ERRO AO ATUALIZAR PESSOA: " + e.getMessage() + " ---");
            throw e;
        }
    }

    public void excluir(int cod) throws SQLException {
        System.out.println("--- TENTANDO DELETAR PESSOA COD: " + cod + " ---");
        Connection conn = null;
        try {
            conn = ConnectionFactory.getConnection();
            conn.setAutoCommit(false);

            // PASSO 1: Deletar da tabela de ligação 'jogador_joga'
            System.out.println("--> Deletando da tabela 'jogador_joga' primeiro...");
            String sqlJogos = "DELETE FROM jogador_joga WHERE Pessoa_Cod = ?";
            try (PreparedStatement psJogos = conn.prepareStatement(sqlJogos)) {
                psJogos.setInt(1, cod);
                int rowsAffected = psJogos.executeUpdate();
                System.out.println("--> Registros deletados de 'jogador_joga': " + rowsAffected);
            }

            // PASSO 2: Deletar da tabela principal 'Pessoa'
            System.out.println("--> Deletando da tabela 'Pessoa'...");
            String sqlPessoa = "DELETE FROM Pessoa WHERE Cod = ?";
            try (PreparedStatement psPessoa = conn.prepareStatement(sqlPessoa)) {
                psPessoa.setInt(1, cod);
                psPessoa.executeUpdate();
                System.out.println("--> Registro deletado de 'Pessoa'.");
            }
            
            conn.commit();
            System.out.println("--- PESSOA DELETADA COM SUCESSO (COMMIT REALIZADO) ---");

        } catch (SQLException e) {
            System.err.println("--- ERRO AO DELETAR PESSOA: " + e.getMessage() + " ---");
            if (conn != null) {
                System.err.println("--- REALIZANDO ROLLBACK ---");
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

