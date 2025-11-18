package dao;

import model.Inimigo;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public class InimigoDAO {

    public void inserir(Inimigo inimigo) throws SQLException {
        String sql = "INSERT INTO Inimigo (Nome, Vida, Velocidade, Numero_da_Fase, Almanaque_Cod) " +
                     "VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, inimigo.getNome());
            ps.setInt(2, inimigo.getVida());
            ps.setFloat(3, inimigo.getVelocidade());
            ps.setObject(4, inimigo.getNumero_da_Fase());
            ps.setObject(5, inimigo.getAlmanaque_Cod());
            
            ps.executeUpdate();
        }
    }

    public List<Inimigo> listar() throws SQLException {
        List<Inimigo> lista = new ArrayList<>();
        String sql = "SELECT * FROM Inimigo ORDER BY Almanaque_Cod";
        
        try (Connection conn = ConnectionFactory.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                lista.add(new Inimigo(
                    rs.getString("Nome"),
                    rs.getInt("Vida"),
                    rs.getFloat("Velocidade"),
                    rs.getObject("Numero_da_Fase", Integer.class),
                    rs.getObject("Almanaque_Cod", Integer.class)
                ));
            }
        }
        return lista;
    }

    public void atualizar(Inimigo inimigo) throws SQLException {
        String sql = "UPDATE Inimigo SET Vida = ?, Velocidade = ?, Numero_da_Fase = ?, Almanaque_Cod = ? " +
                     "WHERE Nome = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, inimigo.getVida());
            ps.setFloat(2, inimigo.getVelocidade());
            ps.setObject(3, inimigo.getNumero_da_Fase());
            ps.setObject(4, inimigo.getAlmanaque_Cod());
            ps.setString(5, inimigo.getNome());
            
            ps.executeUpdate();
        }
    }
    public void excluir(String nome) throws SQLException {
        Connection conn = null;
        try {
            conn = ConnectionFactory.getConnection();
            conn.setAutoCommit(false);

            String sqlPossui = "DELETE FROM Possui WHERE Nome_Inimigo = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlPossui)) {
                ps.setString(1, nome);
                ps.executeUpdate();
            }

            String sqlInimigo = "DELETE FROM Inimigo WHERE Nome = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlInimigo)) {
                ps.setString(1, nome);
                int rowsAffected = ps.executeUpdate();
                if (rowsAffected == 0) {
                    throw new SQLException("Falha ao deletar o inimigo, registro não encontrado.");
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

    public String classificarInimigo(int vida, double velocidade) {
        String sql = "SELECT fn_classificar_inimigo(?, ?) AS classificacao";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, vida);
            stmt.setDouble(2, velocidade);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return rs.getString("classificacao");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}

