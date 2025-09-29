package model;

public class Pessoa {
	private int Cod;
	private int Idade;
	
	public Pessoa() {}
	
	public Pessoa(int Cod,int Idade) {
		this.Cod=Cod;
		this.Idade=Idade;
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
}
