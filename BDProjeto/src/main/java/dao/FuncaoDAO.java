package dao;

import util.ConnectionFactory;
import java.sql.*;


public class FuncaoDAO {

    public String classificarInimigo(int vida, double velocidade) throws SQLException {
        String classificacao = "Desconhecida";
        String sql = "SELECT fn_classificar_inimigo(?, ?) AS classificacao";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, vida);
            ps.setDouble(2, velocidade);
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    classificacao = rs.getString("classificacao");
                }
            }
        }
        return classificacao;
    }

    public int calcularBonus(String dificuldade, String tempo) throws SQLException {
        int bonus = 0;
        String sql = "SELECT fn_calcular_bonus(?, ?) AS bonus";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, dificuldade);
            ps.setString(2, tempo); // O MySQL pode converter a string 'HH:MM:SS' para TIME
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    bonus = rs.getInt("bonus");
                }
            }
        }
        return bonus;
    }
}