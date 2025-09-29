package model;

public class Defesas_de_Torres_Jogados {
	private String Jogo;
	private int Cod_Pessoa;
	
	public Defesas_de_Torres_Jogados(){}
	
	public Defesas_de_Torres_Jogados(String Jogo,int Cod_Pessoa){
		this.Jogo=Jogo;
		this.Cod_Pessoa=Cod_Pessoa;
	}

	public String getJogo() {
		return Jogo;
	}

	public void setJogo(String jogo) {
		Jogo = jogo;
	}

	public int getCod_Pessoa() {
		return Cod_Pessoa;
	}

	public void setCod_Pessoa(int cod_Pessoa) {
		Cod_Pessoa = cod_Pessoa;
	}
}
