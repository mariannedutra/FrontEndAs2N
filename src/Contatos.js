import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contatos.css'

const Contatos = () => {
  const [contatos, setContatos] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');

  useEffect(() => {
    carregarContatos();
  }, []);

  const carregarContatos = async () => {
    try {
      const response = await axios.get('http://localhost:3002/contatos');
      setContatos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarContato = async () => {
    try {
      await axios.post('http://localhost:3002/contatos', { nome: novoNome, telefone: novoTelefone });
      carregarContatos();
      setNovoNome('');
      setNovoTelefone('');
    } catch (error) {
      console.error(error);
    }
  };

  const editarContato = async (id, novoNome, novoTelefone) => {
    try {
      await axios.put(`http://localhost:3002/contatos/${id}`, { nome: novoNome, telefone: novoTelefone });
      carregarContatos();
    } catch (error) {
      console.error(error);
    }
  };

  const excluirContato = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/contatos/${id}`);
      carregarContatos();
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarFavorito = async (id) => {
    try {
      await axios.patch(`http://localhost:3002/contatos/${id}`, { favorito: true });
      carregarContatos();
    } catch (error) {
      console.error(error);
    }
  };

  const removerFavorito = async (id) => {
    try {
      await axios.patch(`http://localhost:3002/contatos/${id}`, { favorito: false });
      carregarContatos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Agenda de Contatos</h1>
      <div>
        <h2>Adicionar Contato</h2>
        <input type="text" placeholder="Nome" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
        <input type="text" placeholder="Telefone" value={novoTelefone} onChange={(e) => setNovoTelefone(e.target.value)} />
        <button onClick={adicionarContato}>Adicionar</button>
      </div>
      <div>
        <h2>Contatos</h2>
        <ul>
          {contatos.map((contato) => (
            <li key={contato.id}>
              <input type="text" value={contato.nome} onChange={(e) => editarContato(contato.id, e.target.value, contato.telefone)} />
              <input type="text" value={contato.telefone} onChange={(e) => editarContato(contato.id, contato.nome, e.target.value)} />
              <button onClick={() => adicionarFavorito(contato.id)}>Adicionar aos Favoritos</button>
              <button onClick={() => removerFavorito(contato.id)}>Remover dos Favoritos</button>
              <button onClick={() => excluirContato(contato.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Favoritos</h2>
        <ul>
          {contatos
            .filter((contato) => contato.favorito)
            .map((contato) => (
              <li key={contato.id}>
                <span>{contato.nome}</span>
                <span>{contato.telefone}</span>
                <button onClick={() => removerFavorito(contato.id)}>Remover dos Favoritos</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Contatos;
