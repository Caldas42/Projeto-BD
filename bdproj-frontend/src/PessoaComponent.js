import React, { useState, useEffect } from 'react';

function PessoaComponent() {
    const [pessoas, setPessoas] = useState([]);
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [erro, setErro] = useState(null);

    useEffect(() => {
        fetchPessoas();
    }, []);

    const fetchPessoas = async () => {
        try {
            setErro(null);
            const response = await fetch('http://localhost:8080/api/pessoas');
            if (!response.ok) {
                throw new Error('Falha ao carregar a lista de pessoas.');
            }
            const data = await response.json();
            setPessoas(data);
        } catch (error) {
            setErro(error.message);
        }
    };

    const handleAdicionar = async (e) => {
        e.preventDefault();
        if (!idade || !sexo) {
            setErro("Idade e Sexo são obrigatórios.");
            return;
        }

        try {
            setErro(null);
            const response = await fetch('http://localhost:8080/api/pessoas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idade: parseInt(idade), sexo: sexo })
            });

            if (!response.ok) {
                throw new Error('Falha ao adicionar pessoa.');
            }

            setIdade('');
            setSexo('');
            fetchPessoas();
        } catch (error) {
            setErro(error.message);
        }
    };

    const handleDelete = async (cod) => {
        if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
            try {
                setErro(null);
                const response = await fetch(`http://localhost:8080/api/pessoas/${cod}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Falha ao excluir pessoa. Verifique as dependências.');
                }
                
                fetchPessoas();
            } catch (error) {
                setErro(error.message);
            }
        }
    };

    const handleAlterar = (pessoa) => {
        alert(`Implementação do "Alterar" (PUT) para ${pessoa.cod} não está no escopo.`);
    };

    const handleAtualizarSexoClick = async (cod) => {
        const novoSexo = prompt("Digite o novo sexo para a pessoa de código " + cod);

        if (novoSexo) {
            try {
                setErro(null);
                
                const response = await fetch(`http://localhost:8080/api/pessoas/${cod}/sexo`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sexo: novoSexo }),
                });

                const mensagem = await response.text();

                if (!response.ok) {
                    setErro(mensagem);
                } else {
                    alert(mensagem);
                    fetchPessoas();
                }
            } catch (error) {
                setErro("Erro de conexão: " + error.message);
            }
        }
    };

    return (
        <div className="component-container">
            <h2>Gerenciamento das Pessoas</h2>

            {erro && (
                <div className="error-message">
                    {erro}
                </div>
            )}

            <form onSubmit={handleAdicionar} className="form-container">
                <div className="form-grid">
                    <input
                        type="number"
                        placeholder="Idade da pessoa"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Sexo"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                    />
                </div>
                <button type="submit">Adicionar</button>
            </form>

            <h3>Lista de Pessoas</h3>
            
            <div className="tabela-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map((pessoa) => (
                            <tr key={pessoa.cod}>
                                <td>{pessoa.cod}</td>
                                <td>{pessoa.idade}</td>
                                <td>{pessoa.sexo}</td>
                                <td className="actions-cell">
                                    <button 
                                        onClick={() => handleAlterar(pessoa)}
                                        className="alterar-button"
                                    >
                                        Alterar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(pessoa.cod)}
                                        className="delete-button"
                                    >
                                        Deletar
                                    </button>
                                    <button 
                                        onClick={() => handleAtualizarSexoClick(pessoa.cod)}
                                        className="atualizar-sexo-button"
                                    >
                                        Atualizar Sexo
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PessoaComponent;