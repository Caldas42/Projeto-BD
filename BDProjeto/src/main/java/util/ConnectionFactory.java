package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
    private static final String URL = "jdbc:mysql://localhost:3306/Jogo";
    private static final String USER = "root";
<<<<<<< HEAD
    private static final String PASS = "1902";
=======
    private static final String PASS = "Barbosa09_";
>>>>>>> 9e1d96f43ac61f87923f573582ff7ce200de0d5c

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }
}