import React, { useState, useEffect } from 'react';

function PessoaComponent() {
    const [pessoas, setPessoas] = useState([]);
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [erro, setErro] = useState(null);
    const [estatisticas, setEstatisticas] = useState(null);
    const [editId, setEditId] = useState(null);
    const [filtroSexo, setFiltroSexo] = useState('');

    useEffect(() => {
        fetchPessoas();
        fetchEstatisticas();

        const interval = setInterval(() => {
            fetchEstatisticas();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const fetchPessoas = async () => {
        try {
            setErro(null);
            const response = await fetch('http://localhost:8080/api/pessoas');
            const data = await response.json();
            setPessoas(data);
        } catch (error) {
            setErro(error.message);
        }
    };

    const fetchEstatisticas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/pessoas/stats');
            const data = await response.json();
            setEstatisticas(data);
        } catch {}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idade || !sexo) {
            setErro("Idade e Sexo são obrigatórios.");
            return;
        }

        const pessoa = { 
            idade: parseInt(idade, 10),
            sexo: sexo 
        };

        const url = editId ? `http://localhost:8080/api/pessoas/${editId}` : 'http://localhost:8080/api/pessoas';
        const method = editId ? 'PUT' : 'POST';

        try {
            setErro(null);
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pessoa),
            });

            if (response.ok) {
                fetchPessoas();
                fetchEstatisticas();
                resetForm();
            } else {
                const errText = await response.text();
                setErro('Falha ao salvar.');
            }
        } catch (error) {
            setErro(error.message);
        }
    };

    const handleEdit = (pessoa) => {
        setEditId(pessoa.cod);
        setIdade(pessoa.idade.toString());
        setSexo(pessoa.sexo);
    };

    const handleDelete = async (cod) => {
        if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
            try {
                setErro(null);
                await fetch(`http://localhost:8080/api/pessoas/${cod}`, {
                    method: 'DELETE'
                });

                fetchPessoas();
                fetchEstatisticas();
            } catch (error) {
                setErro(error.message);
            }
        }
    };

    const resetForm = () => {
        setEditId(null);
        setIdade('');
        setSexo('');
    };

    const handleAtualizarSexoClick = async (cod) => {
        const novoSexo = prompt("Digite o novo sexo");

        if (novoSexo) {
            try {
                setErro(null);

                const response = await fetch(`http://localhost:8080/api/pessoas/${cod}/sexo`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sexo: novoSexo })
                });

                const mensagem = await response.text();

                if (!response.ok) {
                    setErro(mensagem);
                } else {
                    alert(mensagem);
                    fetchPessoas();
                    fetchEstatisticas();
                }
            } catch (error) {
                setErro(error.message);
            }
        }
    };

    const pessoasFiltradas = pessoas.filter((pessoa) => {
        if (filtroSexo === '') return true;
        return pessoa.sexo.toLowerCase().includes(filtroSexo.toLowerCase());
    });

    return (
        <div className="component-container">
            <h2>Gerenciamento das Pessoas</h2>

            {erro && (
                <div className="error-message">{erro}</div>
            )}

            <form onSubmit={handleSubmit} className="form-container">
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
                <div className="form-group">
                    <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
                    {editId && <button type="button" onClick={resetForm} className="cancel-button">Cancelar</button>}
                </div>
            </form>

            {estatisticas && (
                <div className="stats-container">
                    <div className="stat-item">
                        <h4>Total de Pessoas</h4>
                        <p>{estatisticas.total}</p>
                    </div>
                    <div className="stat-item">
                        <h4>Média de Idade</h4>
                        <p>{estatisticas.media_idade} anos</p>
                    </div>
                    <div className="stat-item">
                        <h4>Sexo Predominante</h4>
                        <p>{estatisticas.sexo_mais_comum}</p>
                    </div>
                </div>
            )}

            <div className="list-header">
                <h3>Lista de Pessoas</h3>
                <div className="filter-container">
                    <label>Filtrar por Sexo:</label>
                    <select 
                        value={filtroSexo} 
                        onChange={(e) => setFiltroSexo(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Prefiro não dizer">Prefiro não dizer</option>
                    </select>
                </div>
            </div>

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
                        {pessoasFiltradas.map((pessoa) => (
                            <tr key={pessoa.cod}>
                                <td>{pessoa.cod}</td>
                                <td>{pessoa.idade}</td>
                                <td>{pessoa.sexo}</td>
                                <td className="actions-cell">
                                    <button onClick={() => handleEdit(pessoa)}>Alterar</button>
                                    <button onClick={() => handleDelete(pessoa.cod)} className="delete-button">Deletar</button>
                                    <button onClick={() => handleAtualizarSexoClick(pessoa.cod)}>Atualizar Sexo</button>
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