package dao;

import model.Fase;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FaseDAO {
    public void inserir(Fase f) throws SQLException {
        String sql = "INSERT INTO Fase (Numero_da_fase, Numero_da_Fase_Liberada) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, f.getNumero_da_fase());
            ps.setInt(2, f.getNumero_da_Fase_Liberada());
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
        String sql = "UPDATE Fase SET Numero_da_Fase=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
        	ps.setInt(1,f.getNumero_da_fase());
            ps.setInt(2,f.getVidas_iniciais());
            ps.setInt(3,f.getRodadas());
            ps.setInt(4,f.getMoedas_iniciais());
            ps.setInt(5,f.getNumero_da_Fase_Liberada());
            ps.executeUpdate();
        }
    }

    public void excluir(int id) throws SQLException {
        String sql = "DELETE FROM Fase WHERE Numero_da_fase=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}
