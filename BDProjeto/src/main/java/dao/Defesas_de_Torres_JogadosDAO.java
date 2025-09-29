package dao;

import model.Defesas_de_Torres_Jogados;
import util.ConnectionFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Defesas_de_Torres_JogadosDAO {
    public void inserir(Defesas_de_Torres_Jogados td) throws SQLException {
        String sql = "INSERT INTO Defesas_de_Torres_Jogados (Jogo, Cod_Pessoa) VALUES (?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, td.getJogo());
            ps.setInt(2, td.getCod_Pessoa());
            ps.executeUpdate();
        }
    }

    public List<Defesas_de_Torres_Jogados> listar() throws SQLException {
        List<Defesas_de_Torres_Jogados> lista = new ArrayList<>();
        String sql = "SELECT * FROM Defesas_de_Torres_Jogados";
        try (Connection conn = ConnectionFactory.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Defesas_de_Torres_Jogados(
                    rs.getString("Jogo"),
                    rs.getInt("Cod_Pessoa")
                ));
            }
        }
        return lista;
    }

    public void atualizar(Defesas_de_Torres_Jogados td) throws SQLException {
        String sql = "UPDATE Defesas_de_Torres_Jogados SET Jogo=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, td.getJogo());
            ps.setInt(3, td.getCod_Pessoa());
            ps.executeUpdate();
        }
    }

    public void excluir(int id) throws SQLException {
        String sql = "DELETE FROM Defesas_de_Torres_Jogados WHERE Cod_Pessoa=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}
