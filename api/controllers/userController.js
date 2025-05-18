import bcrypt from 'bcrypt';
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../Utils/userUtils.js';
import { generateToken } from '../Utils/authUtils.js';

/* ─────────────── CRIAR USUÁRIO ─────────────── */
export const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1) e-mail duplicado
    if (await getUserByEmail(email))
      return res.status(400).json({ message: 'E-mail já cadastrado!' });

    // 2) senha forte
    const strong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]{8,}$/;
    if (!strong.test(password))
      return res.status(400).json({
        message:
          'Senha fraca. Requer 8+ caracteres, maiúscula, minúscula, número e caractere especial.',
      });

    // 3) hash + cria (util chama Prisma e cria carrinho)
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashed });

    // 4) token
    const token = generateToken(newUser.id);

    return res.status(201).json({
      message: `Usuário ${newUser.name} criado com sucesso!`,
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};
/* ────────────────────────────  ATUALIZAR USUÁRIO  ───────────────────────── */
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

    const data = { name, email };
    if (password) data.password = await bcrypt.hash(password, 10);

    await updateUser(id, data);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

/* ─────────────────────────── OUTROS CONTROLLERS ─────────────────────────── */
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers(req.query);
    res.status(200).json(users);
  } catch (e) {
    console.error('Erro ao buscar usuários:', e);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });
    res.status(200).json(user);
  } catch (e) {
    console.error('Erro ao buscar usuário:', e);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

    await deleteUser(req.params.id);
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (e) {
    console.error('Erro ao deletar usuário:', e);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

/* ────────────────────────────  LOGIN  ───────────────────────────────────── */
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios!' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'E-mail ou senha inválidos!' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'E-mail ou senha inválidos!' });

    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (e) {
    console.error('Erro ao realizar login:', e);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};
