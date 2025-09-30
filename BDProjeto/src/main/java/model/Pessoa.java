package model;

public class Pessoa {
    private int Cod;
    private int Idade;
    private String Sexo;
    
    public Pessoa() {}
    
    public Pessoa(int Cod, int Idade, String Sexo) {
        this.Cod = Cod;
        this.Idade = Idade;
        this.Sexo = Sexo;
    }

    public int getCod() {
        return Cod;
    }

    public void setCod(int cod) {
        this.Cod = cod;
    }

    public int getIdade() {
        return Idade;
    }

    public void setIdade(int idade) {
        this.Idade = idade;
    }

    public String getSexo() {
        return this.Sexo;
    }

    public void setSexo(String sexo) {
        this.Sexo = sexo;
    }
}

