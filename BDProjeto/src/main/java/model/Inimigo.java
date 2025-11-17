package model;

public class Inimigo {

    private String Nome;
    private int Vida;
    private float Velocidade;
    private Integer Numero_da_Fase;
    private Integer Almanaque_Cod; 

    public Inimigo() {
    }

    public Inimigo(String Nome, int Vida, float Velocidade, Integer Numero_da_Fase, Integer Almanaque_Cod) {
        this.Nome = Nome;
        this.Vida = Vida;
        this.Velocidade = Velocidade;
        this.Numero_da_Fase = Numero_da_Fase;
        this.Almanaque_Cod = Almanaque_Cod;
    }

    
    public String getNome() {
        return Nome;
    }

    public void setNome(String Nome) {
        this.Nome = Nome;
    }

    public int getVida() {
        return Vida;
    }

    public void setVida(int Vida) {
        this.Vida = Vida;
    }

    public float getVelocidade() {
        return Velocidade;
    }

    public void setVelocidade(float Velocidade) {
        this.Velocidade = Velocidade;
    }

    public Integer getNumero_da_Fase() {
        return Numero_da_Fase;
    }

    public void setNumero_da_Fase(Integer Numero_da_Fase) {
        this.Numero_da_Fase = Numero_da_Fase;
    }

    public Integer getAlmanaque_Cod() {
        return Almanaque_Cod;
    }

    public void setAlmanaque_Cod(Integer Almanaque_Cod) {
        this.Almanaque_Cod = Almanaque_Cod;
    }
}