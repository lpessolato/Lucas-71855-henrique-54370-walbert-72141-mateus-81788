import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import connection from '../db';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário já existe
    connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Erro ao verificar usuário' });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o novo usuário
        connection.query(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          [username, hashedPassword],
          (error) => {
            if (error) {
              return res.status(500).json({ error: 'Erro ao criar usuário' });
            }
            res.status(201).json({ message: 'Usuário criado com sucesso' });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.json({ message: 'Login realizado com sucesso' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 