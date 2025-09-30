package dao;

import model.Fase;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FaseDAO {

    public void inserir(Fase f) throws SQLException {
    String sql = "INSERT INTO Fase (Numero_da_fase, Vidas_iniciais, Rodadas, Moedas_iniciais, Numero_da_Fase_Liberada) VALUES (?, ?, ?, ?, ?)";
    try (Connection conn = ConnectionFactory.getConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {
        
        ps.setInt(1, f.getNumero_da_fase());
        ps.setInt(2, f.getVidas_iniciais());
        ps.setInt(3, f.getRodadas());
        ps.setInt(4, f.getMoedas_iniciais());
        
        if (f.getNumero_da_Fase_Liberada() > 0) {
            ps.setInt(5, f.getNumero_da_Fase_Liberada());
        } else {
            ps.setNull(5, java.sql.Types.INTEGER);
        }
        
        ps.executeUpdate();
    }
}

    public List<Fase> listar() throws SQLException {
        List<Fase> lista = new ArrayList<>();
        String sql = "SELECT * FROM Fase";
        try (Connection conn = ConnectionFactory.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Fase(
                    rs.getInt("Numero_da_fase"),
                    rs.getInt("Vidas_iniciais"),
                    rs.getInt("Rodadas"),
                    rs.getInt("Moedas_iniciais"),
                    rs.getInt("Numero_da_Fase_Liberada")
                ));
            }
        }
        return lista;
    }

    public void atualizar(Fase f) throws SQLException {
        String sql = "UPDATE Fase SET Vidas_iniciais=?, Rodadas=?, Moedas_iniciais=?, Numero_da_Fase_Liberada=? WHERE Numero_da_fase=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, f.getVidas_iniciais());
            ps.setInt(2, f.getRodadas());
            ps.setInt(3, f.getMoedas_iniciais());
            ps.setInt(4, f.getNumero_da_Fase_Liberada());
            ps.setInt(5, f.getNumero_da_fase()); 
            ps.executeUpdate();
        }
    }

    public void excluir(int id) throws SQLException {
        Connection conn = null;
        try {
            conn = ConnectionFactory.getConnection();
            conn.setAutoCommit(false);

            String[] deleteQueries = {
                "DELETE FROM Utiliza WHERE Numero_da_Fase = ?",
                "DELETE FROM Jogador_Joga WHERE Numero_da_Fase = ?",
                "DELETE FROM Possui WHERE Numero_da_Fase = ?"
            };

            for (String sql : deleteQueries) {
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setInt(1, id);
                    ps.executeUpdate();
                }
            }
            
            String sqlSelfRef = "UPDATE Fase SET Numero_da_Fase_Liberada = NULL WHERE Numero_da_Fase_Liberada = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlSelfRef)) {
                ps.setInt(1, id);
                ps.executeUpdate();
            }

            String sqlFase = "DELETE FROM Fase WHERE Numero_da_fase = ?";
            try (PreparedStatement ps = conn.prepareStatement(sqlFase)) {
                ps.setInt(1, id);
                int rowsAffected = ps.executeUpdate();
                if (rowsAffected == 0) {
                     throw new SQLException("Falha ao deletar a fase.");
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