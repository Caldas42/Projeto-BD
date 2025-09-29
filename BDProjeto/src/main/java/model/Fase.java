package model;

public class Fase {
	private int Numero_da_fase;
	private int Vidas_iniciais;
	private int Rodadas;
	private int Moedas_iniciais;
	private int Numero_da_Fase_Liberada;
	
	public Fase() {}
	
	public Fase(int Numero_da_fase,int Vidas_iniciais,int Rodadas,int Moedas_iniciais,int Numero_da_Fase_Liberada) {
		this.Numero_da_fase=Numero_da_fase;
		this.Vidas_iniciais=Vidas_iniciais;
		this.Rodadas=Rodadas;
		this.Moedas_iniciais=Moedas_iniciais;
		this.Numero_da_Fase_Liberada=Numero_da_Fase_Liberada;
	}

	public int getNumero_da_fase() {
		return Numero_da_fase;
	}

	public void setNumero_da_fase(int numero_da_fase) {
		Numero_da_fase = numero_da_fase;
	}

	public int getVidas_iniciais() {
		return Vidas_iniciais;
	}

	public void setVidas_iniciais(int vidas_iniciais) {
		Vidas_iniciais = vidas_iniciais;
	}

	public int getRodadas() {
		return Rodadas;
	}

	public void setRodadas(int rodadas) {
		Rodadas = rodadas;
	}

	public int getMoedas_iniciais() {
		return Moedas_iniciais;
	}

	public void setMoedas_iniciais(int moedas_iniciais) {
		Moedas_iniciais = moedas_iniciais;
	}

	public int getNumero_da_Fase_Liberada() {
		return Numero_da_Fase_Liberada;
	}

	public void setNumero_da_Fase_Liberada(int numero_da_Fase_Liberada) {
		Numero_da_Fase_Liberada = numero_da_Fase_Liberada;
	}
}
